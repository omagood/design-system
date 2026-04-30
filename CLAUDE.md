# Design System — Master Instructions

## What This Is
A professional, token-driven design system built from a Figma source of truth.
Visual language: clean, minimal, high-contrast. Black/white base with semantic color roles.
Reference aesthetic: shadcn/ui — but with a richer typography scale and more expressive component set.

This system is a **neutral base** — designed to be forked and customized per project.
Every design decision lives in tokens so changing the look means changing tokens, not components.

---

## Repository
GitHub: https://github.com/omagood/design-system.git
Package: @your-username/design-system

Install in any project:
```bash
npm install github:omagood/design-system
```

---

## Tech Stack
| Tool | Version | Role |
|---|---|---|
| React | 18 | Component framework |
| TypeScript | 5.x | Type safety, self-documenting APIs |
| Tailwind CSS | 4.x | Utility classes driven by CSS variables |
| Style Dictionary | 4.x | Figma JSON → CSS vars → TS constants |
| Storybook | 8.x | Visual documentation |
| Vitest | 2.x | Unit testing |
| Vite | 5.x | Build tool |

---

## Agent Team

| Agent | File | Activated by |
|---|---|---|
| **Design System Lead** | `agents/design-system-lead.md` | `"Act as Design System Lead"` |
| **Token Engineer** | `agents/token-engineer.md` | `"Act as Token Engineer"` |
| **Component Architect** | `agents/component-architect.md` | `"Act as Component Architect"` |
| **Prototype Builder** | `agents/prototype-builder.md` | `"Act as Prototype Builder"` |

**Every agent reads in this order:**
1. CLAUDE.md (this file)
2. Their role file
3. `agents/token-reference.md` — the token dictionary

---

## Project Structure

```
design-system/
├── CLAUDE.md
├── agents/
│   ├── design-system-lead.md
│   ├── token-engineer.md
│   ├── component-architect.md
│   ├── prototype-builder.md
│   └── token-reference.md
├── tokens/
│   ├── figma/                    ← Source of truth. Never edit manually.
│   │   ├── Primitives/
│   │   ├── Colors/
│   │   ├── Typography/
│   │   ├── Spacing/
│   │   ├── Grid/
│   │   ├── Shadows/
│   │   └── Shapes/
│   ├── transformed/              ← Auto-generated. Not committed to git.
│   │   ├── css/variables.css
│   │   ├── css/variables-dark.css
│   │   └── ts/tokens.ts
│   ├── style-dictionary.config.js
│   └── scripts/update-tokens.sh
├── components/
│   └── [Name]/
│       ├── index.tsx
│       ├── [Name].stories.tsx
│       ├── [Name].test.tsx
│       └── README.md
├── src/
│   ├── index.ts
│   ├── global.css
│   └── lib/utils.ts
├── prototypes/
└── docs/
```

---

## Visual Language (from Figma)

### Color Philosophy
- Base is near-black (#0D0D0D) on white — high contrast, no gray washes
- Semantic token roles drive all color decisions in components
- Error / Destructive: red (#DE1135 text, #F83446 background)
- Focus ring: blue (#068BEE) — always visible, never suppressed
- Brand accent: green (#AACB42) — for brand moments only, not UI chrome

### Typography Scale
Format: font-size/line-height (px). All headings and display are bold.

| Role | Size/LH | Usage |
|---|---|---|
| Display L | 96/112 | Hero headlines, landing pages |
| Display M | 56/64 | Section heroes |
| Display S | 48/52 | Large feature titles |
| Heading XXL | 40/52 | Page titles |
| Heading XL | 36/44 | Major section headers |
| Heading L | 32/40 | Section headers |
| Heading M | 28/36 | Card titles, modal headers |
| Heading S | 24/32 | Sub-section headers |
| Heading XS | 20/28 | Small section headers, sidebar titles |
| Label L | 18/24 | Large button text, prominent labels |
| Label M | 16/20 | Default button text, form labels |
| Label S | 14/16 | Small button text, tags, badges |
| Label XS | 12/16 | Micro labels, status indicators |
| Paragraph L | 18/24 | Large body text, introductory copy |
| Paragraph M | 16/20 | Default body text |
| Paragraph S | 14/16 | Secondary body, helper text |
| Paragraph XS | 12/16 | Fine print, metadata |
| Link L/M/S/XS | same as Paragraph | Inline links, always underlined |
| Caption | 10/16 | Timestamps, image captions |

### Component Inventory (Figma source)
**Tier 1 — Build first**
- Button: primary / secondary / ghost / negative × L / M / S / XS
- Floating Button: label-on / label-off × L / M
- Text Field: L / M × all states × normal / error
- Checkbox: 3 check states × 4 interaction states
- Radio: 2 selection states × 4 interaction states
- Dropdown Item: single-select / multi-select × states
- Dropdown List: single / multi / radio
- Date Picker: single / range

**Tier 2 — Build after Tier 1**
Select, Modal, Toast, Tooltip, Tabs, Accordion

**Tier 3 — Patterns**
Form, Navigation, Table, Empty state, Skeleton

---

## Rules All Agents Follow

**Tokens**
- Never hardcode colors, spacing, radii, shadows, or font values
- Use CSS variables: `var(--content-primary)`, `var(--surface-primary)`
- Token names and usage rules are in `agents/token-reference.md`
- Missing token = report it, never invent a value

**Components**
- Fully typed TypeScript — zero `any`
- Accessible: correct ARIA, keyboard nav, visible focus ring using `var(--state-focus-ring)`
- Props: always include `className`, `data-testid`, `ref` forwarding
- Light + dark mode via CSS variables — never hardcode for one mode
- Every component ships with: Storybook story + unit tests + README

**Git**
- Conventional commits: `feat(Button)`, `fix(Input)`, `chore(tokens)`, `docs(README)`
- Run `tsc --noEmit` and tests before every commit
- Never commit `tokens/transformed/` or `node_modules/`
