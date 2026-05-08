import type { Meta, StoryObj } from '@storybook/react'
import * as HugeIcons from '@hugeicons/core-free-icons'
import { Icon } from '@/components/ui/icon'
import type { IconSvgElement } from '@hugeicons/react'

// ── Build a name→data map from every exported icon ────────────────────────────
const iconMap = Object.fromEntries(
  Object.entries(HugeIcons).filter(([, v]) => Array.isArray(v))
) as Record<string, IconSvgElement>

const iconNames = Object.keys(iconMap).sort()

// ── Wrapper that accepts a string name so Storybook select works ──────────────
function IconByName({ name, size, color, strokeWidth }: {
  name: string
  size?: number
  color?: string
  strokeWidth?: number
}) {
  const icon = iconMap[name]
  if (!icon) return <span style={{ opacity: 0.4 }}>Icon not found: {name}</span>
  return <Icon icon={icon} size={size} color={color} strokeWidth={strokeWidth} />
}

// ── Meta ──────────────────────────────────────────────────────────────────────
const meta: Meta<typeof IconByName> = {
  title: 'UI/Icon',
  component: IconByName,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Thin wrapper around HugeiconsIcon. All icons come from ' +
          '`@hugeicons/core-free-icons` — import the icon data and pass it to `<Icon icon={...} />`. ' +
          `${iconNames.length.toLocaleString()} icons available.`,
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
      description: 'Icon name from @hugeicons/core-free-icons',
    },
    size: {
      control: { type: 'number', min: 12, max: 64, step: 4 },
      description: 'Width and height in px',
    },
    color: {
      control: 'color',
      description: 'Icon colour (any CSS colour or "currentColor")',
    },
    strokeWidth: {
      control: { type: 'number', min: 0.5, max: 3, step: 0.5 },
      description: 'Stroke width',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof IconByName>

// ── Playground — pick any icon from the dropdown ──────────────────────────────
export const Playground: Story = {
  args: {
    name: 'Home01Icon',
    size: 24,
    strokeWidth: 1.5,
  },
}

// ── Sizes ─────────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {([12, 16, 20, 24, 32, 48] as const).map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <Icon icon={iconMap['Home01Icon']} size={s} />
          <span style={{ fontSize: 11, opacity: 0.45 }}>{s}px</span>
        </div>
      ))}
    </div>
  ),
}

// ── Stroke widths ─────────────────────────────────────────────────────────────
export const StrokeWidths: Story = {
  name: 'Stroke widths',
  render: () => (
    <div className="flex items-center gap-8">
      {([0.5, 1, 1.5, 2, 2.5] as const).map((sw) => (
        <div key={sw} className="flex flex-col items-center gap-2">
          <Icon icon={iconMap['Home01Icon']} size={32} strokeWidth={sw} />
          <span style={{ fontSize: 11, opacity: 0.45 }}>{sw}</span>
        </div>
      ))}
    </div>
  ),
}

// ── Colour inherits from text ─────────────────────────────────────────────────
export const ColorInheritance: Story = {
  name: 'Colour from parent text',
  render: () => (
    <div className="flex items-center gap-6">
      {(['#0D0D0D', '#266EF1', '#DE1135', '#636B7F'] as const).map((c) => (
        <span key={c} style={{ color: c }}>
          <Icon icon={iconMap['Home01Icon']} size={28} />
        </span>
      ))}
    </div>
  ),
}

// ── Sample grid ───────────────────────────────────────────────────────────────
const SAMPLE = [
  'Home01Icon', 'Search01Icon', 'Settings01Icon', 'User01Icon',
  'Mail01Icon', 'Notification01Icon', 'Calendar01Icon', 'FileDocument01Icon',
  'Add01Icon', 'Delete01Icon', 'Edit01Icon', 'Download01Icon',
  'ArrowLeft01Icon', 'ArrowRight01Icon', 'CheckmarkCircle01Icon', 'AlertCircleIcon',
]

export const SampleGrid: Story = {
  name: 'Sample grid',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 24 }}>
      {SAMPLE.map((name) => (
        iconMap[name] ? (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Icon icon={iconMap[name]} size={24} />
            <span style={{ fontSize: 9, opacity: 0.4, textAlign: 'center', wordBreak: 'break-all' }}>
              {name.replace('Icon', '')}
            </span>
          </div>
        ) : null
      ))}
    </div>
  ),
}
