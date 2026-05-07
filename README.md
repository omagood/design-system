# Ambient DS

A token-driven React component library. Every visual value — color, spacing, typography, radius, shadow — is a CSS custom property sourced from Figma. To customize the design system, edit tokens in Figma and run one command. No component code changes needed.

## Stack

- React 18 + TypeScript 5
- Tailwind CSS v4
- Vite 5 + Storybook 10
- Font: Plus Jakarta Sans (variable, 200–800)

## Quick Start

```bash
git clone https://github.com/YOUR_ORG/ambient-ds
cd ambient-ds
npm install
npm run storybook
```

## Components

| Component | Variants | Description |
|---|---|---|
| `Button` | primary, secondary, ghost, negative · lg/md/sm/xs | Standard action button |
| `FloatingButton` | lg/md · iconOnly | Floating action button (FAB) with elevation |
| `TextField` | default, error, disabled | Input with floating label and helper text |

```tsx
import { Button } from '@/components/ui/button'
import { FloatingButton } from '@/components/ui/floating-button'
import { TextField } from '@/components/ui/text-field'

<Button variant="primary" size="md">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="negative" isLoading>Deleting…</Button>

<FloatingButton>New item</FloatingButton>
<FloatingButton iconOnly size="md" />

<TextField label="Email" helperText="We'll never share it" />
<TextField label="Password" error helperText="Too short" />
```

## Token Pipeline

Tokens live in Figma. The build script converts them to CSS custom properties.

```
tokens/figma/          ← Figma export (source of truth, never edit manually)
  colors/light.json
  colors/dark.json
  typography/desktop.json
  spacing/desktop.json
  …

src/tokens.generated.css  ← auto-generated, do not edit
```

After updating tokens in Figma and re-exporting JSON:

```bash
npm run tokens:build
```

## Dark Mode

Add `data-theme="dark"` or class `dark` to any ancestor. All tokens switch automatically.

```tsx
<div data-theme="dark">
  <Button variant="primary">Looks right in dark mode</Button>
</div>
```

## Using in Another Project

```bash
npm install github:YOUR_ORG/ambient-ds
```

```tsx
import 'ambient-ds/tokens/css'
import { Button } from 'ambient-ds'

<Button variant="primary">Hello</Button>
```

## For AI Builders

Read `llms.txt` — it contains the full token reference, component APIs, rules, and a new-component template. The short version:

- Use `var(--token-name)` for every visual value
- Never hardcode colors, spacing, sizes, or radii
- Use `[font-weight:var(--typography-weight-label)]` not `font-semibold`
- If a token is missing, report it — never invent a value
