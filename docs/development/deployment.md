# Deployment

The project deploys to **GitHub Pages**. The canonical live URL is:

```
https://zazieproductions.github.io/Baudrillardian-Simulacra-in-Landing-Page-Conversion/
```

## The workflow

[`.github/workflows/deploy-pages.yml`](../../.github/workflows/deploy-pages.yml)
runs on every push to `main` (and on `workflow_dispatch`):

1. **build** job: checkout, npm ci, lint, typecheck, build.
   The build sets `VITE_BASE=/${{ github.event.repository.name }}/` so asset
   paths resolve under the repo sub-path.
2. Uploads `dist/` as a Pages artifact.
3. **deploy** job: uses `actions/deploy-pages` to publish the artifact.

## Configuring GitHub Pages

Pages must be pointed at the Actions source:

1. **Settings → Pages**
2. **Source** → select **GitHub Actions**.
3. Push to `main` (or trigger the workflow) and the site deploys.

## Why a sub-path

GitHub Pages serves a repo at `https://<owner>.github.io/<repo>/`. Vite bundles
absolute asset URLs by default; setting `VITE_BASE=/<repo>/` fixes them. The
app itself uses in-page fragment anchors (`#offer`, `#faq`) for navigation, so
there is no client-side routing that needs a fallback — refreshes are fine.

## Verify after deploy

```bash
curl -sI https://zazieproductions.github.io/Baudrillardian-Simulacra-in-Landing-Page-Conversion/ | head -3
curl -s https://zazieproductions.github.io/Baudrillardian-Simulacra-in-Landing-Page-Conversion/ | grep -oE 'src="[^"]+"' | head
```

Check that asset URLs in the HTML are prefixed with `/Baudrillardian-Simulacra-in-Landing-Page-Conversion/`.

## Alternatives

- **Vercel / Netlify / Cloudflare Pages** — also work. Set build command
  `npm run build` and output directory `dist`. No route rewriting is needed
  (fragment routing only). If deploying to a custom domain or root path,
  override `VITE_BASE=/`.

## Local preview of the production build

```bash
npm run preview
```

This serves `dist/` (built by `npm run build`). To preview with the GitHub
Pages base path, set `VITE_BASE` before building:

```bash
VITE_BASE=/Baudrillardian-Simulacra-in-Landing-Page-Conversion/ npm run build
VITE_BASE=/Baudrillardian-Simulacra-in-Landing-Page-Conversion/ npm run preview
```
