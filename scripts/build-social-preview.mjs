/**
 * Build the 1280x640 GitHub social preview from a *real* screenshot of the
 * running application plus restrained typography.
 *
 * We render an HTML page at exactly 1280x640 in the same headless Chromium
 * used for screenshots. The live project-preview capture is embedded as the
 * background, cropped toward the stage/player region and darkened so the
 * overlaid type reads cleanly. No AI image generation, no reconstructed UI.
 *
 * Run with: node scripts/build-social-preview.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser, newPage } from "./lib/browser.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PREVIEW = join(ROOT, "docs", "images", "project-preview.png");
const OUT = join(ROOT, "docs", "images", "github-social-preview.png");

const WIDTH = 1280;
const HEIGHT = 640;

// Brand colors (must match src/index.css @theme tokens).
const INK = "#0b0a08";
const PAPER = "#f6f1e4";
const YELLOW = "#f4c400";
const RED = "#ff2d2d";
const CRITIQUE = "#ff5c4d";

const BASE64 = readFileSync(PREVIEW).toString("base64");

function fileUrl(p) {
  return "file://" + p.split("/").map(encodeURIComponent).join("/");
}

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  @font-face { font-family: 'Anton'; src: url(${fileUrl(join(ROOT, "node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2"))}) format('woff2'); font-weight: 400; }
  @font-face { font-family: 'Fraunces'; src: url(${fileUrl(join(ROOT, "node_modules/@fontsource/fraunces/files/fraunces-latin-400-italic.woff2"))}) format('woff2'); font-style: italic; font-weight: 400; }
  @font-face { font-family: 'JetBrains Mono'; src: url(${fileUrl(join(ROOT, "node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2"))}) format('woff2'); font-weight: 400; }
  html,body { margin:0; width:${WIDTH}px; height:${HEIGHT}px; overflow:hidden; background:${INK}; }
  * { box-sizing:border-box; }
  .bg { position:absolute; inset:0; }
  .bg img { width:${WIDTH}px; height:${HEIGHT}px; object-fit:cover; object-position:center 118%; filter:brightness(0.42) saturate(1.05) contrast(1.05); }
  .shade { position:absolute; inset:0; background:
      linear-gradient(180deg, rgba(11,10,8,0.98) 0%, rgba(11,10,8,0.82) 42%, rgba(11,10,8,0.22) 78%, rgba(11,10,8,0.05) 100%),
      linear-gradient(90deg, rgba(11,10,8,0.9) 0%, rgba(11,10,8,0.72) 40%, rgba(11,10,8,0.28) 74%, rgba(11,10,8,0.1) 100%);
  }
  .wordmark { position:absolute; top:40px; left:48px; font-family:'Anton'; font-size:22px; letter-spacing:1px; color:${PAPER}; }
  .wordmark .tag { color:${YELLOW}; }
  .wordmark sup { font-family:'JetBrains Mono'; font-size:8px; color:${CRITIQUE}; }
  .mode { position:absolute; top:44px; right:48px; font-family:'JetBrains Mono'; font-size:10px; letter-spacing:3px; text-transform:uppercase; color:#8b8578; border:1px solid rgba(255,45,45,0.5); padding:6px 12px; border-radius:999px; }
  .mode .on { color:${CRITIQUE}; }
  .title { position:absolute; left:50px; top:210px; width:680px; }
  .kicker { font-family:'JetBrains Mono'; font-size:12px; letter-spacing:4px; text-transform:uppercase; color:${RED}; margin-bottom:18px; }
  h1 { font-family:'Anton'; font-size:60px; line-height:0.97; margin:0 0 20px; color:${PAPER}; text-shadow:0 0 40px rgba(11,10,8,0.9); }
  h1 .hl { color:${YELLOW}; }
  h1 .hl2 { color:${RED}; }
  .desc { font-family:'Fraunces'; font-style:italic; font-weight:400; font-size:18px; line-height:1.42; color:rgba(246,241,228,0.85); max-width:560px; text-shadow:0 0 20px rgba(11,10,8,0.9); }
  .foot { position:absolute; bottom:36px; left:50px; right:48px; display:flex; justify-content:space-between; align-items:flex-end; }
  .credit { font-family:'JetBrains Mono'; font-size:12px; letter-spacing:3px; text-transform:uppercase; color:${PAPER}; }
  .stage { font-family:'JetBrains Mono'; font-size:11px; letter-spacing:2px; color:${CRITIQUE}; }
</style></head>
<body>
  <div class="bg"><img src="data:image/png;base64,${BASE64}" alt="" /></div>
  <div class="shade"></div>
  <div class="wordmark">THE <span class="tag">PRODUCT</span><sup>™</sup></div>
  <div class="mode">simulation <span class="on">●</span> critique</div>
  <div class="title">
    <div class="kicker">A four-stage Baudrillardian simulacrum</div>
    <h1>THE SECRET ISN'T<br/>HIDDEN. <span class="hl">IT WAS NEVER</span> <span class="hl2">THERE.</span></h1>
    <div class="desc">A hyperreal landing page that sells itself — a browser-based critique of persuasion built with React, TypeScript and procedural motion.</div>
  </div>
  <div class="foot">
    <div class="credit">Zazie Productions</div>
    <div class="stage">STAGE IV / IV — PURE SIMULACRUM</div>
  </div>
</body></html>`;

async function main() {
  const browser = await launchBrowser();
  const page = await newPage(browser, { width: WIDTH, height: HEIGHT });
  try {
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts?.ready);
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: OUT, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
    console.log("[social] wrote", OUT);
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
