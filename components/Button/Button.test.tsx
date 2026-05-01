import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from './index'

expect.extend(toHaveNoViolations)

describe('Button', () => {
  // ── Rendering ────────────────────────────────────────────────────────────────
  describe('rendering', () => {
    it('renders children', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('renders with default data-testid', () => {
      render(<Button>Click</Button>)
      expect(screen.getByTestId('button')).toBeInTheDocument()
    })

    it('renders with custom data-testid', () => {
      render(<Button data-testid="submit-btn">Submit</Button>)
      expect(screen.getByTestId('submit-btn')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<Button className="custom-class">Click</Button>)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })

    it('renders leftIcon when provided', () => {
      render(<Button leftIcon={<svg data-testid="left-icon" />}>Click</Button>)
      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    })

    it('renders rightIcon when provided', () => {
      render(<Button rightIcon={<svg data-testid="right-icon" />}>Click</Button>)
      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    })

    it('does not render leftIcon when loading', () => {
      render(
        <Button isLoading leftIcon={<svg data-testid="left-icon" />}>
          Click
        </Button>
      )
      expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument()
    })

    it('does not render rightIcon when loading', () => {
      render(
        <Button isLoading rightIcon={<svg data-testid="right-icon" />}>
          Click
        </Button>
      )
      expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument()
    })

    it('forwards ref to the button element', () => {
      const ref = { current: null }
      render(<Button ref={ref}>Click</Button>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  // ── Interaction ───────────────────────────────────────────────────────────────
  describe('interaction', () => {
    it('calls onClick when clicked', async () => {
      const onClick = vi.fn()
      render(<Button onClick={onClick}>Click</Button>)
      await userEvent.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledOnce()
    })

    it('activates with Enter key', async () => {
      const onClick = vi.fn()
      render(<Button onClick={onClick}>Click</Button>)
      screen.getByRole('button').focus()
      await userEvent.keyboard('{Enter}')
      expect(onClick).toHaveBeenCalledOnce()
    })

    it('activates with Space key', async () => {
      const onClick = vi.fn()
      render(<Button onClick={onClick}>Click</Button>)
      screen.getByRole('button').focus()
      await userEvent.keyboard(' ')
      expect(onClick).toHaveBeenCalledOnce()
    })

    it('is keyboard-focusable', async () => {
      render(<Button>Click</Button>)
      await userEvent.tab()
      expect(screen.getByRole('button')).toHaveFocus()
    })
  })

  // ── Disabled state ─────────────────────────────────────────────────────────────
  describe('disabled', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Click</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('does not call onClick when disabled', async () => {
      const onClick = vi.fn()
      render(<Button disabled onClick={onClick}>Click</Button>)
      await userEvent.click(screen.getByRole('button'))
      expect(onClick).not.toHaveBeenCalled()
    })

    it('is not keyboard-activatable when disabled', async () => {
      const onClick = vi.fn()
      render(<Button disabled onClick={onClick}>Click</Button>)
      screen.getByRole('button').focus()
      await userEvent.keyboard('{Enter}')
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  // ── Loading state ──────────────────────────────────────────────────────────────
  describe('loading', () => {
    it('sets aria-busy when isLoading', () => {
      render(<Button isLoading>Save</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('is disabled when isLoading', () => {
      render(<Button isLoading>Save</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('does not call onClick when loading', async () => {
      const onClick = vi.fn()
      render(<Button isLoading onClick={onClick}>Save</Button>)
      await userEvent.click(screen.getByRole('button'))
      expect(onClick).not.toHaveBeenCalled()
    })

    it('does not have aria-busy when not loading', () => {
      render(<Button>Save</Button>)
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy')
    })
  })

  // ── Variants ───────────────────────────────────────────────────────────────────
  describe('variants', () => {
    const variants = ['primary', 'secondary', 'ghost', 'negative'] as const

    variants.forEach((variant) => {
      it(`renders ${variant} variant without throwing`, () => {
        expect(() =>
          render(<Button variant={variant}>{variant}</Button>)
        ).not.toThrow()
      })
    })
  })

  // ── Sizes ──────────────────────────────────────────────────────────────────────
  describe('sizes', () => {
    const sizes = ['lg', 'md', 'sm', 'xs'] as const

    sizes.forEach((size) => {
      it(`renders ${size} size without throwing`, () => {
        expect(() =>
          render(<Button size={size}>{size}</Button>)
        ).not.toThrow()
      })
    })
  })

  // ── Accessibility ──────────────────────────────────────────────────────────────
  describe('accessibility', () => {
    it('primary variant has no violations', async () => {
      const { container } = render(<Button variant="primary">Save</Button>)
      expect(await axe(container)).toHaveNoViolations()
    })

    it('secondary variant has no violations', async () => {
      const { container } = render(<Button variant="secondary">Cancel</Button>)
      expect(await axe(container)).toHaveNoViolations()
    })

    it('ghost variant has no violations', async () => {
      const { container } = render(<Button variant="ghost">Learn more</Button>)
      expect(await axe(container)).toHaveNoViolations()
    })

    it('negative variant has no violations', async () => {
      const { container } = render(<Button variant="negative">Delete</Button>)
      expect(await axe(container)).toHaveNoViolations()
    })

    it('disabled state has no violations', async () => {
      const { container } = render(<Button disabled>Unavailable</Button>)
      expect(await axe(container)).toHaveNoViolations()
    })

    it('loading state has no violations', async () => {
      const { container } = render(<Button isLoading>Saving</Button>)
      expect(await axe(container)).toHaveNoViolations()
    })

    it('with icons has no violations', async () => {
      const { container } = render(
        <Button
          leftIcon={<svg aria-hidden="true" />}
          rightIcon={<svg aria-hidden="true" />}
        >
          With icons
        </Button>
      )
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
