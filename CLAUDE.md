## Core Goal
Ambient DS is a token-driven design system with a single purpose:
visual customization happens exclusively by editing Figma tokens — no component code changes needed.
The end state is a system any AI builder can use by reading llms.txt and prompting
"use Ambient DS to build an app" with a GitHub link. Every decision must serve this goal:
tokens over hardcoded values, clean APIs, consistent patterns, zero ambiguity.

## Project
Name: Ambient DS
Stack: React, TypeScript, Tailwind CSS v4, Vite, Storybook.
Components: src/components/ui/
Tokens source: tokens/figma/
Tokens output: src/tokens.generated.css + src/tokens.metadata.json
Build tokens: npm run tokens:build  ← run this first in any new worktree (tokens.generated.css is gitignored)
Full AI reference: llms.txt
Icons: @hugeicons/core-free-icons — import icon data and pass to <Icon icon={...} />

## Rules — Always Follow
- ALWAYS use CSS variables from src/tokens.generated.css for ALL values
- NEVER hardcode colors, spacing, font-sizes, radii, shadows, opacity, duration
- NEVER use plain Tailwind numbers like px-4, text-sm, font-semibold, rounded-md
- ALWAYS use token-based syntax: px-[var(--spacing-space-16px)]
- If a token is missing — report it, never invent a value
- Every new component must follow the CVA pattern in llms.txt
- Every new component must have a Storybook story
- ALWAYS use icons from @hugeicons/core-free-icons via the <Icon> wrapper — never use inline SVGs or other icon libraries
- Every component with a user-configurable icon prop MUST expose it in Storybook Controls:
  • Hide the raw ReactNode prop: `icon: { control: false, table: { disable: true } }`
  • Add a string-name arg: `iconName?: string` with `{ ...iconArgType }` from story-utils.tsx
  • Convert in render: `icon={resolveIcon(iconName)}` — never pass ReactNode through Controls directly

## Decisions
- 2026-05-07: font-weight uses [font-weight:var(--typography-weight-label)], not Tailwind font-semibold
- 2026-05-07: font-family uses [font-family:var(--typography-font-family)], not hardcoded string
- 2026-05-07: font-[var(...)] is ambiguous in Tailwind v4 (may resolve as font-family) — always use explicit [font-weight:var(...)] syntax
- 2026-05-07: inset box-shadow used for borders that must not affect layout (e.g. TextField 1px→2px transition)
- 2026-05-07: all button sizes (lg/md/sm/xs) use label-medium typography — size differences are padding-only per Figma spec
- 2026-05-07: secondary button border is 1.5px stroke-medium + action-primary color per Figma spec
- 2026-05-07: named @layer utilities in global.css for any class Tailwind's scanner can't detect statically (conditional ternaries, dynamic strings)
- 2026-05-08: icons use @hugeicons/react + @hugeicons/core-free-icons; always wrap with <Icon icon={...} /> from src/components/ui/icon.tsx — never inline SVGs
- 2026-05-08: Checkbox hover/pressed on unchecked uses bg color swap (--state-hover-fill / --state-pressed-fill); filled uses white opacity overlay span (--state-hover-overlay / --state-pressed-overlay) — white overlay on white bg is invisible
- 2026-05-08: Checkbox visual state classes (cb-box-*) live in global.css @layer utilities because component builds class names in ternaries that Tailwind's scanner can't detect
- 2026-05-08: Storybook icon controls use string-name args (leftIconName, rightIconName, iconName) + resolveIcon() helper in story-utils.tsx — ReactNode props can't be driven by select controls directly
- 2026-05-08: src/tokens.generated.css is gitignored — run npm run tokens:build in every new worktree before starting Storybook
- 2026-05-08: every component with a user-configurable icon prop hides the ReactNode prop from Controls and adds a string iconName arg + resolveIcon() conversion — same pattern as Button/FloatingButton/TextField/DropdownItem
- 2026-05-11: state token rename — overlay vs fill split:
  • --state-hover-overlay / --state-pressed-overlay → for dark/filled/colored backgrounds (FAB, filled checkbox, chips)
  • --state-hover-fill / --state-pressed-fill → for light/empty backgrounds (list rows, secondary/ghost buttons, text fields, dropdown items)
  • OLD NAMES DELETED: --state-hover, --state-hover-surface, --state-pressed, --state-pressed-secondary
- 2026-05-11: expression token typo fixed — --exrpession-* deleted, correct name is --expression-* (blue, magenta, teal, purple, lime)
- 2026-05-11: layout token rename — grid collection → layout collection; --grid-* → --layout-grid-*; new extras: --layout-workspace-*, --layout-canvas-*, --layout-show-sidebar
- 2026-05-11: typography line-height group — was "line height" (space) → now "line-height" (hyphen) in Figma; toKebab() in build.js already normalised spaces to dashes so CSS output --typography-line-height-* was always correct
- 2026-05-11: tokens/build.js now also generates src/tokens.metadata.json — flat JSON keyed by CSS var name, includes description, aiGroup, aiImpact, collection for every token with a $description
- 2026-05-11: gap/items tokens (--gap-items-tight/default/comfortable) still present in spacing JSON despite Figma spec saying they were merged into gap/inline — flagged as discrepancy, not yet removed from source
- 2026-05-11: shapes token restructure — corner-radius group flattened; doubled prefix removed:
  • OLD: --corner-radius-corner-full / --corner-radius-corner-medium / --corner-radius-corner-small
  • NEW: --corner-radius-full / --corner-radius-medium / --corner-radius-small
  • Full scale now available: none, xsmall, small, medium, large, xlarge, 2xlarge, full
  • stroke (--stroke-stroke-*) and focus (--focus-focus-*) names unchanged
- 2026-05-11: TextField hover uses --state-hover-overlay for BOTH the content tint overlay and the border (field-border-default:hover / field-border-filled:hover in global.css) — overrides the general overlay/fill rule for this component
