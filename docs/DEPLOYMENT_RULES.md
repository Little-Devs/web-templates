# Deployment Rules for Web Templates

## Overview

All templates in this collection must be **host-agnostic** and easily deployable to multiple platforms. This ensures maximum flexibility for users and prevents vendor lock-in.

## Core Principles

### 1. Host-Agnostic Architecture

Templates should work on ANY static hosting platform without modification:
- Cloudflare Pages
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Generic static hosts
- Self-hosted solutions

### 2. Relative Paths Always

**CRITICAL RULE:** Never use absolute URLs for internal resources.

```html
<!-- ✅ CORRECT - Root-relative paths -->
<img src="/favicon.ico" alt="Logo" />
<link rel="stylesheet" href="/styles/main.css" />
<a href="/about">About</a>

<!-- ✅ CORRECT - Relative imports -->
<script type="module" src="./main.js"></script>

<!-- ❌ WRONG - Absolute URLs -->
<img src="https://mysite.com/favicon.ico" alt="Logo" />
<link rel="stylesheet" href="https://mysite.com/styles/main.css" />
<a href="https://mysite.com/about">About</a>
```

### 3. Configuration Over Hardcoding

Use configuration files and environment variables instead of hardcoded values.

### 4. Subdirectory Deployment Support

Templates must work when deployed to subdirectories:
- `https://example.com/` (root)
- `https://example.com/my-template/` (subdirectory)
- `https://username.github.io/repo-name/` (GitHub Pages pattern)

## Path Best Practices

### Static Assets in Public Folder

**Structure:**
```
public/
├── favicon.ico        → Accessible at /favicon.ico
├── robots.txt         → Accessible at /robots.txt
├── images/
│   └── hero.jpg      → Accessible at /images/hero.jpg
└── fonts/
    └── custom.woff2  → Accessible at /fonts/custom.woff2
```

**Usage:**
```html
<!-- These work on any host -->
<link rel="icon" href="/favicon.ico" />
<img src="/images/hero.jpg" alt="Hero" />
```

### Imported Assets (Hashed)

**For assets that need optimization:**
```typescript
// Astro
import logo from './assets/logo.svg';
import heroImage from './assets/hero.jpg';

// These get hashed and optimized: logo-a8f3d.svg
<img src={logo.src} alt="Logo" />
<Image src={heroImage} alt="Hero" />
```

### Internal Links

**Always use relative paths:**
```html
<!-- ✅ Good -->
<a href="/">Home</a>
<a href="/about">About</a>
<a href="/blog/post-1">Post</a>

<!-- ❌ Bad -->
<a href="https://mysite.com">Home</a>
<a href="https://mysite.com/about">About</a>
```

### External Resources

Only use absolute URLs for external resources:
```html
<!-- ✅ Correct - external resources -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3"></script>

<!-- ✅ Correct - social media icons, analytics -->
<img src="https://twitter.com/username/avatar.jpg" alt="Avatar" />
```

## Environment Variables

### Framework-Specific Patterns

**Astro:**
```typescript
// .env
PUBLIC_API_URL=https://api.example.com
PUBLIC_SITE_URL=https://example.com
SECRET_KEY=your-secret-key

// Usage in code
const apiUrl = import.meta.env.PUBLIC_API_URL;
const siteUrl = import.meta.env.PUBLIC_SITE_URL;

// astro.config.mjs
export default defineConfig({
  site: import.meta.env.PUBLIC_SITE_URL,
})
```

**Next.js:**
```typescript
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_URL=https://example.com
SECRET_KEY=your-secret-key

// Usage in code
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

**Vite (React/Vue):**
```typescript
// .env
VITE_API_URL=https://api.example.com
VITE_SITE_URL=https://example.com

// Usage
const apiUrl = import.meta.env.VITE_API_URL;
```

### Environment Variable Rules

1. **Prefix for public variables:**
   - Astro: `PUBLIC_*`
   - Next.js: `NEXT_PUBLIC_*`
   - Vite: `VITE_*`

2. **Always provide .env.example:**
```bash
# .env.example
PUBLIC_API_URL=https://api.example.com
PUBLIC_SITE_URL=https://example.com
# SECRET_KEY=your-secret-key-here
```

3. **Document in README:**
```markdown
## Environment Variables

Create a `.env` file with:

- `PUBLIC_API_URL` - Your API endpoint
- `PUBLIC_SITE_URL` - Your site URL
- `SECRET_KEY` - Your secret key (optional)
```

4. **Never commit .env to git:**
```gitignore
# .gitignore
.env
.env.local
.env.*.local
```

## Base Path Configuration

### Astro Configuration

**astro.config.mjs:**
```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Root deployment: https://example.com/
  site: 'https://example.com',
  
  // Subdirectory deployment: https://example.com/my-app/
  // base: '/my-app',
  
  // GitHub Pages: https://username.github.io/repo-name/
  // site: 'https://username.github.io',
  // base: '/repo-name',
});
```

**Using base in code:**
```astro
---
const base = import.meta.env.BASE_URL;
---

<img src={`${base}images/logo.png`} alt="Logo" />
<a href={`${base}about`}>About</a>
```

**Or use Astro's built-in handling:**
```astro
<img src="/images/logo.png" alt="Logo" />
<!-- Astro automatically prepends base path -->
```

### Next.js Configuration

**next.config.js:**
```javascript
module.exports = {
  // Root deployment
  basePath: '',
  
  // Subdirectory deployment
  // basePath: '/my-app',
  // assetPrefix: '/my-app',
  
  // For static export
  output: 'export',
  
  // GitHub Pages
  // basePath: '/repo-name',
  // assetPrefix: '/repo-name',
}
```

### Vite Configuration

**vite.config.ts:**
```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  // Root deployment
  base: '/',
  
  // Subdirectory deployment
  // base: '/my-app/',
  
  // Use environment variable
  base: process.env.BASE_URL || '/',
});
```

## Platform-Specific Configurations

### Cloudflare Pages

**Features:**
- Automatic builds from Git
- Edge functions support
- Fast global CDN
- Free SSL

**Configuration:**
```yaml
# .cloudflare/pages.json (optional)
{
  "production_branch": "main",
  "build": {
    "command": "npm run build",
    "output_directory": "dist"
  }
}
```

**Build Settings:**
- Build command: `npm run build`
- Build output: `dist/` (Astro/Vite) or `.next/` (Next.js)
- Node version: 18 or later

**Deployment:**
```bash
# Via Wrangler CLI
npx wrangler pages deploy dist
```

**Environment Variables:**
- Set in Cloudflare dashboard
- Available during build and runtime

### Vercel

**Features:**
- Optimized for Next.js
- Serverless functions
- Edge network
- Preview deployments

**Configuration:**
```json
// vercel.json (optional)
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "routes": [
    { "src": "/(.*)", "dest": "/$1" }
  ]
}
```

**Build Settings:**
- Framework: Auto-detected
- Build command: Usually auto-detected
- Output directory: Auto-detected

**Deployment:**
```bash
# Via Vercel CLI
vercel deploy
```

### Netlify

**Features:**
- Build plugins
- Form handling
- Identity/Auth
- Serverless functions

**Configuration:**
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `dist/`
- Node version: 18 (set in env or .nvmrc)

**Headers (optional):**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### GitHub Pages

**Features:**
- Free hosting for public repos
- Custom domains
- HTTPS support
- Jekyll by default (disable for SPAs)

**Configuration:**

**GitHub Actions workflow:**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v2
        id: deployment
```

**Important for GitHub Pages:**
- Set base path to `/repo-name/` in config
- Add `.nojekyll` file to dist folder
- Configure Pages in repo settings

### Generic Static Hosts

For any static file host (S3, DigitalOcean Spaces, etc.):

**Requirements:**
1. Build the project locally
2. Upload contents of `dist/` folder
3. Configure to serve `index.html` for SPA routes
4. Set proper MIME types
5. Enable gzip/brotli compression

**Example with AWS S3:**
```bash
# Build
npm run build

# Sync to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Set proper redirects for SPA
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document index.html
```

## Deployment Checklist

Before deploying to any platform:

### Pre-Deployment
- [ ] All paths are relative (no absolute URLs)
- [ ] Environment variables configured
- [ ] .env files not committed to git
- [ ] .env.example provided
- [ ] Build completes without errors
- [ ] Build output tested locally
- [ ] Base path configured if needed
- [ ] Assets optimized (images, fonts)
- [ ] Dependencies up to date
- [ ] No console errors in production build

### Platform Setup
- [ ] Build command configured
- [ ] Output directory configured
- [ ] Node version specified (18+)
- [ ] Environment variables set
- [ ] Custom domain configured (if needed)
- [ ] SSL/HTTPS enabled
- [ ] Redirects configured (for SPAs)

### Post-Deployment
- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] All images loading
- [ ] All links working
- [ ] Forms working (if applicable)
- [ ] API calls working
- [ ] Mobile responsive
- [ ] Browser compatibility verified
- [ ] Performance tested (Lighthouse)
- [ ] Analytics working (if configured)

## Testing Multi-Platform Deployment

### Local Testing with Different Base Paths

**Test subdirectory deployment locally:**

1. Build with base path:
```bash
# Set base path
export BASE_URL=/my-app/
npm run build
```

2. Serve with subdirectory:
```bash
# Using Python
cd dist && python -m http.server 8000

# Access at: http://localhost:8000/my-app/
```

3. Verify:
- All links work
- Images load
- CSS loads
- JavaScript loads

### Testing on Staging

Deploy to staging before production:
```bash
# Vercel preview
vercel

# Netlify preview
netlify deploy --prod=false

# Cloudflare Pages preview
wrangler pages deploy dist --branch=preview
```

## Common Deployment Issues

### Issue: Assets Not Loading

**Cause:** Absolute URLs or incorrect base path

**Solution:**
```javascript
// ❌ Wrong
<img src="/images/logo.png" />

// ✅ Correct with base path
const base = import.meta.env.BASE_URL;
<img src={`${base}images/logo.png`} />

// ✅ Or let framework handle it
<img src="/images/logo.png" />
// (if base is configured in framework config)
```

### Issue: 404 on Page Refresh (SPA)

**Cause:** Server not configured for SPA routing

**Solution:**

**Netlify:**
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel:**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Cloudflare Pages:**
- Automatic for most frameworks
- Or add `_redirects` file

### Issue: Environment Variables Not Working

**Cause:** Variables not prefixed correctly or not set in platform

**Solution:**
1. Check prefix (PUBLIC_, NEXT_PUBLIC_, VITE_)
2. Set in platform dashboard
3. Redeploy after adding variables

### Issue: Build Fails on Platform

**Cause:** Dependency issues, wrong Node version, or missing env vars

**Solution:**
1. Specify Node version (18+)
2. Check build logs
3. Test build locally
4. Verify all dependencies in package.json

## Security Considerations

### Headers

Set security headers in platform config:

**Netlify:**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```

**Vercel:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### HTTPS

- Always use HTTPS in production
- All platforms provide free SSL
- Redirect HTTP to HTTPS

### API Keys

- Never expose secret keys in frontend code
- Use environment variables
- Use serverless functions for sensitive operations

## Documentation Requirements

Every template's README must include:

### Deployment Section

```markdown
## Deployment

### Cloudflare Pages

1. Connect your repository
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Set environment variables (if any)
4. Deploy

### Vercel

1. Import repository
2. Framework detected automatically
3. Set environment variables (if any)
4. Deploy

### Netlify

1. Connect repository
2. Configure build:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Set environment variables (if any)
4. Deploy

### GitHub Pages

See `.github/workflows/deploy.yml` for automated deployment.

### Custom Domain

After deployment:
1. Add custom domain in platform dashboard
2. Update DNS records
3. Wait for SSL certificate
```

## Best Practices Summary

✅ **DO:**
- Use relative paths for all internal resources
- Configure base path in framework config
- Test subdirectory deployment
- Provide .env.example
- Document deployment steps
- Test on multiple platforms
- Set security headers
- Use environment variables

❌ **DON'T:**
- Hardcode absolute URLs
- Commit .env files
- Assume root deployment
- Forget subdirectory support
- Skip deployment testing
- Ignore security headers
- Hardcode API endpoints

## Resources

- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
