# Token Reference

This file is the single source of truth for token usage.
Every agent reads this before using any CSS variable in code.

Token naming: `--[group]-[subgroup?]-[role]`
Values shown are from the **light theme**. Dark theme overrides automatically via `[data-theme="dark"]`.

---

## Color Tokens — Semantic

### Background
Use for page-level and container backgrounds.

| Token | Value (light) | When to use |
|---|---|---|
| `--background-screen` | #F3F5F9 | Page background, outermost container |
| `--background-elevated` | #FFFFFF | Cards, popovers, modals floating above screen |
| `--background-overlay` | rgba(0,0,0,0.30) | Modal backdrop, drawer overlay |

### Surface
Use for component and container fill colors.

| Token | Value (light) | When to use |
|---|---|---|
| `--surface-primary` | #FFFFFF | Primary card/panel background |
| `--surface-secondary` | #F9F9FC | Secondary panels, sidebars, alternate rows |
| `--surface-tertiary` | #F3F5F9 | Tertiary surfaces, code blocks |
| `--surface-accent` | #EFF4FE | Accent-colored surfaces (informational banners) |
| `--surface-disabled` | #EAEDF3 | Disabled input/component background |

### Action
Use for interactive elements: buttons, links, triggers.

| Token | Value (light) | When to use |
|---|---|---|
| `--action-primary` | #0D0D0D | Primary button background |
| `--action-primary-inverse` | #F9F9FC | Text on primary button |
| `--action-secondary` | #636B7F | Secondary action text color |
| `--action-disabled` | #D4D9E2 | Disabled button/control background |
| `--action-distructive` | #DE1135 | Destructive/negative button background ⚠️ typo in Figma |
| `--action-accent` | #266EF1 | Accent action (links, accent buttons) |

### Content
Use for text and icon colors.

| Token | Value (light) | When to use |
|---|---|---|
| `--content-primary` | #141519 | Primary text — headings, body, labels |
| `--content-secondary` | #636B7F | Secondary text — captions, metadata, helper text |
| `--content-disabled` | #A1A9BA | Disabled text |
| `--content-primary-inverse` | #F9F9FC | Text on dark/colored backgrounds |
| `--content-accent` | #1153C0 | Accent text, active link text |

### Border
Use for outlines, dividers, and strokes.

| Token | Value (light) | When to use |
|---|---|---|
| `--border-divider` | #D4D9E2 | Horizontal rules, list separators, subtle borders |
| `--border-outline` | #A1A9BA | Input borders, card outlines |
| `--border-action` | #1153C0 | Focused input border, active tab underline |

### State
Use for interactive state overlays and indicators.

| Token | Value (light) | When to use |
|---|---|---|
| `--state-hovered-primary` | rgba(255,255,255,0.20) | Hover overlay on dark/filled elements |
| `--state-hovered-secondary` | #F9F9FC | Hover background on light/empty elements |
| `--state-selected` | #F3F5F9 | Selected row, active nav item background |
| `--state-pressed-primary` | rgba(255,255,255,0.32) | Press overlay on dark/filled elements |
| `--state-pressed-secondary` | #F3F5F9 | Press background on light/empty elements |
| `--state-focus-ring` | #068BEE | Focus ring — use on ALL focusable elements, always |
| `--state-focus-offset` | #FFFFFF | Focus ring offset color (gap between element and ring) |

### Sentiment
Use for status indicators, alerts, and feedback messages.

| Group | Tokens | When to use |
|---|---|---|
| Positive (success) | `--sentiment-positive-background-strong` #009A51 | Success badge background |
| | `--sentiment-positive-background-light` #D3EFDA | Success alert background |
| | `--sentiment-positive-foreground` #166C3B | Success text |
| | `--sentiment-positive-border` #009A51 | Success border |
| Warning | `--sentiment-warning-background-strong` #FC823A | Warning badge |
| | `--sentiment-warning-background-light` #FEE2D4 | Warning alert background |
| | `--sentiment-warning-foreground` #C54600 | Warning text |
| | `--sentiment-warning-border` #FC823A | Warning border |
| Negative (error) | `--sentiment-negative-background-strong` #F83446 | Error badge |
| | `--sentiment-negative-background-light` #FFE1DE | Error alert background |
| | `--sentiment-negative-foreground` #DE1135 | Error text |
| | `--sentiment-negative-border` #F83446 | Error border |
| Neutral | `--sentiment-neutral-background-strong` #636B7F | Neutral badge |
| | `--sentiment-neutral-background-light` #EAEDF3 | Neutral alert background |
| | `--sentiment-neutral-foreground` #464D60 | Neutral text |
| | `--sentiment-neutral-border` #A1A9BA | Neutral border |

### Expression (categorical colors)
Use for data visualisation, tags, and labels that need color variety.
Never use for semantic meaning (use Sentiment tokens for that).

| Color | Tokens |
|---|---|
| Blue | `--exrpession-blue-blue-background-strong/light/foreground` |
| Magenta | `--exrpession-magenta-magenta-background-strong/light/foreground` |
| Teal | `--exrpession-teal-teal-background-strong/light/foreground` |
| Purple | `--exrpession-purple-purple-background-strong/light/foreground` |
| Lime | `--exrpession-lime-lime-background-strong/light/foreground` |

⚠️ Note: "exrpession" is a typo in the current Figma export. Do not correct in code — wait for Figma fix and token rebuild.

### Shadow
Use as color values within `box-shadow` CSS.

| Token | Value | When to use |
|---|---|---|
| `--shadow-shadow-soft` | rgba(0,0,0,0.08) | Subtle card shadow |
| `--shadow-shadow-medium` | rgba(0,0,0,0.12) | Popover, dropdown shadow |
| `--shadow-shadow-strong` | rgba(0,0,0,0.16) | Modal, tooltip shadow |

### Brand
Use sparingly — for brand-moment UI only, not general UI chrome.

| Token | Value | When to use |
|---|---|---|
| `--brand-brand-primary` | #AACB42 | Primary brand accent (logo area, brand highlights) |
| `--brand-brand-secondary` | #7A7A7C | Secondary brand color |

---

## Spacing Tokens (from Primitives)

All spacing values in px. Use for padding, margin, gap.

| Token | Value | Common usage |
|---|---|---|
| `--spacing-space-2px` | 2px | Micro adjustments, icon nudges |
| `--spacing-space-4px` | 4px | Tight internal padding, icon gaps |
| `--spacing-space-8px` | 8px | Component internal padding (sm) |
| `--spacing-space-12px` | 12px | Component internal padding (md) |
| `--spacing-space-16px` | 16px | Component padding, section gaps |
| `--spacing-space-20px` | 20px | Card padding |
| `--spacing-space-24px` | 24px | Section padding, larger gaps |
| `--spacing-space-28px` | 28px | — |
| `--spacing-space-32px` | 32px | Page section padding |
| `--spacing-space-40px` | 40px | Large section gaps |
| `--spacing-space-48px` | 48px | Major section separation |
| `--spacing-space-64px` | 64px | Page-level spacing |
| `--spacing-space-80px` | ⚠️ bug: currently 0px | Large page sections |

---

## Shadow Compositions

Use these `box-shadow` values directly in components (combine color tokens with blur/spread):

```css
/* Soft — cards, panels */
box-shadow: 0 1px 3px var(--shadow-shadow-soft), 0 1px 2px var(--shadow-shadow-soft);

/* Medium — dropdowns, popovers */
box-shadow: 0 4px 6px var(--shadow-shadow-medium), 0 2px 4px var(--shadow-shadow-soft);

/* Strong — modals, dialogs */
box-shadow: 0 10px 25px var(--shadow-shadow-strong), 0 4px 6px var(--shadow-shadow-medium);
```

---

## Token Decision Guide

**"What token do I use for...?"**

| Use case | Token |
|---|---|
| Page background | `--background-screen` |
| Card/panel background | `--surface-primary` or `--background-elevated` |
| Primary button bg | `--action-primary` |
| Primary button text | `--action-primary-inverse` |
| Input border (default) | `--border-outline` |
| Input border (focused) | `--border-action` |
| Input border (error) | `--sentiment-negative-border` |
| Any heading or body text | `--content-primary` |
| Placeholder / hint text | `--content-secondary` |
| Error message text | `--sentiment-negative-foreground` |
| Success message text | `--sentiment-positive-foreground` |
| Divider line | `--border-divider` |
| Focus ring (always) | `--state-focus-ring` |
| Hover bg on white element | `--state-hovered-secondary` |
| Hover overlay on dark element | `--state-hovered-primary` |
| Disabled text | `--content-disabled` |
| Disabled bg | `--surface-disabled` or `--action-disabled` |

---

## What Does NOT Have a Token Yet

These values appear in Figma components but lack explicit tokens.
Use the closest semantic token and flag the gap to Design System Lead:

- Border radius values (shapes) — check `tokens/figma/Shapes/` after building
- Typography sizes — check `tokens/figma/Typography/` after building
- Motion duration and easing — not yet in Figma export
- Z-index scale — not in Figma, define in CLAUDE.md as code constants
