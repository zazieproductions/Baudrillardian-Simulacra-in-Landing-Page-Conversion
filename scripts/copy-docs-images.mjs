/**
 * Copy `docs/images/` into `dist/` after a build.
 *
 * The README and the social metadata reference images under `docs/images/`.
 * On GitHub Pages the deploy output is `dist/`, so those paths would 404
 * unless we carry the images into the artifact. This runs as the
 * `postbuild` script so both local `npm run build` and the Pages deploy get
 * them.
 */
import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "docs", "images");
const DIST = join(ROOT, "dist", "docs", "images");

if (!existsSync(SRC)) {
  console.log("[copy-docs-images] no docs/images to copy (skipping)");
  process.exit(0);
}

if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true });

for (const f of readdirSync(SRC)) {
  const src = join(SRC, f);
  if (!statSync(src).isFile()) continue;
  copyFileSync(src, join(DIST, f));
}
console.log("[copy-docs-images] copied docs/images -> dist/docs/images");
