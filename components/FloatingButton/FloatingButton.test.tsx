import { render, screen, fireEvent } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { FloatingButton } from './index'

expect.extend(toHaveNoViolations)

// ─── Helper ────────────────────────────────────────────────────────────────────
function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

// ─── Rendering ─────────────────────────────────────────────────────────────────
describe('FloatingButton — rendering', () => {
  it('renders with label', () => {
    render(<FloatingButton>New item</FloatingButton>)
    expect(screen.getByRole('button', { name: /new item/i })).toBeInTheDocument()
  })

  it('renders icon-only with aria-label', () => {
    render(<FloatingButton iconOnly aria-label="Add new item" />)
    expect(screen.getByRole('button', { name: 'Add new item' })).toBeInTheDocument()
  })

  it('hides label when iconOnly=true', () => {
    render(
      <FloatingButton iconOnly aria-label="Add">
        Should not appear
      </FloatingButton>
    )
    expect(screen.queryByText('Should not appear')).not.toBeInTheDocument()
  })

  it('renders default plus icon when no icon prop provided', () => {
    render(<FloatingButton aria-label="Add">New item</FloatingButton>)
    // icon is wrapped in an aria-hidden span — query by the button
    const btn = screen.getByRole('button')
    expect(btn.querySelector('svg')).toBeInTheDocument()
  })

  it('renders custom icon', () => {
    render(
      <FloatingButton icon={<PlusIcon />} aria-label="Add">
        Create
      </FloatingButton>
    )
    const btn = screen.getByRole('button')
    expect(btn.querySelector('svg')).toBeInTheDocument()
  })

  it('applies default data-testid', () => {
    render(<FloatingButton>New item</FloatingButton>)
    expect(screen.getByTestId('floating-button')).toBeInTheDocument()
  })

  it('applies custom data-testid', () => {
    render(<FloatingButton data-testid="fab-create">New item</FloatingButton>)
    expect(screen.getByTestId('fab-create')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null }
    render(<FloatingButton ref={ref}>New item</FloatingButton>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})

// ─── Interaction ───────────────────────────────────────────────────────────────
describe('FloatingButton — interaction', () => {
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<FloatingButton onClick={handleClick}>New item</FloatingButton>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(
      <FloatingButton disabled onClick={handleClick}>
        New item
      </FloatingButton>
    )
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('does not call onClick when loading', () => {
    const handleClick = vi.fn()
    render(
      <FloatingButton isLoading onClick={handleClick}>
        Creating…
      </FloatingButton>
    )
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})

// ─── Disabled state ────────────────────────────────────────────────────────────
describe('FloatingButton — disabled', () => {
  it('has disabled attribute when disabled=true', () => {
    render(<FloatingButton disabled>New item</FloatingButton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is not disabled by default', () => {
    render(<FloatingButton>New item</FloatingButton>)
    expect(screen.getByRole('button')).not.toBeDisabled()
  })
})

// ─── Loading state ─────────────────────────────────────────────────────────────
describe('FloatingButton — loading', () => {
  it('has disabled attribute when isLoading=true', () => {
    render(<FloatingButton isLoading>Creating…</FloatingButton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('sets aria-busy when loading', () => {
    render(<FloatingButton isLoading>Creating…</FloatingButton>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })

  it('does not set aria-busy when not loading', () => {
    render(<FloatingButton>New item</FloatingButton>)
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy')
  })

  it('shows spinner SVG when loading', () => {
    render(<FloatingButton isLoading>Creating…</FloatingButton>)
    const btn = screen.getByRole('button')
    expect(btn.querySelector('svg.animate-spin')).toBeInTheDocument()
  })
})

// ─── Sizes ─────────────────────────────────────────────────────────────────────
describe('FloatingButton — sizes', () => {
  it('renders large size', () => {
    render(<FloatingButton size="lg">New item</FloatingButton>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders medium size', () => {
    render(<FloatingButton size="md">New item</FloatingButton>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})

// ─── Icon-only ─────────────────────────────────────────────────────────────────
describe('FloatingButton — icon only', () => {
  it('renders large icon-only', () => {
    render(<FloatingButton size="lg" iconOnly aria-label="Add" />)
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  it('renders medium icon-only', () => {
    render(<FloatingButton size="md" iconOnly aria-label="Add" />)
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })
})

// ─── Accessibility ─────────────────────────────────────────────────────────────
describe('FloatingButton — accessibility', () => {
  it('has no a11y violations — large with label', async () => {
    const { container } = render(<FloatingButton size="lg">New item</FloatingButton>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no a11y violations — medium with label', async () => {
    const { container } = render(<FloatingButton size="md">New item</FloatingButton>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no a11y violations — large icon-only with aria-label', async () => {
    const { container } = render(
      <FloatingButton size="lg" iconOnly aria-label="Add new item" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no a11y violations — medium icon-only with aria-label', async () => {
    const { container } = render(
      <FloatingButton size="md" iconOnly aria-label="Add new item" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no a11y violations — disabled', async () => {
    const { container } = render(<FloatingButton disabled>New item</FloatingButton>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no a11y violations — loading', async () => {
    const { container } = render(<FloatingButton isLoading>Creating…</FloatingButton>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
