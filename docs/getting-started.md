# Getting Started

## Quick Start (Claude Code)

```bash
# Clone the repo
git clone https://github.com/YOUR_ORG/my-design-system
cd my-design-system

# Install dependencies
npm install

# Import your Figma tokens (replace with your export)
cp ~/Downloads/tokens.json tokens/figma/tokens.json

# Build tokens → CSS variables
npm run tokens:build

# Start Storybook to see all components
npm run storybook
```

## Importing Figma Tokens

1. In Figma, install the **Tokens Studio** plugin
2. Export tokens as JSON: Plugin → Export → JSON (W3C format)
3. Copy the file to `tokens/figma/tokens.json`
4. Run `npm run tokens:build`
5. CSS variables are now available in `tokens/transformed/css/variables.css`

## Using in Another Project

```bash
npm install github:YOUR_ORG/my-design-system
```

```tsx
import { Button } from 'my-design-system'
import 'my-design-system/styles'

export default function App() {
  return <Button variant="primary">Hello</Button>
}
```

## Claude Code Integration

Add this to the `CLAUDE.md` of any project that uses this design system:

```markdown
## Design System
Components: import from 'my-design-system'
Tokens CSS: already imported via 'my-design-system/styles'
Token docs: see node_modules/my-design-system/docs/tokens.md
Rules:
- Always use design system components before building custom ones
- Never hardcode colors or spacing — use CSS variables from the token set
- All CSS variables are prefixed: --color-*, --spacing-*, --font-size-*, etc.
```
