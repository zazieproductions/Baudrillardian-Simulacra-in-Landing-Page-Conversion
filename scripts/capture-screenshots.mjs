/**
 * Capture real screenshots of the running application.
 *
 * Flow:
 *   1. Build the project with a root base path (VITE_BASE=/).
 *   2. Serve `dist/` over a local static server (0.0.0.0).
 *   3. Drive a real headless Chromium through the page, triggering the
 *      meaningful interactive states (playing video, critique mode, offer).
 *   4. Save three screenshots to docs/images/.
 *
 * Run with: npm run capture:screenshots
 */
import { spawnSync } from "node:child_process";
import { createServer } from "node:http";
import { readFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { launchBrowser, newPage } from "./lib/browser.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const OUT = join(ROOT, "docs", "images");

const PORT = 4275;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function contentTypeFor(file) {
  const ext = extname(file).toLowerCase();
  return {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".json": "application/json",
    ".ico": "image/x-icon",
  }[ext] ?? "application/octet-stream";
}

/** Serve dist at the repo sub-path (mirrors GitHub Pages). */
function startServer() {
  const server = createServer((req, res) => {
    let urlPath = decodeURIComponent((req.url ?? "/").split("?")[0]);
    // If the request comes in under /<repo>/, strip that prefix.
    const repo = process.env.REPO_PATH ?? "";
    if (repo && urlPath.startsWith(`/${repo}`)) urlPath = urlPath.slice(repo.length + 1);
    if (urlPath === "/") urlPath = "/index.html";

    const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, "").replace(/^[/\\]/, "");
    const filePath = join(DIST, safe);
    if (!filePath.startsWith(DIST)) {
      res.writeHead(403).end();
      return;
    }
    if (existsSync(filePath) && statSync(filePath).isFile()) {
      res.writeHead(200, { "Content-Type": contentTypeFor(filePath) });
      res.end(readFileSync(filePath));
      return;
    }
    // SPA fallback to index.html (routes like #offer are fragments, so rarely hit).
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(readFileSync(join(DIST, "index.html")));
  });
  return new Promise((resolve) => {
    server.listen(PORT, "0.0.0.0", () => resolve(server));
  });
}

async function main() {
  mkdirSync(OUT, { recursive: true });

  console.log("[capture] build (base=/) ...");
  const build = spawnSync("npm", ["run", "build"], {
    cwd: ROOT,
    env: { ...process.env, VITE_BASE: "/" },
    stdio: "inherit",
  });
  if (build.status !== 0) {
    console.error("[capture] build failed");
    process.exit(1);
  }

  const server = await startServer();
  console.log(`[capture] serving dist at http://0.0.0.0:${PORT}`);

  const browser = await launchBrowser();
  const page = await newPage(browser, { width: 1440, height: 900 });

  try {
    const url = `http://127.0.0.1:${PORT}/`;
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

    // Wait for fonts to be ready so text renders with the real faces.
    await page.evaluate(() => document.fonts?.ready);

    // --- 1. project-preview: the landing page, funnel mode, player NOT started ---
    await page.waitForSelector("h1", { timeout: 15000 });
    await sleep(1200);
    // Hide the fixed progress dock + animate nothing; ensure a stable top state.
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(600);
    await page.screenshot({ path: join(OUT, "project-preview.png") });
    console.log("[capture] project-preview.png");

    // --- 2. project-active: start the "live" player, then go critique mode ---
    // Click the big play overlay to begin the simulated broadcast.
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      const play = btns.find((b) => /click to watch/i.test(b.textContent ?? ""));
      play?.click();
    });
    await sleep(1600);
    // Flip to critique mode so annotations + desaturated images are visible.
    await page.evaluate(() => {
      document.querySelector('button[aria-label*="Toggle"]')?.click();
    });
    await sleep(1200);
    await page.screenshot({ path: join(OUT, "project-active.png") });
    console.log("[capture] project-active.png");

    // --- 3. project-detail: scroll to the offer (Order IV) with critique on ---
    await page.evaluate(() => document.querySelector("#offer")?.scrollIntoView({ behavior: "instant", block: "start" }));
    await sleep(1400);
    await page.screenshot({ path: join(OUT, "project-detail.png") });
    console.log("[capture] project-detail.png");
  } catch (err) {
    console.error("[capture]", err);
    throw err;
  } finally {
    await browser.close();
    server.close();
  }
  console.log("[capture] done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
