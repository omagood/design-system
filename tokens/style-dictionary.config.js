// tokens/style-dictionary.config.js
// Exact config for YOUR Figma Variables export format:
//   - Primitives.tokens.json: flat under "Colors" and "Spacing" keys
//   - Light.tokens.json / Dark.tokens.json: semantic, values already resolved
//   - $value is { colorSpace, components, alpha, hex } OR a string alias
//   - Spacing $type is "number" (unitless) → we add "px" in transform
//   - -internal group is excluded

import StyleDictionary from 'style-dictionary'
import { mkdirSync } from 'fs'

// ─────────────────────────────────────────────────────────────────
// TRANSFORM 1: color — extract hex, build rgba for alpha colors
// ─────────────────────────────────────────────────────────────────
StyleDictionary.registerTransform({
  name: 'color/figma-hex',
  type: 'value',
  filter: token => (token.$type ?? token.type) === 'color',
  transform: token => {
    const val = token.$value ?? token.value
    if (typeof val === 'string') return val
    if (!val || typeof val !== 'object') return val

    const { hex, alpha, components } = val
    if (!hex) return val

    // Full opacity → plain hex
    if (alpha === undefined || alpha === 1) return hex

    // Semi-transparent → rgba()
    const r = Math.round((components[0] ?? 0) * 255)
    const g = Math.round((components[1] ?? 0) * 255)
    const b = Math.round((components[2] ?? 0) * 255)
    const a = Math.round(alpha * 1000) / 1000
    return `rgba(${r}, ${g}, ${b}, ${a})`
  },
})

// ─────────────────────────────────────────────────────────────────
// TRANSFORM 2: number → px  (Spacing tokens are unitless numbers)
// ─────────────────────────────────────────────────────────────────
StyleDictionary.registerTransform({
  name: 'size/figma-px',
  type: 'value',
  filter: token => (token.$type ?? token.type) === 'number',
  transform: token => {
    const val = token.$value ?? token.value
    return `${val}px`
  },
})

// ─────────────────────────────────────────────────────────────────
// TRANSFORM GROUPS
// ─────────────────────────────────────────────────────────────────
StyleDictionary.registerTransformGroup({
  name: 'figma/css',
  transforms: [
    'attribute/cti',
    'name/kebab',
    'color/figma-hex',
    'size/figma-px',
  ],
})

// TS needs SCREAMING_SNAKE_CASE so names are valid JS identifiers
StyleDictionary.registerTransformGroup({
  name: 'figma/ts',
  transforms: [
    'attribute/cti',
    'name/constant',
    'color/figma-hex',
    'size/figma-px',
  ],
})

// ─────────────────────────────────────────────────────────────────
// FILTER: exclude -internal tokens
// ─────────────────────────────────────────────────────────────────
StyleDictionary.registerFilter({
  name: 'no-internal',
  filter: token => !token.path.some(p => p.startsWith('-')),
})

// ─────────────────────────────────────────────────────────────────
// FORMAT: CSS variables with Figma alias comment
// ─────────────────────────────────────────────────────────────────
StyleDictionary.registerFormat({
  name: 'css/clean-vars',
  format: ({ dictionary, options }) => {
    const selector = options.selector ?? ':root'
    const lines = dictionary.allTokens
      .filter(t => !t.path.some(p => p.startsWith('-')))
      .map(token => {
        const value = token.$value
        const alias = token.original?.$extensions?.['com.figma.aliasData']?.targetVariableName
        const comment = alias ? ` /* ${alias} */` : ''
        return `  --${token.name}: ${value};${comment}`
      })
    return `${selector} {\n${lines.join('\n')}\n}\n`
  },
})

// ─────────────────────────────────────────────────────────────────
// BUILD HELPER
// ─────────────────────────────────────────────────────────────────
async function buildSet({ sources, selector, cssFile, tsFile }) {
  mkdirSync('tokens/transformed/css', { recursive: true })
  mkdirSync('tokens/transformed/ts',  { recursive: true })

  const sd = new StyleDictionary({
    source: sources,
    usesDtcg: true,
    platforms: {
      css: {
        transformGroup: 'figma/css',
        buildPath: 'tokens/transformed/css/',
        files: [{
          destination: cssFile,
          format: 'css/clean-vars',
          filter: 'no-internal',
          options: { selector },
        }],
      },
      ts: {
        transformGroup: 'figma/ts',
        buildPath: 'tokens/transformed/ts/',
        files: [{
          destination: tsFile,
          format: 'javascript/es6',
          filter: 'no-internal',
        }],
      },
    },
  })

  await sd.buildAllPlatforms()
  console.log(`  ✅ ${cssFile}`)
}

// ─────────────────────────────────────────────────────────────────
// BUILDS
// ─────────────────────────────────────────────────────────────────
console.log('🔨 Building tokens...')

// 1. Primitives only (raw palette, useful for debugging)
await buildSet({
  sources: ['tokens/figma/Primitives/Primitives.tokens.json'],
  selector: ':root',
  cssFile: 'primitives.css',
  tsFile:  'primitives.ts',
})

// 2. Light + Desktop (main :root build)
await buildSet({
  sources: [
    'tokens/figma/Primitives/Primitives.tokens.json',
    'tokens/figma/Colors/Light.tokens.json',
    'tokens/figma/Typography/Desktop.tokens.json',
    'tokens/figma/Spacing/Desktop.tokens.json',
    'tokens/figma/Shapes/Shapes.tokens.json',
    'tokens/figma/Grid/Desktop.tokens.json',
    'tokens/figma/Shadows/Light.tokens.json',
  ],
  selector: ':root',
  cssFile: 'variables.css',
  tsFile:  'tokens.ts',
})

// 3. Dark overrides (colors + shadows only — no primitives, values are pre-resolved)
await buildSet({
  sources: [
    'tokens/figma/Colors/Dark.tokens.json',
    'tokens/figma/Shadows/Dark.tokens.json',
  ],
  selector: '[data-theme="dark"], .dark',
  cssFile: 'variables-dark.css',
  tsFile:  'tokens-dark.ts',
})

// 4. Mobile overrides — uncomment after unzipping mobile exports
// await buildSet({
//   sources: [
//     'tokens/figma/Primitives/Primitives_tokens.json',
//     'tokens/figma/Typography/mobile.json',
//     'tokens/figma/Spacing/mobile.json',
//     'tokens/figma/Grid/mobile.json',
//   ],
//   selector: ':root',
//   cssFile: 'variables-mobile.css',
//   tsFile:  'tokens-mobile.ts',
// })

console.log('\n🎨 Done. Output:')
console.log('   tokens/transformed/css/primitives.css     ← raw palette')
console.log('   tokens/transformed/css/variables.css      ← semantic light + desktop')
console.log('   tokens/transformed/css/variables-dark.css ← dark overrides')
console.log('   tokens/transformed/ts/tokens.ts           ← TypeScript constants')
