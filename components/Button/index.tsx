import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ─── Variants ─────────────────────────────────────────────────────────────────
// All values reference CSS variables from the token system — no hardcoded values.
// Token source: tokens/transformed/css/variables.css
//
// ⚠ Token gaps flagged to Design System Lead:
//   1. No inset-component-xs-* token — XS size uses --spacing-space-8px / --spacing-space-4px
//   2. --typography-weight-label resolves to "600px" (Style Dictionary adds px to number types)
//      → using Tailwind's font-semibold (600) as workaround until token type is corrected
//   3. Hover overlay on primary/negative uses rgba white overlay (--state-hovered-primary).
//      Implemented via opacity reduction (hover:opacity-90) matching the visual intent.
//      A color-mix() approach can replace this once browser baseline is confirmed.

const buttonVariants = cva(
  [
    // Layout
    'inline-flex items-center justify-center',
    'select-none whitespace-nowrap',
    // Shape
    'rounded-[var(--corner-radius-corner-medium)]',
    // Typography — weight uses font-semibold because --typography-weight-label: 600px is invalid for font-weight
    'font-semibold',
    // Transition
    'transition-colors duration-100',
    // Focus ring — always visible, never suppressed (WCAG 2.4.7 / 2.4.11)
    'focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-[var(--state-focus-ring)]',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--state-focus-offset)]',
    // Disabled
    'disabled:pointer-events-none disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        // ── Primary: near-black fill, light text ──────────────────────────────
        primary: [
          'bg-[var(--action-primary)] text-[var(--action-primary-inverse)]',
          // Hover/active: white overlay approximated via opacity (--state-hovered-primary = rgba(255,255,255,0.20))
          'hover:opacity-90 active:opacity-80',
        ],
        // ── Secondary: outlined, transparent fill ─────────────────────────────
        secondary: [
          'bg-transparent',
          'border border-[var(--border-outline)]',
          'text-[var(--content-primary)]',
          'hover:bg-[var(--state-hovered-secondary)]',
          'active:bg-[var(--state-pressed-secondary)]',
        ],
        // ── Ghost: underline is the shape, background on hover/active ────────
        ghost: [
          'bg-transparent',
          'text-[var(--content-primary)]',
          'underline underline-offset-2',
          'hover:bg-[var(--state-hovered-secondary)]',
          'active:bg-[var(--state-pressed-secondary)]',
        ],
        // ── Negative/Destructive: red fill, white text ────────────────────────
        negative: [
          // --action-distructive is the Figma token name (typo preserved intentionally)
          'bg-[var(--action-distructive)] text-white',
          // Same overlay approach as primary
          'hover:opacity-90 active:opacity-80',
        ],
      },

      size: {
        // ── Large — Label L: 18px/24px, px=24px, py=16px ─────────────────────
        lg: [
          'px-[var(--inset-component-inset-component-lg-x)]',
          'py-[var(--inset-component-inset-component-lg-y)]',
          'text-[length:var(--typography-size-label-large)]',
          'leading-[var(--typography-line-height-label-large)]',
          'gap-[var(--spacing-space-8px)]',
          '[&_svg]:size-5',
        ],
        // ── Medium — Label M: 16px/24px, px=16px, py=12px ────────────────────
        md: [
          'px-[var(--inset-component-inset-component-md-x)]',
          'py-[var(--inset-component-inset-component-md-y)]',
          'text-[length:var(--typography-size-label-medium)]',
          'leading-[var(--typography-line-height-label-medium)]',
          'gap-[var(--spacing-space-8px)]',
          '[&_svg]:size-4',
        ],
        // ── Small — Label S: 14px/20px, px=12px, py=8px ─────────────────────
        sm: [
          'px-[var(--inset-component-inset-component-sm-x)]',
          'py-[var(--inset-component-inset-component-sm-y)]',
          'text-[length:var(--typography-size-label-small)]',
          'leading-[var(--typography-line-height-label-small)]',
          'gap-[var(--spacing-space-4px)]',
          '[&_svg]:size-4',
        ],
        // ── XS — Label XS: 12px/16px, px=8px, py=4px ────────────────────────
        // ⚠ No inset-component-xs token — using primitive --spacing-space-* tokens
        xs: [
          'px-[var(--spacing-space-8px)]',
          'py-[var(--spacing-space-4px)]',
          'text-[length:var(--typography-size-label-xsmall)]',
          'leading-[var(--typography-line-height-label-xsmall)]',
          'gap-[var(--spacing-space-4px)]',
          '[&_svg]:size-3',
        ],
      },

      // Applied when disabled OR isLoading — overrides variant colours
      isDisabled: {
        true: [
          '!bg-[var(--action-disabled)]',
          '!text-[var(--content-disabled)]',
          '!border-transparent',
          '!opacity-100',
        ],
      },
    },

    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

// ─── Props ─────────────────────────────────────────────────────────────────────
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show loading spinner and block interaction. Sets aria-busy. */
  isLoading?: boolean
  /** Icon rendered before the label */
  leftIcon?: React.ReactNode
  /** Icon rendered after the label */
  rightIcon?: React.ReactNode
  'data-testid'?: string
}

// ─── Component ─────────────────────────────────────────────────────────────────
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, isDisabled: isDisabled || undefined }),
          className
        )}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        data-testid={props['data-testid'] ?? 'button'}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin [&_svg]:size-[1em]"
            style={{ width: '1em', height: '1em' }}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          leftIcon && <span aria-hidden="true">{leftIcon}</span>
        )}

        {children}

        {!isLoading && rightIcon && (
          <span aria-hidden="true">{rightIcon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
