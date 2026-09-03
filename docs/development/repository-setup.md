# Repository setup (GitHub)

These are the GitHub-side settings that make the repository present well to a
visitor. They can't be set from the repo code (they require repo-admin
permissions), so apply them manually.

## Description

Suggested (under 160 characters):

```
An experimental browser instrument that monetizes Simulacra & Simulation — a hyperreal landing page that sells the page reading itself.
```

## Topics

Suggested:

```
creative-coding
experimental-web
interactive-art
web-audio
generative-art
react
typescript
creative-technology
audiovisual
computational-aesthetics
```

## Website / homepage

Set the repository **Website** field to:

```
https://zazieproductions.github.io/Baudrillardian-Simulacra-in-Landing-Page-Conversion/
```

## Social preview

Upload **`docs/images/github-social-preview.png`** (1280×640) through:

```
Repository Settings → General → Social preview
```

That is the image shown when the repository link is shared. The same file is
also referenced by the site's Open Graph metadata (see `index.html`).

## GitHub Pages

Enable Pages under:

```
Repository Settings → Pages → Source → GitHub Actions
```

The `.github/workflows/deploy-pages.yml` workflow publishes `dist/` on every
push to `main`. The canonical site URL is then:

```
https://zazieproductions.github.io/Baudrillardian-Simulacra-in-Landing-Page-Conversion/
```

> Note: the automated deploy only triggers on push to `main`. Merging the
> `arena/...` branch into `main` (via a pull request) will publish it.
