/**
 * Headless-browser bootstrap helpers.
 *
 * We use `@sparticuz/chromium` (which ships its own Chromium binary inside
 * the npm package) with `puppeteer-core`. On Debian the binary needs the
 * Amazon-Linux-2023 NSS/NSPR libraries that ship alongside it in the same
 * package (`bin/al2023.tar.br`). We decompress and point `LD_LIBRARY_PATH`
 * at them. This keeps the whole screenshot pipeline offline-only and
 * reproducible — nothing is downloaded from an external CDN at runtime.
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..", "..");

/** Directory where we extract the AL2023 companion libraries. */
export const LIBS_DIR = join(PACKAGE_ROOT, "node_modules", ".cache", "chromium-libs");

/**
 * Ensure the AL2023 NSS/NSPR companion libraries are on disk. On a host that
 * already has them in the default linker path we'd skip this, but this code
 * always lays them down so it works on a bare Debian container.
 */
export function ensureBrowserLibs() {
  const archive = join(PACKAGE_ROOT, "node_modules", "@sparticuz", "chromium", "bin", "al2023.tar.br");
  // The archive contains a top-level `lib/` directory (lib/libnss3.so etc.), so
  // extract into the parent and point the loader at `al2023/lib`.
  const extractDir = join(LIBS_DIR, "al2023");
  const libDir = join(extractDir, "lib");
  const marker = join(libDir, "libnss3.so");
  if (readFileSafe(marker)) return libDir;

  mkdirSync(extractDir, { recursive: true });
  const tarball = brotliDecompressSync(readFileSync(archive));
  // tar is present in the base image; extract the lib tree into extractDir.
  spawnSync("tar", ["-x", "-C", extractDir], {
    input: tarball,
    stdio: ["pipe", "inherit", "inherit"],
  });
  return libDir;
}

function readFileSafe(path) {
  try {
    return readFileSync(path);
  } catch {
    return null;
  }
}

/**
 * Launch a headless Chromium suitable for taking screenshots. Returns a
 * puppeteer Browser. Always call `browser.close()` when done.
 */
export async function launchBrowser() {
  const libDir = ensureBrowserLibs();
  const executablePath = await chromium.executablePath();
  const env = { ...process.env, LD_LIBRARY_PATH: `${libDir}:${process.env.LD_LIBRARY_PATH ?? ""}` };

  return puppeteer.launch({
    executablePath,
    headless: "shell",
    args: [...chromium.args, "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
    env,
  });
}

/** Fresh page with OS-level UI suppressed (no browser chrome in screenshots). */
export async function newPage(browser, viewport = { width: 1440, height: 900 }) {
  const page = await browser.newPage();
  await page.setViewport({ ...viewport, deviceScaleFactor: 1 }); // crisp 1x, no OS chrome
  return page;
}
