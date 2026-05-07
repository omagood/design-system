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
Build tokens: npm run tokens:build
Full AI reference: llms.txt

## Rules — Always Follow
- ALWAYS use CSS variables from src/tokens.generated.css for ALL values
- NEVER hardcode colors, spacing, font-sizes, radii, shadows, opacity, duration
- NEVER use plain Tailwind numbers like px-4, text-sm, font-semibold, rounded-md
- ALWAYS use token-based syntax: px-[var(--spacing-space-16px)]
- If a token is missing — report it, never invent a value
- Every new component must follow the CVA pattern in llms.txt
- Every new component must have a Storybook story

## Decisions
- 2026-05-07: font-weight uses [font-weight:var(--typography-weight-label)], not Tailwind font-semibold
- 2026-05-07: font-family uses [font-family:var(--typography-font-family)], not hardcoded string
- 2026-05-07: font-[var(...)] is ambiguous in Tailwind v4 (may resolve as font-family) — always use explicit [font-weight:var(...)] syntax
- 2026-05-07: inset box-shadow used for borders that must not affect layout (e.g. TextField 1px→2px transition)
- 2026-05-07: all button sizes (lg/md/sm/xs) use label-medium typography — size differences are padding-only per Figma spec
- 2026-05-07: secondary button border is 1.5px stroke-medium + action-primary color per Figma spec
- 2026-05-07: named @layer utilities in global.css for any class Tailwind's scanner can't detect statically (conditional ternaries, dynamic strings)
