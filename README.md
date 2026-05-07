# Design System

A token-driven React component library built from a Figma source of truth. Follows [shadcn/ui](https://ui.shadcn.com) conventions — components live in `src/components/ui/`, all visual values come from CSS custom properties, and the token pipeline runs Figma JSON through Style Dictionary to produce the variables your components consume.

---

## Install in a new project

```bash
npm install github:omagood/design-system
```

## Use components

```tsx
// 1. Import token CSS — required, or components render unstyled
import '@your-username/design-system/tokens/css'

// 2. Import and use components
import { Button } from '@your-username/design-system'

export default function App() {
  return (
    <div>
      <Button variant="primary" size="md">Save changes</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="negative">Delete account</Button>
    </div>
  )
}
```

### Button variants & props

| Prop | Values | Default |
|---|---|---|
| `variant` | `primary` `secondary` `ghost` `negative` | `primary` |
| `size` | `lg` `md` `sm` `xs` | `md` |
| `isLoading` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `leftIcon` | `ReactNode` | — |
| `rightIcon` | `ReactNode` | — |

All native `<button>` attributes are forwarded. The component supports `ref`.

---

## Update tokens from Figma

```bash
# 1. Export from Figma: Tokens Studio → Export → W3C JSON
# 2. Replace token files
cp ~/Downloads/your-export.json tokens/figma/

# 3. Rebuild CSS variables
npm run tokens:build

# Output: tokens/transformed/css/variables.css (light)
#         tokens/transformed/css/variables-dark.css (dark)
#         tokens/transformed/ts/tokens.ts
```

---

## Run locally

```bash
npm install
npm run storybook      # Component browser → http://localhost:6006
npm run dev            # Vite dev server
npm run typecheck      # TypeScript check (tsc --noEmit)
npm run tokens:build   # Rebuild tokens from Figma JSON
```

---

## Project structure

```
src/
  components/ui/   ← Components (shadcn-style lowercase filenames)
  stories/         ← Storybook stories
  lib/utils.ts     ← cn() helper
  global.css       ← Tailwind + token imports

tokens/
  figma/           ← Figma source (never edit manually)
  transformed/     ← Auto-generated (not committed)
    css/variables.css
    css/variables-dark.css
    ts/tokens.ts
```
