import type { Meta, StoryObj } from '@storybook/react'
import { FloatingButton, type FloatingButtonProps } from '@/components/ui/floating-button'
import { Icon } from '@/components/ui/icon'
import { iconMap, iconArgType, resolveIcon } from './story-utils'

const meta: Meta<typeof FloatingButton> = {
  title: 'UI/FloatingButton',
  component: FloatingButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size:      { control: 'radio', options: ['lg', 'md'] },
    iconOnly:  { control: 'boolean' },
    isLoading: { control: 'boolean' },
    disabled:  { control: 'boolean' },
    children:  { control: 'text' },
    // Hide raw ReactNode icon prop — replaced by iconName select below
    icon: { control: false, table: { disable: true } },
  },
}

export default meta

// ── Custom args type ───────────────────────────────────────────────────────────
type FABStoryArgs = FloatingButtonProps & { iconName?: string }
type Story = StoryObj<FABStoryArgs>

// ── Playground ─────────────────────────────────────────────────────────────────
export const Playground: Story = {
  argTypes: {
    iconName: { ...iconArgType, description: 'Button icon' },
  },
  args: { children: 'New item', size: 'lg', iconOnly: false, iconName: '(none)' },
  render: ({ iconName, ...args }) => (
    <FloatingButton {...args} icon={resolveIcon(iconName)} />
  ),
}

// ── Sizes + label ──────────────────────────────────────────────────────────────
export const LargeWithLabel: Story = {
  name: 'Large — With Label',
  args: { size: 'lg', children: 'New item' },
}

export const MediumWithLabel: Story = {
  name: 'Medium — With Label',
  args: { size: 'md', children: 'New item' },
}

// ── Icon only ─────────────────────────────────────────────────────────────────
export const LargeIconOnly: Story = {
  name: 'Large — Icon Only',
  args: { size: 'lg', iconOnly: true, 'aria-label': 'Add new item' },
}

export const MediumIconOnly: Story = {
  name: 'Medium — Icon Only',
  args: { size: 'md', iconOnly: true, 'aria-label': 'Add new item' },
}

// ── Custom icons ───────────────────────────────────────────────────────────────
export const WithEditIcon: Story = {
  name: 'Custom Icon — Edit',
  args: { size: 'lg', icon: <Icon icon={iconMap['PencilEdit01Icon']} />, children: 'Edit' },
}

export const WithShareIcon: Story = {
  name: 'Custom Icon — Share (icon only)',
  args: { size: 'lg', iconOnly: true, icon: <Icon icon={iconMap['Share01Icon']} />, 'aria-label': 'Share' },
}

// ── States ─────────────────────────────────────────────────────────────────────
export const Loading: Story = {
  args: { size: 'lg', isLoading: true, children: 'Creating…' },
}

export const LoadingIconOnly: Story = {
  name: 'Loading — Icon Only',
  args: { size: 'lg', iconOnly: true, isLoading: true, 'aria-label': 'Creating' },
}

export const Disabled: Story = {
  args: { size: 'lg', disabled: true, children: 'New item' },
}

export const DisabledIconOnly: Story = {
  name: 'Disabled — Icon Only',
  args: { size: 'lg', iconOnly: true, disabled: true, 'aria-label': 'Add new item' },
}

// ── Showcase ───────────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <p className="mb-3 text-sm [font-weight:var(--typography-weight-label)] text-[color:var(--content-secondary)]">With Label</p>
        <div className="flex items-center gap-4 flex-wrap">
          <FloatingButton size="lg">New item</FloatingButton>
          <FloatingButton size="md">New item</FloatingButton>
          <FloatingButton size="lg" disabled>New item</FloatingButton>
          <FloatingButton size="md" disabled>New item</FloatingButton>
          <FloatingButton size="lg" isLoading>New item</FloatingButton>
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm [font-weight:var(--typography-weight-label)] text-[color:var(--content-secondary)]">Icon Only</p>
        <div className="flex items-center gap-4 flex-wrap">
          <FloatingButton size="lg" iconOnly aria-label="Add" />
          <FloatingButton size="md" iconOnly aria-label="Add" />
          <FloatingButton size="lg" iconOnly disabled aria-label="Add" />
          <FloatingButton size="md" iconOnly disabled aria-label="Add" />
          <FloatingButton size="lg" iconOnly isLoading aria-label="Adding" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm [font-weight:var(--typography-weight-label)] text-[color:var(--content-secondary)]">Custom Icons</p>
        <div className="flex items-center gap-4 flex-wrap">
          <FloatingButton size="lg" icon={<Icon icon={iconMap['PencilEdit01Icon']} />}>Edit</FloatingButton>
          <FloatingButton size="md" icon={<Icon icon={iconMap['PencilEdit01Icon']} />}>Edit</FloatingButton>
          <FloatingButton size="lg" iconOnly icon={<Icon icon={iconMap['Share01Icon']} />} aria-label="Share" />
          <FloatingButton size="md" iconOnly icon={<Icon icon={iconMap['PencilEdit01Icon']} />} aria-label="Edit" />
        </div>
      </div>
    </div>
  ),
}
