# Contributing to Little-Devs Web Templates

Thank you for your interest in contributing to our template collection! This guide will help you add new templates or improve existing ones.

## 🎯 Template Requirements

All templates must meet these standards before being accepted. For detailed guidelines, refer to our comprehensive rule documentation:

- **[Design Rules](docs/DESIGN_RULES.md)** - Design philosophy, typography, color, and aesthetics
- **[Build Rules](docs/BUILD_RULES.md)** - Technical standards, code quality, and performance
- **[Deployment Rules](docs/DEPLOYMENT_RULES.md)** - Host-agnostic deployment and portability

### Code Quality

- ✅ Production-ready, well-organized code
- ✅ Clear, descriptive variable and function names
- ✅ Inline comments for complex logic
- ✅ No console logs or debug code
- ✅ Proper error handling
- ✅ Security best practices
- ✅ TypeScript for all new templates
- ✅ Follow patterns in [Build Rules](docs/BUILD_RULES.md)

### Design & UX

- ✅ Distinctive, memorable design (avoid generic AI aesthetics)
- ✅ Unique typography (not Inter, Roboto, or Arial)
- ✅ Cohesive color palette (not purple gradients)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Accessible UI (WCAG AA compliance)
- ✅ Cross-browser compatibility
- ✅ Follow principles in [Design Rules](docs/DESIGN_RULES.md)

### Deployment & Portability

- ✅ Host-agnostic (works on Cloudflare, Vercel, Netlify, etc.)
- ✅ Relative paths only (no absolute URLs)
- ✅ Subdirectory deployment support
- ✅ Environment variables properly configured
- ✅ Deployment instructions for multiple platforms
- ✅ Follow guidelines in [Deployment Rules](docs/DEPLOYMENT_RULES.md)

### Performance

- ✅ Optimized images and assets
- ✅ Efficient CSS and JavaScript
- ✅ Fast page load times
- ✅ Lighthouse score 90+ (target 95+)
- ✅ No unnecessary dependencies
- ✅ Code splitting where appropriate

### Documentation

- ✅ Comprehensive README.md
- ✅ Setup and installation instructions
- ✅ Customization guide
- ✅ Project structure explanation
- ✅ Deployment instructions for multiple platforms
- ✅ Usage examples
- ✅ Complete template.json metadata file

## 📝 Adding a New Template

### Step 1: Create Your Template Repository

1. **Create a new repository** in the Little-Devs organization:
   - Name: `template-{name}` (e.g., `template-ecommerce`)
   - Description: Brief, clear description
   - Visibility: Public
   - License: MIT

2. **Develop your template**:
   - Use modern, popular tech stack
   - Follow best practices
   - Test thoroughly across devices and browsers

3. **Add required files**:
   - `README.md` - Comprehensive documentation
   - `template.json` - Template metadata (see format below)
   - `LICENSE` - MIT license
   - `.gitignore` - Appropriate ignore rules

### Step 2: Create Template Metadata

Add a `template.json` file in your template root:

```json
{
  "id": "your-template-id",
  "name": "Your Template Name",
  "version": "1.0.0",
  "description": "Brief description of your template",
  "category": "landing-page",
  "subcategory": "optional-subcategory",
  "techStack": {
    "framework": "Astro",
    "version": "5.x.x",
    "styling": "Tailwind CSS",
    "scripting": "TypeScript"
  },
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "aesthetic": {
    "style": "Modern Minimalist",
    "description": "Clean and simple design",
    "fonts": {
      "display": "Font Name",
      "sans": "Font Name"
    },
    "colors": {
      "primary": "#000000",
      "primaryName": "Black",
      "accent": "#ffffff",
      "accentName": "White"
    }
  },
  "sections": [
    "Header",
    "Hero",
    "Features"
  ],
  "useCases": [
    "Use case 1",
    "Use case 2"
  ],
  "customization": {
    "difficulty": "easy",
    "colorScheme": "CSS variables",
    "typography": "Configuration method",
    "layout": "Layout system"
  },
  "license": "MIT",
  "author": "Little-Devs",
  "createdAt": "2026-01-30",
  "lastUpdated": "2026-01-30",
  "tags": ["tag1", "tag2", "tag3"]
}
```

### Step 3: Add Template to Main Repository

1. **Fork this repository**

2. **Add your template as a submodule**:
   ```bash
   cd web-templates
   git submodule add https://github.com/Little-Devs/template-{name}.git templates/{name}
   ```

3. **Update the catalog** (`templates.json`):
   - Add your template entry to the `templates` array
   - Increment `totalTemplates` count
   - Update `lastUpdated` date
   - Add any new categories if needed

4. **Update README.md**:
   - Add your template to the table in the Template Collection section

5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add {template-name} template"
   ```

6. **Create a pull request**:
   - Clear title: "Add {Template Name} template"
   - Description including:
     - Template overview
     - Key features
     - Screenshots/preview links
     - Any special notes

## 📋 Template Checklist

Before submitting, verify your template has:

- [ ] Unique, descriptive name
- [ ] Complete `template.json` metadata
- [ ] Comprehensive README.md
- [ ] MIT License file
- [ ] Responsive design tested on multiple devices
- [ ] Cross-browser compatibility verified
- [ ] No broken links or missing assets
- [ ] Optimized performance
- [ ] Accessible UI (keyboard navigation, screen readers)
- [ ] Clean, commented code
- [ ] Working demo/preview

## 🎨 Naming Conventions

### Repository Names
- Format: `template-{name}`
- Use lowercase with hyphens
- Be descriptive but concise
- Examples: `template-flowforge`, `template-ecommerce-minimal`

### Template IDs
- Match repository name without prefix
- Lowercase with hyphens
- Examples: `flowforge`, `ecommerce-minimal`

### Categories
Use one of these primary categories:
- `landing-page` - Marketing and product landing pages
- `dashboard` - Admin panels and data dashboards
- `ecommerce` - Online stores and product pages
- `portfolio` - Personal and professional portfolios
- `blog` - Content and article layouts
- `documentation` - API docs and guides

## 🔍 Review Process

After submitting your PR:

1. **Automated Checks**: CI/CD runs basic validation
2. **Code Review**: Maintainers review code quality
3. **Design Review**: UI/UX evaluation
4. **Testing**: Functionality and compatibility tests
5. **Approval**: Once all checks pass, PR is merged

We aim to review PRs within 3-5 business days.

## 🐛 Reporting Issues

Found a bug or issue in a template?

1. **Check existing issues** in the template's repository
2. **Create a new issue** with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser/device information

## 💡 Suggesting Improvements

Have ideas for improving templates?

1. Open an issue describing your suggestion
2. Provide examples or mockups if possible
3. Explain the benefit to users
4. If approved, submit a PR with implementation

## 📚 Rule Documentation

Before creating a template, read our comprehensive guides:

### [Design Rules](docs/DESIGN_RULES.md)
- Design thinking process
- Avoiding generic AI aesthetics
- Typography excellence
- Color and theme guidance
- Motion and animation principles
- Spatial composition techniques
- Responsive design considerations

### [Build Rules](docs/BUILD_RULES.md)
- Tech stack standards
- TypeScript best practices
- Code quality requirements
- Performance optimization
- Accessibility standards
- Testing requirements
- Documentation guidelines

### [Deployment Rules](docs/DEPLOYMENT_RULES.md)
- Host-agnostic architecture
- Relative path requirements
- Environment variable patterns
- Base path configuration
- Platform-specific guides (Cloudflare, Vercel, Netlify, GitHub Pages)
- Security considerations

## 🎓 Resources

### Design Inspiration
- [Dribbble](https://dribbble.com/)
- [Behance](https://www.behance.net/)
- [Awwwards](https://www.awwwards.com/)

### Development Tools
- [Astro](https://astro.build/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://react.dev/)

### Accessibility
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project](https://www.a11yproject.com/)

### Performance
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)

## 📜 Code of Conduct

- Be respectful and professional
- Provide constructive feedback
- Welcome newcomers
- Focus on the template quality
- Assume good intentions

## 🆘 Getting Help

Need assistance?

- **Discord**: Join our development community
- **GitHub Discussions**: Ask questions
- **Email**: dev@little-devs.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Little-Devs Web Templates! Together, we're building tools that empower AI agents and developers worldwide.
