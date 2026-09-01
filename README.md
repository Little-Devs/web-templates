# Little-Devs Web Templates

A curated collection of production-ready website templates for AI agents and developers. Each template is a separate git repository, accessible as submodules for easy maintenance and versioning.

## Template Collection

### Available Templates

| Template | Category | Tech Stack | Description |
|----------|----------|------------|-------------|
| [DevHub](https://github.com/Little-Devs/template-devhub) | Landing Page | Astro, CSS, TS | GitHub-inspired developer platform with dark theme and animations |
| [Flat Technology](https://github.com/Little-Devs/template-flat-technology) | Portfolio | Nuxt, Vue 3, Tailwind | Modern architecture studio showcase with GSAP animations |
| [FlowForge](https://github.com/Little-Devs/template-flowforge) | Landing Page | Astro, CSS, JS | Technical luxury automation platform landing page |
| [Glass Showcase](https://github.com/Little-Devs/template-glass-showcase) | Landing Page | Astro, CSS, JS | Horizontal-scrolling glassmorphism showcase with 18 sections |
| [Stitch](https://github.com/Little-Devs/template-stitch) | Dashboard | Astro, CSS, TS | Modern admin dashboard with dark theme, charts, and data tables |
| [Therme Kanzian](https://github.com/Little-Devs/template-therme-kanzian) | Landing Page | Astro, CSS, TS | Wellness spa with video hero, 7 pages, minimal design |
| [Atelier Folio](https://github.com/Little-Devs/template-atelier) | Portfolio | Astro, CSS, TS | Editorial photography studio portfolio, warm paper and oxide red |
| [Harbor Clinic](https://github.com/Little-Devs/template-harbor) | Landing Page | Astro, CSS, TS | Coastal family clinic landing, seafoam and harbour slate |
| [Cedar Table](https://github.com/Little-Devs/template-cedar) | Landing Page | Astro, CSS, TS | Pacific Northwest farm-to-table restaurant landing |
| [Ridge Trades](https://github.com/Little-Devs/template-ridge) | Landing Page | Astro, CSS, TS | Mountain-state general contractor landing |
| [Saltwind Inn](https://github.com/Little-Devs/template-saltwind) | Landing Page | Astro, CSS, TS | Coastal inn landing on a working harbour |
| [Meterline](https://github.com/Little-Devs/template-meterline) | Landing Page | Astro, CSS, TS | B2B SaaS usage billing and analytics landing |
| [Hale & Rowan](https://github.com/Little-Devs/template-hale) | Landing Page | Astro, CSS, TS | Architecture studio professional services landing |
| [Mews House](https://github.com/Little-Devs/template-mews) | Landing Page | Astro, CSS, TS | Heritage townhouse and mews estate landing |
| [North Harbor IT](https://github.com/Little-Devs/template-northharbor) | Landing Page | Astro, CSS, TS | Regional IT and MSP landing |
| [Ochre Signal](https://github.com/Little-Devs/template-ochre) | Landing Page | Astro, CSS, TS | Australian-owned cyber and managed services landing |
| [Vale Freight](https://github.com/Little-Devs/template-vale) | Landing Page | Astro, CSS, TS | Bass Strait and Tasman short-sea freight operator landing |
| [Marrow](https://github.com/Little-Devs/template-marrow) | Landing Page | Astro, CSS, TS | Brunswick strength gym landing, bone iron oxblood |

Browse the complete catalog in [`templates.json`](./templates.json).

## Quick Start

### For Developers

Clone the entire collection with all templates:

```bash
git clone --recursive https://github.com/Little-Devs/web-templates.git
cd web-templates
```

Or clone the main repo and initialize submodules later:

```bash
git clone https://github.com/Little-Devs/web-templates.git
cd web-templates
git submodule update --init --recursive
```

### Using a Specific Template

```bash
cd templates/flowforge
npm install
npm run dev
```

Each template has its own README with detailed instructions.

### For AI Agents

AI agents can discover and use templates through:

1. **GitHub MCP**: Access repositories directly via the GitHub MCP integration
2. **Catalog API**: Read `templates.json` for structured metadata about all templates

Example agent workflow:

```javascript
const catalog = await fetch('https://raw.githubusercontent.com/Little-Devs/web-templates/main/templates.json')
  .then(r => r.json());
const landingPages = catalog.templates.filter(t => t.category === 'landing-page');
const template = catalog.templates.find(t => t.id === 'flowforge');
```

## Repository Structure

```
web-templates/
├── README.md
├── templates.json
├── CONTRIBUTING.md
├── .gitmodules
└── templates/
    ├── flowforge/
    ├── glass-showcase/
    ├── atelier/
    └── ...
```

## Template Categories

- **Landing Pages**: SaaS, product launches, marketing sites
- **Portfolios**: Architecture studios, design agencies, creative showcases
- **Dashboards**: Admin panels, analytics, data visualization
- **E-commerce**: Product pages, shopping carts, checkouts
- **Blogs**: Article layouts, content platforms
- **Documentation**: API docs, guides, knowledge bases

## Template Features

All templates include:

- Production-ready code
- Responsive design
- Modern tech stack
- Comprehensive documentation
- Customization guides
- Template metadata (`template.json`)
- MIT License

## Contributing

We welcome new templates! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

All templates are released under the MIT License unless otherwise specified.

## Links

- [Little-Devs Organization](https://github.com/Little-Devs)
- [Template Catalog](./templates.json)
- [Contributing Guidelines](./CONTRIBUTING.md)

---

**Built by Little-Devs**

*Empowering AI agents and developers with production-ready templates*
