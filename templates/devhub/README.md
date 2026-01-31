# DevHub - Developer Platform Template

A GitHub-inspired developer platform landing page template built with Astro. Features a dark theme, animated components, and modern UI patterns perfect for developer tools, SaaS products, and tech startups.

## Preview

- Dark theme with purple/green accents
- Animated hero with particle effects
- Interactive feature tabs
- Infinite scrolling logo carousel
- AI chat demo interface
- Security stats cards
- Responsive design (mobile-first)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
devhub/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro          # Navigation with hamburger menu
│   │   ├── Hero.astro            # Hero with email signup
│   │   ├── FeatureTabs.astro     # Tabbed feature showcase
│   │   ├── CustomerLogos.astro   # Infinite scroll carousel
│   │   ├── CopilotDemo.astro     # AI chat demo section
│   │   ├── SecuritySection.astro # Stats and feature cards
│   │   ├── Testimonial.astro     # Quote section
│   │   ├── CTASection.astro      # Final call-to-action
│   │   └── Footer.astro          # Multi-column footer
│   ├── pages/
│   │   └── index.astro           # Main page
│   └── styles/
│       ├── global.css            # Global styles & utilities
│       └── variables.css         # CSS custom properties
├── astro.config.mjs
├── package.json
├── template.json
└── tsconfig.json
```

## Customization

### Colors

Edit `src/styles/variables.css` to change the color scheme:

```css
:root {
  /* Background */
  --color-canvas-default: #0D1117;
  
  /* Accent (CTA buttons) */
  --color-accent-emphasis: #1A7F37;
  
  /* Purple highlights */
  --color-purple-fg: #A371F7;
  
  /* Links */
  --color-link: #79C0FF;
}
```

### Typography

Fonts are loaded via Google Fonts in `global.css`. To change fonts:

1. Update the Google Fonts import URL
2. Update the `--font-family` and `--font-family-mono` variables

### Content

Each component accepts props for customization:

```astro
<Hero 
  headline="Your custom headline"
  subheadline="Your custom description"
  primaryCta="Get Started"
  secondaryCta="Learn More"
/>
```

### Adding Sections

1. Create a new component in `src/components/`
2. Import and add it to `src/pages/index.astro`

## Features

### Responsive Design

- Mobile: Hamburger menu, stacked layouts
- Tablet: Condensed navigation
- Desktop: Full multi-column layouts

### Animations

- CSS-based animations (performant)
- Scroll-triggered reveals
- Hover effects on buttons/cards
- Reduced motion support

### Accessibility

- Skip to content link
- ARIA labels on interactive elements
- Focus indicators
- 4.5:1 color contrast ratio
- Keyboard navigation

## Deployment

### Cloudflare Pages

```bash
npm run build
# Deploy the `dist/` folder
```

### Vercel

```bash
npx vercel
```

### Netlify

```bash
npx netlify deploy --prod
```

### GitHub Pages

1. Update `astro.config.mjs`:
   ```js
   export default defineConfig({
     site: 'https://username.github.io',
     base: '/repo-name',
   });
   ```
2. Build and deploy the `dist/` folder

## Tech Stack

- **Framework**: Astro 5.1
- **Styling**: Pure CSS with custom properties
- **TypeScript**: Strict mode enabled
- **Icons**: Inline SVGs
- **Fonts**: Inter, JetBrains Mono

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT License - See [LICENSE](./LICENSE) for details.
