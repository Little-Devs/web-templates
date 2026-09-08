# PROMPT.md

Copy this file to the **root** of a Little-Devs `template-*` repository. It is a **provider-, framework-, and harness-agnostic** reproduction prompt. Fill the placeholders, then paste the Prompt block into any agent.

Read `AGENTS.md` first. Security and reliability are paramount.

---

## Prompt

Customize the `[TEMPLATE_NAME]` (`[TEMPLATE_ID]`) website template for the following brief.

### Brief

- **Business / project:** `[who this site is for]`
- **Primary goal:** `[one sentence — e.g. book a quote, explain the service]`
- **Audience:** `[who lands here]`
- **Must keep:** existing stack, tokens, and section structure
- **Must change:** `[logo, colours, fonts, copy, contact — list only what applies]`
- **Must not:** new backend, new analytics, new framework, secrets in the repo

### Constraints

- Follow `AGENTS.md`. Do not invent services or credentials.
- Edit design tokens (CSS variables / theme) instead of one-off hex in components.
- Keep the current `[FRAMEWORK]` + `[STYLING]` stack and folder layout.
- Forms stay static (`mailto:` or existing handler only).
- No new third-party scripts, pixels, or font hosts.
- Responsive: mobile, tablet, desktop. Preserve focus styles and reduced-motion.
- Small, reviewable diff. Match local style.

### Acceptance checks

- [ ] `README.md`, `template.json`, `AGENTS.md`, and this file were read before edits
- [ ] Tokens updated in one place; UI consumes those tokens
- [ ] Requested copy/logo/contact replaced; leftover demo names are gone
- [ ] No new backend, auth, payment, or tracking
- [ ] No secrets or `.env` committed
- [ ] `npm run build` (or this repo’s equivalent) succeeds
- [ ] Home (and any touched routes) render; empty/error states still make sense
- [ ] Keyboard and screen-reader basics still work (labels, contrast, focus)

### Deliver

Summarize files changed and any placeholder that could not be filled from the brief. Do not deploy.
