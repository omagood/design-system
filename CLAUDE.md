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
Tokens output: src/tokens.generated.css
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
- 2026-05-08: Checkbox hover/pressed on unchecked uses bg color swap (--state-hover-surface / --state-pressed-secondary); filled uses white opacity overlay span — white overlay on white bg is invisible
- 2026-05-08: Checkbox visual state classes (cb-box-*) live in global.css @layer utilities because component builds class names in ternaries that Tailwind's scanner can't detect
- 2026-05-08: Storybook icon controls use string-name args (leftIconName, rightIconName, iconName) + resolveIcon() helper in story-utils.tsx — ReactNode props can't be driven by select controls directly
- 2026-05-08: src/tokens.generated.css is gitignored — run npm run tokens:build in every new worktree before starting Storybook
- 2026-05-08: every component with a user-configurable icon prop hides the ReactNode prop from Controls and adds a string iconName arg + resolveIcon() conversion — same pattern as Button/FloatingButton/TextField/DropdownItem
