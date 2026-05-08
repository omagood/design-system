import type { Meta, StoryObj } from '@storybook/react'
import { TextField, type TextFieldProps } from '@/components/ui/text-field'
import { Icon } from '@/components/ui/icon'
import { iconMap, iconArgType, resolveIcon } from './story-utils'

const meta: Meta<typeof TextField> = {
  title: 'UI/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-[330px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label:      { control: 'text' },
    helperText: { control: 'text' },
    error:      { control: 'boolean' },
    disabled:   { control: 'boolean' },
    // Hide raw ReactNode prop — replaced by rightIconName select below
    rightIcon:  { control: false, table: { disable: true } },
  },
}

export default meta

type TextFieldStoryArgs = TextFieldProps & { rightIconName?: string }
type Story = StoryObj<TextFieldStoryArgs>

// ── Playground ─────────────────────────────────────────────────────────────────
export const Playground: Story = {
  argTypes: {
    rightIconName: { ...iconArgType, description: 'Right icon' },
  },
  args: {
    label: 'Label',
    helperText: 'Helper text',
    rightIconName: '(none)',
  },
  render: ({ rightIconName, ...args }) => (
    <TextField {...args} rightIcon={resolveIcon(rightIconName)} />
  ),
}

// ── Individual state stories ────────────────────────────────────────────────────
export const Empty: Story = {
  name: 'Empty (Default)',
  args: { label: 'Label' },
}

export const EmptyWithHelper: Story = {
  name: 'Empty — With helper text',
  args: { label: 'Label', helperText: 'Helper text' },
}

export const Filled: Story = {
  name: 'Filled',
  args: { label: 'Label', defaultValue: 'Input placeholder' },
}

export const FilledWithHelper: Story = {
  name: 'Filled — With helper text',
  args: { label: 'Label', defaultValue: 'Input placeholder', helperText: 'Helper text' },
}

export const WithRightIcon: Story = {
  name: 'With Right Icon',
  args: {
    label: 'Password',
    helperText: 'Must be at least 8 characters',
    rightIcon: <Icon icon={iconMap['ViewIcon']} />,
  },
}

export const FilledWithIcon: Story = {
  name: 'Filled — With right icon',
  args: {
    label: 'Search',
    defaultValue: 'Design system',
    rightIcon: <Icon icon={iconMap['Search01Icon']} />,
  },
}

// ── Error ───────────────────────────────────────────────────────────────────────
export const ErrorEmpty: Story = {
  name: 'Error — Empty',
  args: { label: 'Label', error: true, helperText: 'Helper text' },
}

export const ErrorFilled: Story = {
  name: 'Error — Filled',
  args: { label: 'Label', defaultValue: 'Input placeholder', error: true, helperText: 'Helper text' },
}

// ── Disabled ────────────────────────────────────────────────────────────────────
export const DisabledEmpty: Story = {
  name: 'Disabled — Empty',
  args: { label: 'Label', disabled: true, helperText: 'Helper text' },
}

export const DisabledFilled: Story = {
  name: 'Disabled — Filled',
  args: { label: 'Label', defaultValue: 'Input placeholder', disabled: true, helperText: 'Helper text' },
}

// ── All variants grid ───────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-10 p-8 w-[760px]">
      <div>
        <p className="mb-4 text-sm [font-weight:var(--typography-weight-label)] text-[color:var(--content-secondary)]">Default — Empty</p>
        <div className="grid grid-cols-2 gap-6">
          <TextField label="Label" helperText="Helper text" />
          <TextField label="Label" />
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm [font-weight:var(--typography-weight-label)] text-[color:var(--content-secondary)]">Default — Filled</p>
        <div className="grid grid-cols-2 gap-6">
          <TextField label="Label" defaultValue="Input placeholder" helperText="Helper text" />
          <TextField label="Label" defaultValue="Input placeholder" />
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm [font-weight:var(--typography-weight-label)] text-[color:var(--content-secondary)]">Error — Empty</p>
        <div className="grid grid-cols-2 gap-6">
          <TextField label="Label" error helperText="Helper text" />
          <TextField label="Label" error />
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm [font-weight:var(--typography-weight-label)] text-[color:var(--content-secondary)]">Error — Filled</p>
        <div className="grid grid-cols-2 gap-6">
          <TextField label="Label" defaultValue="Input placeholder" error helperText="Helper text" />
          <TextField label="Label" defaultValue="Input placeholder" error />
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm [font-weight:var(--typography-weight-label)] text-[color:var(--content-secondary)]">Disabled</p>
        <div className="grid grid-cols-2 gap-6">
          <TextField label="Label" disabled helperText="Helper text" />
          <TextField label="Label" defaultValue="Input placeholder" disabled helperText="Helper text" />
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm [font-weight:var(--typography-weight-label)] text-[color:var(--content-secondary)]">With Right Icon</p>
        <div className="grid grid-cols-2 gap-6">
          <TextField label="Password" helperText="Must be 8+ characters" rightIcon={<Icon icon={iconMap['ViewIcon']} />} />
          <TextField label="Password" defaultValue="my-secret" helperText="Must be 8+ characters" rightIcon={<Icon icon={iconMap['ViewIcon']} />} />
        </div>
      </div>
    </div>
  ),
}
