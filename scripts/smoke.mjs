/**
 * Lightweight production smoke test.
 *
 * Builds the project, serves the `dist/` output, then drives a real headless
 * browser through the key interactions and asserts they behave. This is a
 * handful of meaningful checks — not a full test suite — sized to the project.
 *
 * Checks:
 *   - the page boots and renders the hero headline
 *   - the mode toggle flips the Critique register (annotation appears)
 *   - the play button starts the simulated broadcast (LIVE SIMULATION badge)
 *   - the offer CTA produces the ACCESS GRANTED state
 *   - no console errors on boot
 *
 * Run with: npm run test  (or npm run test:smoke)
 */
import { spawnSync } from "node:child_process";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { launchBrowser, newPage } from "./lib/browser.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const PORT = 4289;
const BASE = process.env.VITE_BASE ?? "/";

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

function startServer() {
  const server = createServer((req, res) => {
    let urlPath = decodeURIComponent((req.url ?? "/").split("?")[0]);
    if (urlPath === "/" || urlPath === "") urlPath = "/index.html";
    const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, "").replace(/^[/\\]/, "");
    const filePath = join(DIST, safe);
    if (filePath.startsWith(DIST) && existsSync(filePath) && statSync(filePath).isFile()) {
      res.writeHead(200, { "Content-Type": contentTypeFor(filePath) });
      res.end(readFileSync(filePath));
      return;
    }
    res.writeHead(404).end();
  });
  return new Promise((resolve) => server.listen(PORT, "0.0.0.0", () => resolve(server)));
}

let failures = 0;
function check(label, ok) {
  if (ok) {
    console.log(`  ✓ ${label}`);
  } else {
    failures++;
    console.log(`  ✗ ${label}`);
  }
}

async function main() {
  console.log("[smoke] build (base=/) ...");
  const build = spawnSync("npm", ["run", "build"], {
    cwd: ROOT,
    env: { ...process.env, VITE_BASE: "/" },
    stdio: "inherit",
  });
  if (build.status !== 0) {
    console.error("[smoke] build failed");
    process.exit(1);
  }

  const server = await startServer();
  const browser = await launchBrowser();
  const page = await newPage(browser, { width: 1440, height: 900 });
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(String(err)));

  try {
    const url = `http://127.0.0.1:${PORT}/`;
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => document.fonts?.ready);

    console.log("[smoke] boot & rendering");
    // innerText respects the <br/> as a newline; normalize whitespace so the
    // assertion doesn't care about source formatting.
    const headline = await page.$eval("h1", (el) => (el.innerText ?? "").replace(/\s+/g, " "));
    check("hero headline renders", /THE SECRET ISN'T HIDDEN.*IT WAS NEVER THERE/.test(headline));

    // Root should have a single React mount.
    const rootChildren = await page.$$eval("#root > *", (els) => els.length);
    check("app mounted", rootChildren >= 1);

    console.log("[smoke] mode toggle -> critique register");
    await page.click('button[aria-label*="Toggle"]');
    await sleep(700);
    const annotations = await page.$$eval("[class*='theory-mark']", (els) => els.length);
    check("critique annotations appear", annotations >= 3);
    const arPressed = await page.$eval('button[aria-label*="Toggle"]', (el) => el.getAttribute("aria-pressed"));
    check("toggle aria-pressed = true", arPressed === "true");

    console.log("[smoke] player starts");
    // Reset to simulation so the play overlay is present.
    await page.click('button[aria-label*="Toggle"]');
    await sleep(500);
    const playText = await page.$$eval("button", (els) =>
      els.some((b) => /click to watch/i.test(b.textContent ?? "")),
    );
    check("play overlay present", playText);
    await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll("button")).find((x) =>
        /click to watch/i.test(x.textContent ?? ""),
      );
      b?.click();
    });
    await sleep(1800);
    // The badge text is a raw text node inside a div, so search any element.
    const liveBadge = await page.$$eval("*", (els) =>
      els.some((s) => /live simulation/i.test(s.textContent ?? "")),
    );
    check("LIVE SIMULATION badge appears", liveBadge);

    console.log("[smoke] offer claim flow");
    await page.evaluate(() => document.querySelector("#offer")?.scrollIntoView());
    await sleep(600);
    const claimBtn = await page.$$eval("button", (els) =>
      els.some((b) => /claim my copy/i.test(b.textContent ?? "")),
    );
    check("claim CTA present", claimBtn);
    await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll("button")).find((x) =>
        /claim my copy/i.test(x.textContent ?? ""),
      );
      b?.click();
    });
    // "VERIFYING..." then "ACCESS GRANTED" after ~1.6s.
    await sleep(2400);
    const granted = await page.$$eval("p", (els) =>
      els.some((el) => /access granted/i.test(el.textContent ?? "")),
    );
    check("ACCESS GRANTED state reached", granted);

    console.log("[smoke] console errors");
    // Filter out known noise from headless GPU/network quirks (e.g. favicon).
    const realErrors = consoleErrors.filter(
      (e) => !/favicon|net::ERR|Failed to load resource.*404/i.test(e),
    );
    check("no unexpected console errors", realErrors.length === 0);
    if (realErrors.length) {
      console.log("    errors:", realErrors.slice(0, 5).join(" | "));
    }
  } catch (err) {
    failures++;
    console.error("[smoke] exception:", err);
  } finally {
    await browser.close();
    server.close();
  }

  console.log(failures === 0 ? "\n[smoke] PASS" : `\n[smoke] FAIL (${failures} failed)`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
