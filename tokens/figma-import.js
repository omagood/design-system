#!/usr/bin/env node
/**
 * tokens/figma-import.js
 *
 * Fetches all Figma variable collections and writes them to tokens/figma/
 * in the W3C DTCG format that tokens/build.js expects.
 *
 * Usage:
 *   npm run tokens:import
 *   node tokens/figma-import.js
 *
 * Required env var (set in .env.local at project root, gitignored):
 *   FIGMA_TOKEN — Personal Access Token from Figma → Settings → Personal access tokens
 *
 * After running, rebuild CSS:
 *   npm run tokens:build
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const FIGMA_DIR = join(__dirname, 'figma')

// ── Load .env.local ───────────────────────────────────────────────────────────

function loadEnvLocal() {
  const envPath = join(ROOT, '.env.local')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([^#=\s]+)\s*=\s*(.*)$/)
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].trim().replace(/^(['"])(.*)\1$/, '$2')
    }
  }
}

loadEnvLocal()

// Figma file key — extracted from the project URL (not secret, safe to commit)
const FIGMA_FILE_KEY = 'dIRzjciwLXuDD5IZQIKHeO'

const FIGMA_TOKEN = process.env.FIGMA_TOKEN

if (!FIGMA_TOKEN) {
  console.error(
    'Missing FIGMA_TOKEN.\n' +
    'Create .env.local at the project root with:\n' +
    '  FIGMA_TOKEN=<personal-access-token>',
  )
  process.exit(1)
}

// ── Collection → output file mapping ─────────────────────────────────────────
//
// Key: Figma collection name (matched case-insensitively).
//
// single:    one output file — uses the mode named by `modeHint` (case-insensitive).
//            If a Figma file has two collections with the same name, the modeHint
//            disambiguates which one to use; the other is silently skipped.
//            Omit modeHint to use the collection's default mode.
//
// modes:     map of Figma mode name (case-insensitive) → relative path inside tokens/figma/.
//
// Update mode names here if Figma renames them.

const COLLECTION_MAP = {
  'primitives': {
    single: 'primitives.json',
    modeHint: 'primitives',
  },
  'colors': {
    modes: {
      'light': 'colors/light.json',
      'dark':  'colors/dark.json',
    },
    // The colors collection contains stray uppercase-prefixed groups (Typography/*, Primitives/*)
    // that duplicate other collections. All semantic tokens use lowercase group names.
    exclude: name => /^[A-Z]/.test(name),
  },
  'elevation': {
    modes: {
      'light': 'elevation/light.json',
      'dark':  'elevation/dark.json',
    },
  },
  'shapes': {
    single: 'shapes/shapes.json',
    modeHint: 'shapes',
  },
  'spacing': {
    modes: {
      'desktop': 'spacing/desktop.json',
      'tablet':  'spacing/tablet.json',
      'mobile':  'spacing/mobile.json',
    },
  },
  'layout': {
    modes: {
      'desktop': 'layout/desktop.json',
      'tablet':  'layout/tablet.json',
      'mobile':  'layout/mobile.json',
    },
  },
  'typography': {
    modes: {
      'desktop': 'typography/desktop.json',
      'tablet':  'typography/tablet.json',
      'mobile':  'typography/mobile.json',
    },
  },
}

// ── Figma REST API ────────────────────────────────────────────────────────────

async function fetchVariables() {
  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Figma API ${res.status} ${res.statusText}: ${body}`)
  }
  const json = await res.json()
  if (json.err) throw new Error(`Figma API error: ${json.err}`)
  return json.meta
}

// ── Conversion helpers ────────────────────────────────────────────────────────

function toHex2(v) {
  return Math.round(v * 255).toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
  return `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`
}

const TYPE_MAP = { COLOR: 'color', FLOAT: 'number', STRING: 'string' }

/** Resolve a VARIABLE_ALIAS chain to its concrete value (returns null on failure). */
function resolveAlias(rawValue, variables, modeId, visited = new Set()) {
  if (!rawValue || typeof rawValue !== 'object' || rawValue.type !== 'VARIABLE_ALIAS') {
    return rawValue
  }
  const targetId = rawValue.id
  if (visited.has(targetId)) return null
  visited.add(targetId)
  const target = variables[targetId]
  if (!target) return null
  const next = target.valuesByMode[modeId] ?? Object.values(target.valuesByMode)[0]
  return resolveAlias(next, variables, modeId, visited)
}

/** Build com.figma.aliasData when the raw value is an alias. */
function buildAliasData(rawValue, variables, collections) {
  if (!rawValue || rawValue.type !== 'VARIABLE_ALIAS') return null
  const target = variables[rawValue.id]
  if (!target) return null
  const col = collections[target.variableCollectionId]
  return {
    targetVariableId: rawValue.id,
    targetVariableName: target.name,
    targetVariableSetId: target.variableCollectionId,
    targetVariableSetName: col?.name ?? '',
  }
}

/** Convert one Figma variable + mode value → W3C DTCG token object. */
function toToken(variable, modeId, rawValue, variables, collections) {
  const w3cType = TYPE_MAP[variable.resolvedType]
  if (!w3cType) return null

  const concrete = resolveAlias(rawValue, variables, modeId)
  if (concrete == null) return null

  let $value
  if (w3cType === 'color') {
    const { r, g, b, a } = concrete
    $value = { colorSpace: 'srgb', components: [r, g, b], alpha: a, hex: rgbToHex(r, g, b) }
  } else if (w3cType === 'number') {
    $value = concrete
  } else {
    $value = String(concrete)
  }

  const $extensions = { 'com.figma.variableId': variable.id }
  if (variable.scopes?.length > 0) {
    $extensions['com.figma.scopes'] = variable.scopes
  }
  const alias = buildAliasData(rawValue, variables, collections)
  if (alias) $extensions['com.figma.aliasData'] = alias

  return {
    $type: w3cType,
    $value,
    ...(variable.description ? { $description: variable.description } : {}),
    $extensions,
  }
}

/** Set a value at a nested path in obj, splitting name by '/'. */
function setNested(obj, name, value) {
  const parts = name.split('/')
  let node = obj
  for (let i = 0; i < parts.length - 1; i++) {
    node[parts[i]] ??= {}
    node = node[parts[i]]
  }
  node[parts.at(-1)] = value
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log(`Fetching variables from Figma file ${FIGMA_FILE_KEY}…\n`)

const { variableCollections, variables } = await fetchVariables()

let filesWritten = 0
let tokensTotal = 0
const skipped = []

for (const col of Object.values(variableCollections)) {
  const mapping = COLLECTION_MAP[col.name.toLowerCase()]

  if (!mapping) {
    skipped.push(col.name)
    continue
  }

  const colVars = col.variableIds.map(id => variables[id]).filter(Boolean)

  // Build list of (modeId, modeName, outPath) to export
  let exports
  if (mapping.single) {
    // For single-mode collections, use modeHint to pick the right collection when
    // multiple Figma collections share the same name (e.g. two "primitives" collections).
    if (mapping.modeHint) {
      const match = col.modes.find(m => m.name.toLowerCase() === mapping.modeHint.toLowerCase())
      if (!match) continue  // wrong duplicate — skip silently
      exports = [{ modeId: match.modeId, modeName: null, outPath: mapping.single }]
    } else {
      exports = [{ modeId: col.defaultModeId, modeName: null, outPath: mapping.single }]
    }
  } else {
    exports = col.modes
      .map(m => ({ modeId: m.modeId, modeName: m.name, outPath: mapping.modes[m.name.toLowerCase()] }))
      .filter(e => e.outPath)
  }

  if (!exports.length) {
    console.warn(`⚠  Collection "${col.name}" has no matching modes in COLLECTION_MAP`)
    continue
  }

  for (const { modeId, modeName, outPath } of exports) {
    const tree = {}
    let count = 0

    for (const variable of colVars) {
      if (mapping.exclude?.(variable.name)) continue
      const rawValue = variable.valuesByMode[modeId]
      if (rawValue === undefined) continue
      const token = toToken(variable, modeId, rawValue, variables, variableCollections)
      if (!token) continue
      setNested(tree, variable.name, token)
      count++
    }

    // Top-level mode metadata (mirrors Figma's own JSON export; build.js skips $-keys)
    if (modeName) tree.$extensions = { 'com.figma.modeName': modeName }

    const absPath = join(FIGMA_DIR, outPath)
    mkdirSync(dirname(absPath), { recursive: true })
    writeFileSync(absPath, JSON.stringify(tree, null, 2) + '\n', 'utf8')

    console.log(`✓ ${count.toString().padStart(4)} tokens  →  tokens/figma/${outPath}`)
    filesWritten++
    tokensTotal += count
  }
}

if (skipped.length) {
  console.warn(`\n⚠  Skipped unknown collections (add to COLLECTION_MAP if needed):`)
  skipped.forEach(n => console.warn(`   • ${n}`))
}

console.log(`\n${tokensTotal} tokens written to ${filesWritten} files.`)
console.log('Run  npm run tokens:build  to regenerate tokens.generated.css')
