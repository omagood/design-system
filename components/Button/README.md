# Button

The primary action trigger. Wrap any user-initiated action — form submissions, confirmations, navigation — in a Button.

## When to use

- Triggering a form submit or API action
- Confirming a user decision (Save, Apply, Continue)
- Navigating within a flow (Next, Back, Finish)
- Offering secondary or tertiary actions alongside a primary CTA

## When NOT to use

- **Navigation to a different page** → use `<a>` or a `Link` component instead
- **Two `primary` buttons side by side** → only one primary action per view
- **`negative` for non-destructive actions** → reserve for delete, revoke, remove

## Usage

```tsx
import { Button } from '@your-username/design-system'

// Default
<Button onClick={handleSave}>Save changes</Button>

// With variant and size
<Button variant="secondary" size="sm" onClick={handleCancel}>
  Cancel
</Button>

// With icon
<Button variant="primary" leftIcon={<PlusIcon />}>
  Add item
</Button>

// Loading state
<Button isLoading onClick={handleSubmit}>
  Submitting…
</Button>

// Disabled
<Button disabled>Unavailable</Button>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'negative'` | `'primary'` | Visual style |
| `size` | `'lg' \| 'md' \| 'sm' \| 'xs'` | `'md'` | Size |
| `isLoading` | `boolean` | `false` | Show spinner and block interaction. Sets `aria-busy`. |
| `leftIcon` | `ReactNode` | — | Icon before the label. Hidden when `isLoading`. |
| `rightIcon` | `ReactNode` | — | Icon after the label. Hidden when `isLoading`. |
| `disabled` | `boolean` | `false` | Native disabled. Applies disabled styling. |
| `className` | `string` | — | Extra CSS classes (merged via `cn`). |
| `data-testid` | `string` | `'button'` | Test selector. |
| `ref` | `Ref<HTMLButtonElement>` | — | Forwarded to the `<button>` element. |

All other `React.ButtonHTMLAttributes` are passed through.

## Variants

| Variant | Background | Text | Use for |
|---|---|---|---|
| `primary` | `--action-primary` (#0D0D0D) | `--action-primary-inverse` (#F9F9FC) | Single most important action on a view |
| `secondary` | transparent | `--content-primary` | Secondary actions alongside a primary |
| `ghost` | transparent | `--content-primary` | Tertiary, low-emphasis actions |
| `negative` | `--action-distructive` (#DE1135) | white | Destructive, irreversible actions |

## Sizes

| Size | Font | Padding (px/py) | Gap |
|---|---|---|---|
| `lg` | Label L — 18px/24lh | 24px / 16px | 8px |
| `md` | Label M — 16px/24lh | 16px / 12px | 8px |
| `sm` | Label S — 14px/20lh | 12px / 8px | 4px |
| `xs` | Label XS — 12px/16lh | 8px / 4px | 4px |

## Accessibility

- Renders a native `<button>` element — correct role, keyboard, and AT support out of the box
- Focus ring uses `--state-focus-ring` (#068BEE) with 2px width — WCAG 2.4.11 compliant
- `isLoading` sets `aria-busy="true"` and `disabled` on the underlying button
- Icons are wrapped in `aria-hidden="true"` spans — they are decorative
- Spinner SVG is `aria-hidden="true"` — the button label provides the accessible name
- Keyboard: Tab to focus, Enter or Space to activate

## Token usage

| Token | CSS Variable | Role |
|---|---|---|
| Action primary | `--action-primary` | Primary variant background |
| Action primary inverse | `--action-primary-inverse` | Primary variant text |
| Action destructive | `--action-distructive` | Negative variant background (typo in Figma — preserved) |
| Action disabled | `--action-disabled` | Disabled background |
| Content primary | `--content-primary` | Secondary/ghost text |
| Content disabled | `--content-disabled` | Disabled text |
| Border outline | `--border-outline` | Secondary variant border |
| State hover secondary | `--state-hovered-secondary` | Secondary/ghost hover background |
| State press secondary | `--state-pressed-secondary` | Secondary/ghost active background |
| State focus ring | `--state-focus-ring` | Focus ring colour |
| State focus offset | `--state-focus-offset` | Focus ring offset colour |
| Corner medium | `--corner-radius-corner-medium` | Border radius (8px) |
| Typography size label * | `--typography-size-label-{size}` | Font size per size variant |
| Typography line height label * | `--typography-line-height-label-{size}` | Line height per size variant |
| Inset component * | `--inset-component-inset-component-{size}-{x\|y}` | Padding per size variant |

## Known token gaps (flagged to Design System Lead)

1. **No `inset-component-xs-*` token** — XS size uses `--spacing-space-8px` / `--spacing-space-4px` from primitives
2. **`--typography-weight-label: 600px`** — Style Dictionary adds `px` to number tokens, making it invalid for `font-weight`. Using Tailwind's `font-semibold` (600) as workaround
3. **Hover overlay on primary/negative** — Figma uses `--state-hovered-primary` (rgba white overlay). Implemented via `opacity-90` which approximates the effect. Replace with `color-mix()` once browser baseline is confirmed
