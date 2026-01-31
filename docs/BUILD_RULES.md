# Build Rules for Web Templates

## Overview

This document outlines technical standards and build processes for all templates in the web-templates collection. Following these rules ensures consistency, maintainability, and production-readiness.

## Tech Stack Standards

### Framework Selection

Choose frameworks based on template requirements:

**Astro (Preferred for Static Sites)**
- Best for content-focused sites
- Zero JavaScript by default
- Excellent performance out of the box
- Island architecture for selective interactivity
- Built-in image optimization
- Use for: Landing pages, marketing sites, documentation, blogs

**Next.js (For Dynamic/SSR Sites)**
- Server-side rendering and static generation
- API routes for backend functionality
- React ecosystem
- Great developer experience
- Use for: Dashboards, SaaS apps, e-commerce

**React (For Complex Interactivity)**
- Component-based architecture
- Rich ecosystem
- Strong TypeScript support
- Use for: Interactive applications, SPAs

**Vue or Svelte (Alternative Frameworks)**
- Lighter weight than React
- Great performance
- Excellent developer experience
- Use when project benefits from these frameworks

### Always Use TypeScript

**Required for all new templates:**
- Catch errors at compile time
- Better IDE support and autocomplete
- Self-documenting code
- Easier refactoring
- Industry standard for modern web development

```json
// tsconfig.json example
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Styling Approaches

**Tailwind CSS (Preferred)**
- Utility-first approach
- Rapid development
- Small production bundle
- Consistent design system
- Great with component frameworks
- Use for: Most templates

**CSS Modules**
- Scoped styles
- Traditional CSS syntax
- No build step required
- Use for: Templates where Tailwind feels heavy

**Vanilla CSS with Design Systems**
- Custom properties (CSS variables)
- BEM or similar methodology
- Full control over output
- Use for: Showcase/educational templates

**Avoid:**
- ❌ Styled-components or CSS-in-JS (runtime overhead)
- ❌ Sass/SCSS (unnecessary with modern CSS)
- ❌ Inline styles (unless absolutely necessary)

### Build Tools

**Vite (Preferred)**
- Extremely fast HMR
- ESM-native
- Modern browser support
- Rich plugin ecosystem
- Use for: Most templates

**Alternative Build Tools:**
- Webpack (if needed for specific features)
- Turbopack (Next.js 13+)
- Parcel (simple projects)

## Project Structure

### Standard Template Structure

```
template-name/
├── public/                 # Static assets (accessible at root)
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/         # Reusable components
│   │   ├── ui/            # Generic UI components
│   │   └── sections/      # Page sections
│   ├── layouts/           # Layout components
│   ├── pages/             # Route pages (Astro) or app pages
│   ├── styles/            # Global styles
│   │   ├── global.css
│   │   └── variables.css
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript type definitions
├── .env.example           # Environment variable template
├── .gitignore
├── astro.config.mjs       # Or next.config.js, vite.config.ts
├── package.json
├── README.md
├── template.json          # Template metadata
├── tsconfig.json
└── LICENSE
```

### File Naming Conventions

**Components:**
- PascalCase: `Button.tsx`, `HeroSection.astro`
- One component per file
- Co-locate styles if using CSS Modules

**Utilities:**
- camelCase: `formatDate.ts`, `apiHelpers.ts`

**Types:**
- PascalCase: `User.ts`, `ApiResponse.ts`
- Interfaces: `interface ButtonProps {}`
- Types: `type Theme = 'light' | 'dark'`

**Pages/Routes:**
- kebab-case: `about-us.astro`, `contact.tsx`
- Or framework convention (Next.js: `about-us/page.tsx`)

## Code Quality Standards

### Clean Code Principles

**1. Descriptive Naming**
```typescript
// Good
const fetchUserDataFromAPI = async (userId: string) => { ... }
const isAuthenticated = checkAuthStatus();

// Bad
const getData = async (id: string) => { ... }
const flag = check();
```

**2. Keep Functions Small**
- Single responsibility principle
- Max 50-75 lines per function
- Extract complex logic into separate functions

**3. Comment Complex Logic**
```typescript
// Good - explains WHY
// Using exponential backoff to handle rate limiting from API
const retryWithBackoff = async (fn: Function, maxRetries = 3) => {
  // Implementation
}

// Avoid - explains WHAT (code already shows this)
// This function retries
const retry = async (fn: Function) => { ... }
```

**4. Remove Debug Code**
- No `console.log` in production code
- No commented-out code blocks
- No debug flags left enabled
- Use proper logging libraries if logging needed

**5. Error Handling**
```typescript
// Good - proper error handling
try {
  const data = await fetchData();
  return processData(data);
} catch (error) {
  console.error('Failed to fetch data:', error);
  throw new Error('Unable to load content. Please try again.');
}

// Bad - silent failures
try {
  const data = await fetchData();
} catch (error) {
  // Nothing
}
```

### TypeScript Best Practices

**Use proper types, not `any`:**
```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = (id: string): Promise<User> => { ... }

// Bad
const getUser = (id: any): any => { ... }
```

**Use type inference when obvious:**
```typescript
// Good - type is clear from context
const count = 0;
const isActive = true;

// Unnecessary - type annotation is obvious
const count: number = 0;
```

**Define prop types for components:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', size = 'md', onClick, children }: ButtonProps) => {
  // Implementation
}
```

### Security Best Practices

**1. Never Commit Secrets**
- Use `.env` files for sensitive data
- Add `.env` to `.gitignore`
- Provide `.env.example` with dummy values

**2. Sanitize User Input**
```typescript
// Good
const sanitizeInput = (input: string) => {
  return input.replace(/[<>]/g, '');
}

const userInput = sanitizeInput(req.body.message);
```

**3. Use Environment Variables**
```typescript
// Good
const apiKey = import.meta.env.PUBLIC_API_KEY;

// Bad - hardcoded sensitive data
const apiKey = "sk-1234567890abcdef";
```

**4. Validate External Data**
```typescript
// Use libraries like Zod for runtime validation
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  age: z.number().min(0).max(120),
});

const user = UserSchema.parse(externalData);
```

## Performance Requirements

### Lighthouse Score Targets

Aim for these minimum scores:
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 90+

### Image Optimization

**1. Use Modern Formats**
- WebP for photos (with fallback)
- AVIF when supported
- SVG for icons and illustrations
- Avoid large PNGs

**2. Proper Sizing**
```astro
---
import { Image } from 'astro:assets';
import heroImage from './hero.jpg';
---

<!-- Good - optimized with Astro -->
<Image 
  src={heroImage} 
  alt="Hero image"
  width={1200}
  height={600}
  format="webp"
/>

<!-- Bad - unoptimized -->
<img src="/images/hero.jpg" alt="Hero image" />
```

**3. Lazy Loading**
```html
<!-- Load images below the fold lazily -->
<img src="image.jpg" loading="lazy" alt="Description" />
```

**4. Responsive Images**
```html
<img
  srcset="
    small.jpg 480w,
    medium.jpg 768w,
    large.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, 1200px"
  src="medium.jpg"
  alt="Responsive image"
/>
```

### JavaScript Optimization

**1. Code Splitting**
```typescript
// Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Use with Suspense
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

**2. Tree Shaking**
- Import only what you need
```typescript
// Good
import { formatDate } from './utils';

// Bad - imports everything
import * as utils from './utils';
```

**3. Minimize Dependencies**
- Audit dependencies regularly
- Remove unused packages
- Choose lightweight alternatives

**4. Defer Non-Critical JS**
```html
<script src="analytics.js" defer></script>
```

### CSS Optimization

**1. Critical CSS**
- Inline critical CSS in `<head>`
- Load non-critical CSS asynchronously

**2. Remove Unused CSS**
- Tailwind automatically purges unused classes
- For custom CSS, use PurgeCSS

**3. Minification**
- Build tools handle this automatically
- Verify minified output in production

### Loading States

Always show feedback for async operations:
```typescript
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleSubmit = async () => {
  setIsLoading(true);
  setError(null);
  
  try {
    await submitForm(data);
  } catch (err) {
    setError('Submission failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
}

return (
  <button disabled={isLoading}>
    {isLoading ? 'Submitting...' : 'Submit'}
  </button>
)
```

## Responsive Design Standards

### Breakpoint System

Use consistent breakpoints:
```css
/* Mobile-first approach */
.element {
  /* Mobile: default styles */
}

/* Tablet */
@media (min-width: 768px) {
  .element { /* Tablet styles */ }
}

/* Desktop */
@media (min-width: 1024px) {
  .element { /* Desktop styles */ }
}

/* Large Desktop */
@media (min-width: 1440px) {
  .element { /* Large screen styles */ }
}
```

With Tailwind CSS:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- Content -->
</div>
```

### Touch Targets

Minimum sizes for interactive elements:
- **Buttons:** 44px × 44px minimum
- **Links:** Generous padding around text
- **Form inputs:** Large enough for easy tapping

```css
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.5rem;
}
```

### Viewport Meta Tag

Always include:
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

## Accessibility Requirements

### WCAG AA Compliance

Minimum standards for all templates:

**1. Color Contrast**
- 4.5:1 for normal text
- 3:1 for large text (18px+ or bold 14px+)
- Test with WebAIM Contrast Checker

**2. Keyboard Navigation**
```css
/* Visible focus indicators */
*:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

/* Don't remove focus styles */
button:focus {
  outline: none; /* ❌ Never do this */
}
```

**3. Semantic HTML**
```html
<!-- Good -->
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Page Title</h1>
    <p>Content</p>
  </article>
</main>

<!-- Bad -->
<div class="header">
  <div class="nav">
    <div class="link">Home</div>
  </div>
</div>
```

**4. ARIA Labels**
```html
<!-- For icon buttons without text -->
<button aria-label="Close menu">
  <CloseIcon />
</button>

<!-- For form inputs -->
<label for="email">Email Address</label>
<input id="email" type="email" required />
```

**5. Alt Text for Images**
```html
<!-- Good - descriptive -->
<img src="chart.png" alt="Sales growth chart showing 25% increase" />

<!-- Bad - not descriptive -->
<img src="chart.png" alt="chart" />

<!-- Decorative images -->
<img src="decoration.png" alt="" role="presentation" />
```

**6. Heading Hierarchy**
```html
<!-- Good -->
<h1>Page Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>
    <h3>Subsection</h3>
  <h2>Section</h2>

<!-- Bad - skipping levels -->
<h1>Page Title</h1>
  <h3>Section</h3>
```

**7. Motion Preferences**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Testing Standards

### Browser Compatibility

Test on:
- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

### Device Testing

Test on:
- ✅ Mobile (320px - 767px)
- ✅ Tablet (768px - 1023px)
- ✅ Desktop (1024px+)
- ✅ Large desktop (1440px+)

### Automated Testing

Consider adding:
- Lighthouse CI
- Accessibility tests (axe-core)
- Visual regression tests
- Link checking

## Documentation Requirements

### README.md Structure

Every template must include:

```markdown
# Template Name

Brief description

## Features

- Feature 1
- Feature 2

## Tech Stack

- Framework
- Styling
- Other dependencies

## Getting Started

### Prerequisites
- Node.js 18+
- npm/pnpm/yarn

### Installation
\`\`\`bash
npm install
\`\`\`

### Development
\`\`\`bash
npm run dev
\`\`\`

### Build
\`\`\`bash
npm run build
\`\`\`

## Deployment

Instructions for:
- Cloudflare Pages
- Vercel
- Netlify
- Other platforms

## Customization

How to customize:
- Colors
- Typography
- Layout
- Content

## Project Structure

Explanation of folders and files

## License

MIT
```

### Inline Code Comments

Comment complex logic:
```typescript
/**
 * Calculates the optimal image size based on viewport and device pixel ratio
 * @param viewport - Current viewport width in pixels
 * @param dpr - Device pixel ratio (1, 2, or 3)
 * @returns Optimal image width in pixels
 */
const calculateImageSize = (viewport: number, dpr: number): number => {
  // Cap at 2400px to avoid excessive file sizes
  return Math.min(viewport * dpr, 2400);
}
```

## Dependency Management

### Keep Dependencies Updated

Regular maintenance:
```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Or use tools like Dependabot
```

### Avoid Dependency Bloat

Before adding a package:
1. Is it really needed?
2. Can vanilla JS/CSS do it?
3. What's the bundle size impact?
4. Is it actively maintained?
5. Are there lighter alternatives?

### Lock File

Always commit:
- `package-lock.json` (npm)
- `pnpm-lock.yaml` (pnpm)
- `yarn.lock` (yarn)

## Build Checklist

Before marking a template as complete:

- [ ] TypeScript with no errors
- [ ] All dependencies documented in package.json
- [ ] No console errors in browser
- [ ] No console warnings (except expected ones)
- [ ] All links work
- [ ] All images load
- [ ] Lighthouse score 90+ on all metrics
- [ ] Works on all major browsers
- [ ] Responsive on mobile, tablet, desktop
- [ ] WCAG AA accessibility compliance
- [ ] Loading states for async operations
- [ ] Error handling implemented
- [ ] Environment variables in .env.example
- [ ] README.md complete
- [ ] template.json complete
- [ ] Code is clean and commented
- [ ] No hardcoded sensitive data
- [ ] Build completes without errors
- [ ] Production build tested locally

## Common Anti-Patterns to Avoid

### Build Anti-Patterns

❌ **Using outdated patterns:**
- Class components in React (use hooks)
- Default exports everywhere (use named exports)
- PropTypes (use TypeScript)

❌ **Performance mistakes:**
- Not lazy loading images
- Loading all JavaScript upfront
- No code splitting
- Importing entire libraries

❌ **Accessibility oversights:**
- Missing alt text
- Poor color contrast
- No keyboard support
- Div soup instead of semantic HTML

❌ **Security issues:**
- Committing secrets
- Not sanitizing input
- Hardcoded API keys
- Missing CORS headers

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [Astro Documentation](https://docs.astro.build)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Web.dev Performance](https://web.dev/performance/)
- [WebAIM Accessibility](https://webaim.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
