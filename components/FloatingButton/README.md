# FloatingButton

A floating action button (FAB) — the single most prominent action on a surface. Always filled, always elevated. Comes in two sizes and two modes: with a label or icon-only.

## When to use

- The primary, always-visible action on a view (create, compose, add)
- Floating over content where a regular Button would be buried
- Persistent actions that should stay accessible while the user scrolls

## When NOT to use

- **Multiple FABs on one screen** → only one FloatingButton per view
- **Secondary or tertiary actions** → use `Button` with `variant="secondary"` or `"ghost"`
- **Destructive actions** → use `Button` with `variant="negative"`
- **Inline form actions** → use `Button`

## Usage

```tsx
import { FloatingButton } from '@your-username/design-system'

// Large with label (default)
<FloatingButton onClick={handleCreate}>New item</FloatingButton>

// Medium with label
<FloatingButton size="md" onClick={handleCreate}>New item</FloatingButton>

// Large icon-only — must provide aria-label
<FloatingButton iconOnly aria-label="Add new item" onClick={handleCreate} />

// Medium icon-only
<FloatingButton size="md" iconOnly aria-label="Add new item" onClick={handleCreate} />

// Custom icon
<FloatingButton icon={<PencilIcon />}>Edit</FloatingButton>

// Loading state
<FloatingButton isLoading onClick={handleSubmit}>Creating…</FloatingButton>

// Disabled
<FloatingButton disabled>New item</FloatingButton>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'lg' \| 'md'` | `'lg'` | Button size |
| `iconOnly` | `boolean` | `false` | Show icon only — renders as a circle |
| `icon` | `ReactNode` | `<PlusIcon />` | Icon rendered inside the button |
| `isLoading` | `boolean` | `false` | Show spinner and block interaction. Sets `aria-busy`. |
| `disabled` | `boolean` | `false` | Native disabled. Applies disabled styling. |
| `className` | `string` | — | Extra CSS classes (merged via `cn`). |
| `data-testid` | `string` | `'floating-button'` | Test selector. |
| `ref` | `Ref<HTMLButtonElement>` | — | Forwarded to the `<button>` element. |

All other `React.ButtonHTMLAttributes` are passed through.

> **Icon-only accessibility**: When `iconOnly` is `true`, provide an `aria-label` prop so screen readers have an accessible name. Omitting it will cause a11y violations.

## Sizes

| Size | Mode | Font | Padding | Icon |
|---|---|---|---|---|
| `lg` | With label | Label M — 16px/24lh | px=24px / py=16px | 24×24 |
| `lg` | Icon only | — | p=16px (uniform) | 24×24 |
| `md` | With label | Label M — 16px/24lh | px=16px / py=12px | 20×20 |
| `md` | Icon only | — | p=12px (uniform) | 20×20 |

## States

| State | Background | Shadow |
|---|---|---|
| Default | `--action-primary` | elevation-small |
| Hover | `--action-primary` + opacity-90 | elevation-medium |
| Pressed | `--action-primary` + opacity-80 | elevation-medium |
| Disabled | `--action-disabled` | elevation-small |
| Loading | `--action-disabled` | elevation-small |

## Accessibility

- Renders a native `<button>` element — correct role, keyboard, and AT support out of the box
- Focus ring uses `--state-focus-ring` (#068BEE) with 2px width — WCAG 2.4.11 compliant
- `isLoading` sets `aria-busy="true"` and `disabled` on the underlying button
- Icon is wrapped in `aria-hidden="true"` — it is decorative
- Spinner SVG is `aria-hidden="true"` — the button label (or `aria-label`) provides the accessible name
- **Icon-only requires `aria-label`** — no visible text means the accessible name must be explicit
- Keyboard: Tab to focus, Enter or Space to activate

## Token usage

| Token | CSS Variable | Role |
|---|---|---|
| Action primary | `--action-primary` | Background |
| Action primary inverse | `--action-primary-inverse` | Text and icon colour |
| Action disabled | `--action-disabled` | Disabled background |
| Content disabled | `--content-disabled` | Disabled text/icon |
| Shadow soft | `--shadow-shadow-soft` | Shadow colour (soft layer) |
| Shadow strong | `--shadow-shadow-strong` | Shadow colour (strong layer) |
| Shadow small blur 1/2 | `--shadow-small-shadow-small-blur-{1\|2}` | elevation-small blur values |
| Shadow small y 1/2 | `--shadow-small-shadow-small-y-{1\|2}` | elevation-small Y offsets |
| Shadow medium blur 1/2 | `--shadow-medium-shadow-medium-blur-{1\|2}` | elevation-medium blur values |
| Shadow medium y 1/2 | `--shadow-medium-shadow-medium-y-1`, `--shadow-medium-shadow-y-l2-2` | elevation-medium Y offsets |
| Corner full | `--corner-radius-corner-full` | Border radius (999px — full pill) |
| Inset component lg x/y | `--inset-component-inset-component-lg-{x\|y}` | Large padding |
| Inset component md x/y | `--inset-component-inset-component-md-{x\|y}` | Medium padding |
| State focus ring | `--state-focus-ring` | Focus ring colour |
| State focus offset | `--state-focus-offset` | Focus ring offset colour |
| Typography size label medium | `--typography-size-label-medium` | Font size |
| Typography line height label medium | `--typography-line-height-label-medium` | Line height |

## Known token gaps (flagged to Design System Lead)

1. **`--typography-weight-label: 600px`** — Style Dictionary adds `px` to number tokens, making it invalid for `font-weight`. Using Tailwind's `font-semibold` (600) as workaround
2. **Hover overlay on primary** — Figma uses `--state-hovered-primary` (rgba white overlay). Implemented via `opacity-90` which approximates the effect. Replace with `color-mix()` once browser baseline is confirmed
