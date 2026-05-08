import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A checkbox input with optional label. Supports checked, unchecked, and indeterminate states. ' +
          'Works in both controlled and uncontrolled modes. ' +
          'Use `indeterminate` to represent a partially-selected group (e.g. a parent whose children are mixed).',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Optional label rendered to the right of the box',
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Renders the dash/minus icon — takes visual precedence over checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Checkbox>

// ── Playground ─────────────────────────────────────────────────────────────────
export const Playground: Story = {
  args: { label: 'Checkbox', defaultChecked: false },
}

// ── States ─────────────────────────────────────────────────────────────────────
export const Unchecked: Story = {
  args: { label: 'Unchecked' },
}

export const Checked: Story = {
  args: { label: 'Checked', defaultChecked: true },
}

export const Indeterminate: Story = {
  args: { label: 'Indeterminate', indeterminate: true },
}

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
}

export const DisabledChecked: Story = {
  name: 'Disabled (checked)',
  args: { label: 'Disabled checked', disabled: true, defaultChecked: true },
}

export const DisabledIndeterminate: Story = {
  name: 'Disabled (indeterminate)',
  args: { label: 'Disabled indeterminate', disabled: true, indeterminate: true },
}

// ── Without label ──────────────────────────────────────────────────────────────
export const NoLabel: Story = {
  name: 'No label',
  args: {},
}

export const NoLabelChecked: Story = {
  name: 'No label (checked)',
  args: { defaultChecked: true },
}

// ── Controlled ─────────────────────────────────────────────────────────────────
export const Controlled: Story = {
  name: 'Controlled',
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex flex-col items-start gap-3">
        <Checkbox
          label={checked ? 'Checked ✓' : 'Unchecked'}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <button
          onClick={() => setChecked((v) => !v)}
          className="text-sm underline opacity-60"
        >
          Toggle externally
        </button>
      </div>
    )
  },
}

// ── Indeterminate parent example ───────────────────────────────────────────────
export const IndeterminateGroup: Story = {
  name: 'Indeterminate group',
  render: () => {
    const [items, setItems] = useState([false, true, false])
    const allChecked = items.every(Boolean)
    const someChecked = items.some(Boolean) && !allChecked

    const toggleAll = () => {
      const next = !allChecked
      setItems(items.map(() => next))
    }

    return (
      <div className="flex flex-col items-start gap-2">
        <Checkbox
          label="Select all"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={toggleAll}
        />
        <div className="flex flex-col items-start gap-2 pl-8">
          {['Option A', 'Option B', 'Option C'].map((opt, i) => (
            <Checkbox
              key={opt}
              label={opt}
              checked={items[i]}
              onChange={(e) =>
                setItems(items.map((v, idx) => (idx === i ? e.target.checked : v)))
              }
            />
          ))}
        </div>
      </div>
    )
  },
}

// ── Showcase grid ──────────────────────────────────────────────────────────────
export const AllStates: Story = {
  name: 'All states',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr', alignItems: 'center', gap: '16px 32px' }}>
      {/* Corner spacer */}
      <span />
      {/* Column headers */}
      <span style={{ fontSize: 12, opacity: 0.45, fontWeight: 500, textAlign: 'center' }}>Unchecked</span>
      <span style={{ fontSize: 12, opacity: 0.45, fontWeight: 500, textAlign: 'center' }}>Checked</span>
      <span style={{ fontSize: 12, opacity: 0.45, fontWeight: 500, textAlign: 'center' }}>Indeterminate</span>

      {/* Default row */}
      <span style={{ fontSize: 12, opacity: 0.45, fontWeight: 500 }}>Default</span>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Checkbox /></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Checkbox defaultChecked /></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Checkbox indeterminate /></div>

      {/* Disabled row */}
      <span style={{ fontSize: 12, opacity: 0.45, fontWeight: 500 }}>Disabled</span>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Checkbox disabled /></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Checkbox disabled defaultChecked /></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Checkbox disabled indeterminate /></div>
    </div>
  ),
}
