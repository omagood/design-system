import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './index'

// ── Meta ───────────────────────────────────────────────────────────────────────
const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The primary action trigger. Use `primary` for the single most important action on a page. ' +
          'Never show two `primary` buttons in the same view. ' +
          'Use `negative` only for destructive, irreversible actions (delete, remove, revoke).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'negative'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm', 'xs'],
      description: 'Size of the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading spinner and block interaction',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

// ── Playground ─────────────────────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
}

// ── Variants ───────────────────────────────────────────────────────────────────
export const Primary: Story = {
  args: { children: 'Save changes', variant: 'primary' },
}

export const Secondary: Story = {
  args: { children: 'Cancel', variant: 'secondary' },
}

export const Ghost: Story = {
  args: { children: 'Learn more', variant: 'ghost' },
}

export const Negative: Story = {
  args: { children: 'Delete account', variant: 'negative' },
}

// ── States ─────────────────────────────────────────────────────────────────────
export const Loading: Story = {
  args: { children: 'Saving…', variant: 'primary', isLoading: true },
}

export const Disabled: Story = {
  args: { children: 'Unavailable', variant: 'primary', disabled: true },
}

export const DisabledSecondary: Story = {
  name: 'Disabled (secondary)',
  args: { children: 'Unavailable', variant: 'secondary', disabled: true },
}

// ── Sizes ──────────────────────────────────────────────────────────────────────
export const SizeLarge: Story = {
  name: 'Size — Large',
  args: { children: 'Large button', variant: 'primary', size: 'lg' },
}

export const SizeMedium: Story = {
  name: 'Size — Medium',
  args: { children: 'Medium button', variant: 'primary', size: 'md' },
}

export const SizeSmall: Story = {
  name: 'Size — Small',
  args: { children: 'Small button', variant: 'primary', size: 'sm' },
}

export const SizeXSmall: Story = {
  name: 'Size — XSmall',
  args: { children: 'XS button', variant: 'primary', size: 'xs' },
}

// ── Icons ──────────────────────────────────────────────────────────────────────
const PlusIcon = () => (
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
    <path d="M12 5v14M5 12h14" />
  </svg>
)

const ArrowRightIcon = () => (
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
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export const WithLeftIcon: Story = {
  name: 'With left icon',
  args: {
    children: 'Add item',
    variant: 'primary',
    leftIcon: <PlusIcon />,
  },
}

export const WithRightIcon: Story = {
  name: 'With right icon',
  args: {
    children: 'Continue',
    variant: 'primary',
    rightIcon: <ArrowRightIcon />,
  },
}

export const WithBothIcons: Story = {
  name: 'With both icons',
  args: {
    children: 'Add and go',
    variant: 'primary',
    leftIcon: <PlusIcon />,
    rightIcon: <ArrowRightIcon />,
  },
}

// ── Showcase grids ─────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="negative">Negative</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="lg">Large</Button>
      <Button size="md">Medium</Button>
      <Button size="sm">Small</Button>
      <Button size="xs">XSmall</Button>
    </div>
  ),
}

export const AllVariantsAndStates: Story = {
  name: 'All variants × states',
  render: () => (
    <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(4, auto)' }}>
      {(['primary', 'secondary', 'ghost', 'negative'] as const).map((variant) => (
        <>
          <Button key={`${variant}-default`} variant={variant}>
            Default
          </Button>
          <Button key={`${variant}-loading`} variant={variant} isLoading>
            Loading
          </Button>
          <Button key={`${variant}-disabled`} variant={variant} disabled>
            Disabled
          </Button>
          <Button key={`${variant}-icon`} variant={variant} leftIcon={<PlusIcon />}>
            With icon
          </Button>
        </>
      ))}
    </div>
  ),
}
