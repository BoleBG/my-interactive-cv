This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

# Create the Next.js project
npx create-next-app@latest my-interactive-cv --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm

# Navigate into the project
cd my-interactive-cv

# Install all dependencies
npm install framer-motion lucide-react @react-three/fiber @react-three/drei three next-themes
npm install -D @types/three



First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploying to GitHub Pages (Static HTML Export)

This project has been prepared for **GitHub Pages** deployment using a static HTML export configuration.

### How it works
Next.js is configured with `output: 'export'` in `next.config.ts`. Running the build command compiles the React application into pure, static HTML, CSS, and JS files, saving them in the `out/` folder.

### Configuration Options
Open `next.config.ts`:
1. **Custom Domain / Root Site** (e.g., `https://<username>.github.io`):
   No changes needed.
2. **Project Repository Sub-path** (e.g., `https://<username>.github.io/my-interactive-cv`):
   Set the `basePath` option to match your repository name:
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',
     basePath: '/my-interactive-cv', // change to your repo name
     images: {
       unoptimized: true,
     },
   };
   ```

### Deploying Automatically via GitHub Actions (Recommended)

1. Go to your repository settings on GitHub → **Pages** → **Build and deployment**.
2. Set **Source** to **GitHub Actions**.
3. Create a workflow file in your project: `.github/workflows/deploy.yml` with the following content:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: ["Enchancements"] # Triggers on push to the Enchancements branch

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: false

   jobs:
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         
         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: "20"
             cache: npm

         - name: Setup Pages
           uses: actions/configure-pages@v4

         - name: Install dependencies
           run: npm ci

         - name: Build with Next.js
           run: npm run build

         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./out

         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

### Deploying Manually

1. Run the build command:
   ```bash
   npm run build
   ```
2. The static files will be generated in the `out/` folder.
3. Push the contents of the `out/` folder to your GitHub Pages repository branch (e.g., `gh-pages` or the root of your custom domain repository).

