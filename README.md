# Little-Devs Web Templates

A curated collection of production-ready website templates for AI agents and developers. Each template is a separate git repository, accessible as submodules for easy maintenance and versioning.

## 📚 Template Collection

### Available Templates

| Template | Category | Tech Stack | Description |
|----------|----------|------------|-------------|
| [FlowForge](https://github.com/Little-Devs/template-flowforge) | Landing Page | Astro, CSS, JS | Technical luxury automation platform landing page |
| [Glass Showcase](https://github.com/Little-Devs/template-glass-showcase) | Landing Page | Astro, CSS, JS | Horizontal-scrolling glassmorphism showcase with 18 sections |

Browse the complete catalog in [`templates.json`](./templates.json).

## 🚀 Quick Start

### For Developers

Clone the entire collection with all templates:

```bash
# Clone with all submodules
git clone --recursive https://github.com/Little-Devs/web-templates.git
cd web-templates
```

Or clone the main repo and initialize submodules later:

```bash
# Clone main repository
git clone https://github.com/Little-Devs/web-templates.git
cd web-templates

# Initialize and update all submodules
git submodule update --init --recursive
```

### Using a Specific Template

Navigate to a template and start building:

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
// Read the catalog
const catalog = await fetch('https://raw.githubusercontent.com/Little-Devs/web-templates/main/templates.json')
  .then(r => r.json());

// Find templates by category
const landingPages = catalog.templates.filter(t => t.category === 'landing-page');

// Clone a specific template
const template = catalog.templates.find(t => t.id === 'flowforge');
// Use template.repository to clone or template.submodulePath to access
```

## 📁 Repository Structure

```
web-templates/
├── README.md              # This file
├── templates.json         # Catalog of all templates with metadata
├── CONTRIBUTING.md        # Guidelines for adding templates
├── .gitmodules           # Git submodules configuration
└── templates/            # Template submodules
    ├── flowforge/        # Git submodule → template-flowforge
    └── ...               # More templates as submodules
```

## 🎯 Template Categories

- **Landing Pages**: SaaS, product launches, marketing sites
- **Dashboards**: Admin panels, analytics, data visualization
- **E-commerce**: Product pages, shopping carts, checkouts
- **Portfolios**: Personal sites, case studies, showcases
- **Blogs**: Article layouts, content platforms
- **Documentation**: API docs, guides, knowledge bases

## ✨ Template Features

All templates include:

- ✅ Production-ready code
- ✅ Responsive design
- ✅ Modern tech stack
- ✅ Comprehensive documentation
- ✅ Customization guides
- ✅ Template metadata (`template.json`)
- ✅ MIT License

## 🔄 Keeping Templates Updated

Update all templates to their latest versions:

```bash
# Update all submodules
git submodule update --remote --merge

# Commit the updates
git add .
git commit -m "Update templates to latest versions"
git push
```

Update a specific template:

```bash
cd templates/flowforge
git pull origin main
cd ../..
git add templates/flowforge
git commit -m "Update FlowForge template"
git push
```

## 🤝 Contributing

We welcome new templates! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Adding a New Template

1. **Create your template repository** (e.g., `template-mytemplate`)
   - Include comprehensive README
   - Add `template.json` metadata file
   - Ensure production-ready code
   - Add MIT license

2. **Add as submodule**:
   ```bash
   git submodule add https://github.com/Little-Devs/template-mytemplate.git templates/mytemplate
   ```

3. **Update the catalog**:
   - Add entry to `templates.json`
   - Include all required metadata fields

4. **Submit pull request** with your changes

## 🎨 Template Standards

Templates must meet these standards:

- **Code Quality**: Clean, documented, production-ready
- **Responsive**: Mobile-first design approach
- **Performance**: Optimized assets and code
- **Accessibility**: WCAG AA compliance
- **Documentation**: Comprehensive README and inline comments
- **Metadata**: Complete `template.json` file
- **License**: MIT or compatible

## 📊 Template Metadata

Each template includes a `template.json` file with:

```json
{
  "id": "template-id",
  "name": "Template Name",
  "description": "Brief description",
  "category": "landing-page",
  "techStack": {...},
  "features": [...],
  "aesthetic": {...},
  "useCases": [...],
  "customization": {...}
}
```

See any template's `template.json` for a complete example.

## 🛠 Tech Stack

Templates use modern, popular technologies:

- **Frameworks**: Astro, Next.js, React, Vue, Svelte
- **Styling**: Tailwind CSS, CSS Modules, Styled Components
- **Animation**: Framer Motion, GSAP, CSS animations
- **Build Tools**: Vite, Webpack, Turbopack

## 📝 License

All templates are released under the MIT License unless otherwise specified. You're free to use them for personal or commercial projects.

## 🆘 Support

- **Issues**: Open an issue in the specific template's repository
- **General Questions**: Open an issue in this main repository
- **Contributions**: See [CONTRIBUTING.md](./CONTRIBUTING.md)

## 🌟 Showcase

Using one of our templates? We'd love to see it! Tag [@Little-Devs](https://github.com/Little-Devs) or open a PR to add your site to our showcase.

## 🔗 Links

- [Little-Devs Organization](https://github.com/Little-Devs)
- [Template Catalog](./templates.json)
- [Contributing Guidelines](./CONTRIBUTING.md)

---

**Built with ⚡ by Little-Devs**

*Empowering AI agents and developers with production-ready templates*
