import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from '@/components/ui/text-field'

function HexagonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

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
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof TextField>

// ── Individual state stories ────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: 'Label',
    helperText: 'Helper text',
  },
}

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
  args: {
    label: 'Label',
    defaultValue: 'Input placeholder',
    helperText: 'Helper text',
  },
}

export const WithRightIcon: Story = {
  name: 'With Right Icon',
  args: {
    label: 'Password',
    helperText: 'Must be at least 8 characters',
    rightIcon: <EyeIcon />,
  },
}

export const FilledWithIcon: Story = {
  name: 'Filled — With right icon',
  args: {
    label: 'Category',
    defaultValue: 'Design system',
    rightIcon: <HexagonIcon />,
  },
}

// ── Error stories ───────────────────────────────────────────────────────────

export const ErrorEmpty: Story = {
  name: 'Error — Empty',
  args: {
    label: 'Label',
    error: true,
    helperText: 'Helper text',
  },
}

export const ErrorFilled: Story = {
  name: 'Error — Filled',
  args: {
    label: 'Label',
    defaultValue: 'Input placeholder',
    error: true,
    helperText: 'Helper text',
  },
}

// ── Disabled stories ────────────────────────────────────────────────────────

export const DisabledEmpty: Story = {
  name: 'Disabled — Empty',
  args: {
    label: 'Label',
    disabled: true,
    helperText: 'Helper text',
  },
}

export const DisabledFilled: Story = {
  name: 'Disabled — Filled',
  args: {
    label: 'Label',
    defaultValue: 'Input placeholder',
    disabled: true,
    helperText: 'Helper text',
  },
}

// ── All variants grid ───────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-10 p-8 w-[760px]">
      {/* Default type */}
      <div>
        <p className="mb-4 text-sm font-semibold text-[var(--content-secondary)]">
          Default — Empty
        </p>
        <div className="grid grid-cols-2 gap-6">
          <TextField label="Label" helperText="Helper text" />
          <TextField label="Label" />
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm font-semibold text-[var(--content-secondary)]">
          Default — Filled
        </p>
        <div className="grid grid-cols-2 gap-6">
          <TextField label="Label" defaultValue="Input placeholder" helperText="Helper text" />
          <TextField label="Label" defaultValue="Input placeholder" />
        </div>
      </div>

      {/* Error type */}
      <div>
        <p className="mb-4 text-sm font-semibold text-[var(--content-secondary)]">
          Error — Empty
        </p>
        <div className="grid grid-cols-2 gap-6">
          <TextField label="Label" error helperText="Helper text" />
          <TextField label="Label" error />
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm font-semibold text-[var(--content-secondary)]">
          Error — Filled
        </p>
        <div className="grid grid-cols-2 gap-6">
          <TextField label="Label" defaultValue="Input placeholder" error helperText="Helper text" />
          <TextField label="Label" defaultValue="Input placeholder" error />
        </div>
      </div>

      {/* Disabled */}
      <div>
        <p className="mb-4 text-sm font-semibold text-[var(--content-secondary)]">
          Disabled
        </p>
        <div className="grid grid-cols-2 gap-6">
          <TextField label="Label" disabled helperText="Helper text" />
          <TextField label="Label" defaultValue="Input placeholder" disabled helperText="Helper text" />
        </div>
      </div>

      {/* With icons */}
      <div>
        <p className="mb-4 text-sm font-semibold text-[var(--content-secondary)]">
          With Right Icon
        </p>
        <div className="grid grid-cols-2 gap-6">
          <TextField label="Password" helperText="Must be 8+ characters" rightIcon={<EyeIcon />} />
          <TextField
            label="Password"
            defaultValue="my-secret"
            helperText="Must be 8+ characters"
            rightIcon={<EyeIcon />}
          />
        </div>
      </div>
    </div>
  ),
}
