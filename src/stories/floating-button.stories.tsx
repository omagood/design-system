import type { Meta, StoryObj } from '@storybook/react'
import { FloatingButton } from '@/components/ui/floating-button'

function PencilIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="1em" height="1em">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="1em" height="1em">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

const meta: Meta<typeof FloatingButton> = {
  title: 'UI/FloatingButton',
  component: FloatingButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['lg', 'md'] },
    iconOnly: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof FloatingButton>

export const Playground: Story = {
  args: { children: 'New item', size: 'lg', iconOnly: false },
}

export const LargeWithLabel: Story = {
  name: 'Large — With Label',
  args: { size: 'lg', children: 'New item' },
}

export const MediumWithLabel: Story = {
  name: 'Medium — With Label',
  args: { size: 'md', children: 'New item' },
}

export const LargeIconOnly: Story = {
  name: 'Large — Icon Only',
  args: { size: 'lg', iconOnly: true, 'aria-label': 'Add new item' },
}

export const MediumIconOnly: Story = {
  name: 'Medium — Icon Only',
  args: { size: 'md', iconOnly: true, 'aria-label': 'Add new item' },
}

export const WithCustomIcon: Story = {
  name: 'Custom Icon — Edit',
  args: { size: 'lg', icon: <PencilIcon />, children: 'Edit' },
}

export const WithShareIcon: Story = {
  name: 'Custom Icon — Share (icon only)',
  args: { size: 'lg', iconOnly: true, icon: <ShareIcon />, 'aria-label': 'Share' },
}

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

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <p className="mb-3 text-sm font-semibold text-[var(--content-secondary)]">With Label</p>
        <div className="flex items-center gap-4 flex-wrap">
          <FloatingButton size="lg">New item</FloatingButton>
          <FloatingButton size="md">New item</FloatingButton>
          <FloatingButton size="lg" disabled>New item</FloatingButton>
          <FloatingButton size="md" disabled>New item</FloatingButton>
          <FloatingButton size="lg" isLoading>New item</FloatingButton>
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-[var(--content-secondary)]">Icon Only</p>
        <div className="flex items-center gap-4 flex-wrap">
          <FloatingButton size="lg" iconOnly aria-label="Add" />
          <FloatingButton size="md" iconOnly aria-label="Add" />
          <FloatingButton size="lg" iconOnly disabled aria-label="Add" />
          <FloatingButton size="md" iconOnly disabled aria-label="Add" />
          <FloatingButton size="lg" iconOnly isLoading aria-label="Adding" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-[var(--content-secondary)]">Custom Icons</p>
        <div className="flex items-center gap-4 flex-wrap">
          <FloatingButton size="lg" icon={<PencilIcon />}>Edit</FloatingButton>
          <FloatingButton size="md" icon={<PencilIcon />}>Edit</FloatingButton>
          <FloatingButton size="lg" iconOnly icon={<ShareIcon />} aria-label="Share" />
          <FloatingButton size="md" iconOnly icon={<PencilIcon />} aria-label="Edit" />
        </div>
      </div>
    </div>
  ),
}
