import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import * as HugeIcons from '@hugeicons/core-free-icons'
import { Icon } from '@/components/ui/icon'
import { DropdownItem, type DropdownItemProps } from '@/components/ui/dropdown-item'
import { Dropdown } from '@/components/ui/dropdown'
import { iconArgType, resolveIcon } from './story-utils'

// ── DropdownItem meta ──────────────────────────────────────────────────────────

type ItemStoryArgs = DropdownItemProps & { iconName?: string }
type Story = StoryObj<ItemStoryArgs>

const itemMeta: Meta<ItemStoryArgs> = {
  title: 'UI/DropdownItem',
  component: DropdownItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A single row in a dropdown list. Renders a label (and optional description/icon) ' +
          'with appropriate selection indicator per variant. ' +
          'Works standalone or inside a `<Dropdown>` context for automatic selection management.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['single-select', 'multi-select', 'radio'],
      description: 'Selection style — controls which indicator is shown',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the item appears selected (used without Dropdown context)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the item',
    },
    label: {
      control: 'text',
      description: 'Primary label text',
    },
    description: {
      control: 'text',
      description: 'Secondary description (single-select only)',
    },
    // Hide raw ReactNode icon — replaced by iconName select
    icon: { control: false, table: { disable: true } },
    // Icon select available on every story
    iconName: { ...iconArgType, description: 'Optional leading icon' },
  },
  // Default render: all single-item stories inherit this — no per-story render needed
  render: ({ iconName, ...args }: ItemStoryArgs) => (
    <div style={{ width: 320 }}>
      <DropdownItem {...args} icon={resolveIcon(iconName)} />
    </div>
  ),
  tags: ['autodocs'],
}

export default itemMeta

// ── Playground ─────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: 'Option label',
    description: 'Supporting description text',
    variant: 'single-select',
    selected: false,
    disabled: false,
    iconName: '(none)',
  },
}

// ── Single-select ──────────────────────────────────────────────────────────────

export const SingleSelectDefault: Story = {
  name: 'Single-select — default',
  args: { label: 'Option label', variant: 'single-select' },
}

export const SingleSelectSelected: Story = {
  name: 'Single-select — selected',
  args: { label: 'Selected option', variant: 'single-select', selected: true },
}

export const SingleSelectWithDescription: Story = {
  name: 'Single-select — with description',
  args: {
    label: 'Option label',
    description: 'Supporting description text',
    variant: 'single-select',
    selected: false,
  },
}

export const SingleSelectWithIcon: Story = {
  name: 'Single-select — with icon',
  args: {
    label: 'With icon',
    variant: 'single-select',
    iconName: 'Home01Icon',
  },
}

// ── Multi-select ───────────────────────────────────────────────────────────────

export const MultiSelectDefault: Story = {
  name: 'Multi-select — default',
  args: { label: 'Option label', variant: 'multi-select', selected: false },
}

export const MultiSelectSelected: Story = {
  name: 'Multi-select — selected',
  args: { label: 'Selected option', variant: 'multi-select', selected: true },
}

export const MultiSelectWithIcon: Story = {
  name: 'Multi-select — with icon',
  args: { label: 'With icon', variant: 'multi-select', iconName: 'Settings01Icon' },
}

// ── Radio ──────────────────────────────────────────────────────────────────────

export const RadioDefault: Story = {
  name: 'Radio — default',
  args: { label: 'Option label', variant: 'radio', selected: false },
}

export const RadioSelected: Story = {
  name: 'Radio — selected',
  args: { label: 'Selected option', variant: 'radio', selected: true },
}

// ── Disabled states ────────────────────────────────────────────────────────────

export const DisabledSingleSelect: Story = {
  name: 'Disabled — single-select',
  args: { label: 'Disabled option', variant: 'single-select', disabled: true },
}

// ── All states ─────────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 320 }}>

      {/* Single-select */}
      <div>
        <p style={{ fontSize: 11, opacity: 0.45, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Single-select</p>
        <DropdownItem label="Default" variant="single-select" />
        <DropdownItem label="Selected" variant="single-select" selected />
        <DropdownItem label="With description" description="Secondary info line" variant="single-select" />
        <DropdownItem label="Selected + description" description="Secondary info line" variant="single-select" selected />
        <DropdownItem label="With icon" variant="single-select" icon={<Icon icon={HugeIcons.Home01Icon} />} />
        <DropdownItem label="Disabled" variant="single-select" disabled />
        <DropdownItem label="Disabled selected" variant="single-select" disabled selected />
      </div>

      {/* Multi-select */}
      <div>
        <p style={{ fontSize: 11, opacity: 0.45, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Multi-select</p>
        <DropdownItem label="Default" variant="multi-select" />
        <DropdownItem label="Selected" variant="multi-select" selected />
        <DropdownItem label="With icon" variant="multi-select" icon={<Icon icon={HugeIcons.Settings01Icon} />} />
        <DropdownItem label="Disabled" variant="multi-select" disabled />
      </div>

      {/* Radio */}
      <div>
        <p style={{ fontSize: 11, opacity: 0.45, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Radio</p>
        <DropdownItem label="Default" variant="radio" />
        <DropdownItem label="Selected" variant="radio" selected />
        <DropdownItem label="Disabled" variant="radio" disabled />
        <DropdownItem label="Disabled selected" variant="radio" disabled selected />
      </div>

    </div>
  ),
}

// ── DropdownList stories ───────────────────────────────────────────────────────
// These use a separate meta exported inline via the `component` override

export const SingleSelectList: Story = {
  name: 'DropdownList — single-select',
  parameters: { layout: 'centered' },
  render: () => (
    <Dropdown variant="single-select" defaultValue="option-b" style={{ width: 280 } as React.CSSProperties}>
      <DropdownItem value="option-a" label="Option A" />
      <DropdownItem value="option-b" label="Option B" />
      <DropdownItem value="option-c" label="Option C" description="With description" />
      <DropdownItem value="option-d" label="With icon" icon={<Icon icon={HugeIcons.Home01Icon} />} />
      <DropdownItem value="option-e" label="Disabled option" disabled />
    </Dropdown>
  ),
}

export const MultiSelectList: Story = {
  name: 'DropdownList — multi-select (with Select all)',
  parameters: { layout: 'centered' },
  render: () => (
    <Dropdown
      variant="multi-select"
      defaultValue={['option-a', 'option-c']}
      selectAll
      style={{ width: 280 } as React.CSSProperties}
    >
      <DropdownItem value="option-a" label="Option A" />
      <DropdownItem value="option-b" label="Option B" />
      <DropdownItem value="option-c" label="Option C" />
      <DropdownItem value="option-d" label="Option D" />
      <DropdownItem value="option-e" label="Disabled option" disabled />
    </Dropdown>
  ),
}

export const RadioList: Story = {
  name: 'DropdownList — radio',
  parameters: { layout: 'centered' },
  render: () => (
    <Dropdown variant="radio" defaultValue="option-b" style={{ width: 280 } as React.CSSProperties}>
      <DropdownItem value="option-a" label="Option A" />
      <DropdownItem value="option-b" label="Option B" />
      <DropdownItem value="option-c" label="Option C" />
      <DropdownItem value="option-d" label="Disabled option" disabled />
    </Dropdown>
  ),
}

// ── Controlled example ─────────────────────────────────────────────────────────

export const ControlledSingleSelect: Story = {
  name: 'Controlled — single-select',
  parameters: { layout: 'centered' },
  render: () => {
    const [value, setValue] = useState<string | undefined>('option-b')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <p style={{ fontSize: 13, opacity: 0.6 }}>
          Selected: <strong>{value ?? '(none)'}</strong>
        </p>
        <Dropdown
          variant="single-select"
          value={value}
          onChange={(v) => setValue(v as string)}
          style={{ width: 280 } as React.CSSProperties}
        >
          <DropdownItem value="option-a" label="Option A" />
          <DropdownItem value="option-b" label="Option B" />
          <DropdownItem value="option-c" label="Option C" />
        </Dropdown>
        <button
          onClick={() => setValue(undefined)}
          style={{ fontSize: 12, opacity: 0.5, textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none' }}
        >
          Clear selection
        </button>
      </div>
    )
  },
}

export const ControlledMultiSelect: Story = {
  name: 'Controlled — multi-select',
  parameters: { layout: 'centered' },
  render: () => {
    const [value, setValue] = useState<string[]>(['option-a'])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <p style={{ fontSize: 13, opacity: 0.6 }}>
          Selected: <strong>{value.length > 0 ? value.join(', ') : '(none)'}</strong>
        </p>
        <Dropdown
          variant="multi-select"
          value={value}
          onChange={(v) => setValue(v as string[])}
          selectAll
          style={{ width: 280 } as React.CSSProperties}
        >
          <DropdownItem value="option-a" label="Option A" />
          <DropdownItem value="option-b" label="Option B" />
          <DropdownItem value="option-c" label="Option C" />
          <DropdownItem value="option-d" label="Option D" />
        </Dropdown>
        <button
          onClick={() => setValue([])}
          style={{ fontSize: 12, opacity: 0.5, textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none' }}
        >
          Clear selection
        </button>
      </div>
    )
  },
}

export const ControlledRadio: Story = {
  name: 'Controlled — radio',
  parameters: { layout: 'centered' },
  render: () => {
    const [value, setValue] = useState<string | undefined>('option-a')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <p style={{ fontSize: 13, opacity: 0.6 }}>
          Selected: <strong>{value ?? '(none)'}</strong>
        </p>
        <Dropdown
          variant="radio"
          value={value}
          onChange={(v) => setValue(v as string)}
          style={{ width: 280 } as React.CSSProperties}
        >
          <DropdownItem value="option-a" label="Option A" />
          <DropdownItem value="option-b" label="Option B" />
          <DropdownItem value="option-c" label="Option C" />
        </Dropdown>
      </div>
    )
  },
}

// ── Scrollable list ────────────────────────────────────────────────────────────

export const ScrollableList: Story = {
  name: 'DropdownList — scrollable',
  parameters: { layout: 'centered' },
  render: () => (
    <Dropdown variant="single-select" maxHeight={200} style={{ width: 280 } as React.CSSProperties}>
      {Array.from({ length: 10 }, (_, i) => (
        <DropdownItem key={i} value={`option-${i}`} label={`Option ${i + 1}`} />
      ))}
    </Dropdown>
  ),
}
