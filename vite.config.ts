import { defineConfig, loadEnv } from "vite";
import { execSync } from "node:child_process";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Vite configuration.
 *
 * - `base` is derived from the local git remote so the production bundle works
 *   when deployed to GitHub Pages under a `<repo>` sub-path. When no remote
 *   is present (or the remote isn't github.com) it falls back to "/".
 * - Env vars prefixed with `VITE_` and `NEXT_PUBLIC_` are exposed to client
 *   code as `process.env.*` defines (used sparingly; there are no required
 *   secrets).
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ["VITE_", "NEXT_PUBLIC_"]);

  const processEnvDefines: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    processEnvDefines[`process.env.${key}`] = JSON.stringify(value);
  }

  return {
    plugins: [react(), tailwindcss()],
    envPrefix: ["VITE_", "NEXT_PUBLIC_"],
    define: processEnvDefines,
    base: resolveBasePath(),
    server: {
      // Bind to all interfaces so the sandbox live-preview proxy can reach us.
      host: "0.0.0.0",
      // Accept the sandbox preview host and common local hosts. `true` allows
      // any host; scoping to the ones that matter keeps this deterministic.
      allowedHosts: ["0.0.0.0", "localhost", "127.0.0.1", ".e2b.app", ".arena.app"],
    },
    preview: {
      host: "0.0.0.0",
      allowedHosts: ["0.0.0.0", "localhost", "127.0.0.1", ".e2b.app", ".arena.app"],
    },
  };
});

/**
 * Determine the correct Vite base path.
 *
 * GitHub Pages serves a repo at `https://<owner>.github.io/<repo>/`, so
 * assets must be prefixed with `/<repo>/`. We read the remote URL so the
 * build is portable whether run locally, in CI, or in this sandbox.
 */
function resolveBasePath(): string {
  const override = process.env.VITE_BASE;
  if (override) return override;

  try {
    const remote = execSync("git remote get-url origin").toString().trim();
    const match = remote.match(/github\.com[/:]([^/]+)\/([^/.]+)/);
    if (match) return `/${match[2]}/`;
  } catch {
    // not a git repo, or no origin remote — fall through to "/"
  }
  return "/";
}
