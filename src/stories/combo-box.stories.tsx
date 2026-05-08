import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ComboBox, type ComboBoxProps } from '@/components/ui/combo-box'

// ── Sample data ────────────────────────────────────────────────────────────────

const OPTIONS_SHORT = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
  { value: 'opt3', label: 'Option 3' },
  { value: 'opt4', label: 'Option 4' },
  { value: 'opt5', label: 'Option 5' },
]

const OPTIONS_LONG = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Customer Support' },
  { value: 'ops', label: 'Operations' },
  { value: 'finance', label: 'Finance' },
]

const OPTIONS_WITH_DISABLED = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
  { value: 'opt3', label: 'Option 3 (disabled)', disabled: true },
  { value: 'opt4', label: 'Option 4' },
  { value: 'opt5', label: 'Option 5' },
]

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ComboBox> = {
  title: 'UI/ComboBox',
  component: ComboBox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      // Extra bottom padding so the open dropdown has room to render
      <div className="w-[376px] pb-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label:      { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error:      { control: 'boolean' },
    disabled:   { control: 'boolean' },
    selectAll:  { control: 'boolean' },
    maxHeight:  { control: 'number' },
    // Hide complex props from Controls panel
    options:    { control: false },
    value:      { control: false },
    defaultValue: { control: false },
    onChange:   { control: false },
  },
}

export default meta
type Story = StoryObj<ComboBoxProps>

// ── Playground ─────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: 'Label',
    options: OPTIONS_SHORT,
    selectAll: true,
  },
}

// ── Empty state ────────────────────────────────────────────────────────────────

export const Empty: Story = {
  name: 'Empty (Default)',
  args: {
    label: 'Department',
    options: OPTIONS_SHORT,
  },
}

export const EmptyWithHelper: Story = {
  name: 'Empty — With helper text',
  args: {
    label: 'Department',
    helperText: 'Select one or more departments',
    options: OPTIONS_SHORT,
  },
}

// ── Pre-selected ───────────────────────────────────────────────────────────────

export const PreSelected: Story = {
  name: 'With pre-selected values',
  args: {
    label: 'Department',
    defaultValue: ['opt2', 'opt4'],
    options: OPTIONS_SHORT,
  },
}

// ── Error ──────────────────────────────────────────────────────────────────────

export const ErrorEmpty: Story = {
  name: 'Error — Empty',
  args: {
    label: 'Department',
    error: true,
    helperText: 'At least one option required',
    options: OPTIONS_SHORT,
  },
}

// ── Disabled ───────────────────────────────────────────────────────────────────

export const DisabledEmpty: Story = {
  name: 'Disabled — Empty',
  args: {
    label: 'Department',
    disabled: true,
    helperText: 'Helper text',
    options: OPTIONS_SHORT,
  },
}

export const DisabledFilled: Story = {
  name: 'Disabled — With selection',
  args: {
    label: 'Department',
    disabled: true,
    defaultValue: ['opt1', 'opt3'],
    helperText: 'Helper text',
    options: OPTIONS_SHORT,
  },
}

// ── Disabled items ─────────────────────────────────────────────────────────────

export const WithDisabledOptions: Story = {
  name: 'With disabled options',
  args: {
    label: 'Category',
    options: OPTIONS_WITH_DISABLED,
  },
}

// ── Long list (scrollable) ─────────────────────────────────────────────────────

export const LongList: Story = {
  name: 'Long list (scrollable)',
  args: {
    label: 'Team',
    options: OPTIONS_LONG,
    selectAll: true,
  },
}

// ── No "Select all" row ────────────────────────────────────────────────────────

export const NoSelectAll: Story = {
  name: 'Without select-all row',
  args: {
    label: 'Department',
    options: OPTIONS_SHORT,
    selectAll: false,
  },
}

// ── Controlled example ─────────────────────────────────────────────────────────

export const Controlled: Story = {
  name: 'Controlled (with state display)',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<string[]>([])
    return (
      <div className="flex flex-col gap-4">
        <ComboBox
          label="Department"
          options={OPTIONS_SHORT}
          value={selected}
          onChange={setSelected}
          helperText="Select one or more options"
        />
        <p className="text-[length:var(--typography-size-paragraph-xsmall)] text-[color:var(--content-secondary)]">
          Selected: {selected.length > 0 ? selected.join(', ') : '(none)'}
        </p>
      </div>
    )
  },
}

// ── All variants grid ──────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-6 p-8 w-[760px] pb-96">
      <div>
        <p className="mb-4 text-sm [font-weight:var(--typography-weight-label)] text-[color:var(--content-secondary)]">Default — Empty</p>
        <div className="grid grid-cols-2 gap-6">
          <ComboBox label="Department" options={OPTIONS_SHORT} helperText="Helper text" />
          <ComboBox label="Department" options={OPTIONS_SHORT} />
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm [font-weight:var(--typography-weight-label)] text-[color:var(--content-secondary)]">Default — Filled</p>
        <div className="grid grid-cols-2 gap-6">
          <ComboBox label="Department" options={OPTIONS_SHORT} defaultValue={['opt2', 'opt4']} helperText="Helper text" />
          <ComboBox label="Department" options={OPTIONS_SHORT} defaultValue={['opt1']} />
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm [font-weight:var(--typography-weight-label)] text-[color:var(--content-secondary)]">Error</p>
        <div className="grid grid-cols-2 gap-6">
          <ComboBox label="Department" options={OPTIONS_SHORT} error helperText="Required field" />
          <ComboBox label="Department" options={OPTIONS_SHORT} defaultValue={['opt1']} error helperText="Invalid selection" />
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm [font-weight:var(--typography-weight-label)] text-[color:var(--content-secondary)]">Disabled</p>
        <div className="grid grid-cols-2 gap-6">
          <ComboBox label="Department" options={OPTIONS_SHORT} disabled helperText="Helper text" />
          <ComboBox label="Department" options={OPTIONS_SHORT} defaultValue={['opt2', 'opt4']} disabled helperText="Helper text" />
        </div>
      </div>
    </div>
  ),
}
