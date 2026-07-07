# My Interactive CV

An interactive 3D CV/portfolio website built with **Next.js**, **React Three Fiber**, **Framer Motion**, and **Tailwind CSS**.

🌐 **Live:** [https://bolebg.github.io/my-interactive-cv](https://bolebg.github.io/my-interactive-cv)

## Tech Stack

- **Next.js** — Static site generation with `output: 'export'`
- **React Three Fiber** — 3D particle background
- **Framer Motion** — Animations & interactive effects
- **Tailwind CSS v4** — Styling
- **Three.js** — 3D rendering

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (static export to ./out)
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Deployment

This project is configured for **GitHub Pages** deployment via GitHub Actions.

### How it works

1. Push to the `main` branch
2. The `.github/workflows/deploy.yml` workflow automatically:
   - Builds the project with `npm run build`
   - Exports static files to the `out/` folder
   - Deploys to GitHub Pages

### Configuration

- `next.config.ts` — `output: 'export'` + `basePath: '/my-interactive-cv'` for sub-path hosting
- `images.unoptimized: true` — required for static export

### Manual Setup (one-time)

1. Go to your repo **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. The workflow file at `.github/workflows/deploy.yml` will handle the rest

