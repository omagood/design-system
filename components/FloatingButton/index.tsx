import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ─── Variants ─────────────────────────────────────────────────────────────────
// All values reference CSS variables from the token system — no hardcoded values.
// Token source: tokens/transformed/css/variables.css
//
// Shadow tokens used:
//   elevation-small (default/disabled):
//     0 1px 3px var(--shadow-shadow-soft), 0 3px 6px var(--shadow-shadow-strong)
//   elevation-medium (hover/active):
//     0 1px 8px var(--shadow-shadow-soft), 0 4px 10px var(--shadow-shadow-strong)
//
// ⚠ Token gaps flagged to Design System Lead:
//   1. --typography-weight-label resolves to "600px" — using font-semibold workaround
//   2. Hover overlay uses opacity reduction (hover:opacity-90) to approximate
//      --state-hovered-primary (rgba white overlay), same as Button

const SHADOW_SMALL =
  '0px_1px_3px_var(--shadow-shadow-soft),0px_3px_6px_var(--shadow-shadow-strong)'
const SHADOW_MEDIUM =
  '0px_1px_8px_var(--shadow-shadow-soft),0px_4px_10px_var(--shadow-shadow-strong)'

const floatingButtonVariants = cva(
  [
    // Layout
    'inline-flex items-center justify-center',
    'select-none whitespace-nowrap',
    // Shape — full pill
    'rounded-[var(--corner-radius-corner-full)]',
    // Colour — always primary fill, inverse text
    'bg-[var(--action-primary)] text-[var(--action-primary-inverse)]',
    // Typography
    'font-semibold',
    // Transition — colours + shadow
    'transition-[colors,box-shadow,opacity] duration-150',
    // Shadow — elevation-small at rest
    `shadow-[${SHADOW_SMALL}]`,
    // Hover / active
    `hover:opacity-90 hover:shadow-[${SHADOW_MEDIUM}]`,
    `active:opacity-80 active:shadow-[${SHADOW_MEDIUM}]`,
    // Focus ring
    'focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-[var(--state-focus-ring)]',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--state-focus-offset)]',
    // Disabled
    'disabled:pointer-events-none disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        // ── Large ──────────────────────────────────────────────────────────────
        // With label: px=24, py=16, Label M text, gap=8
        // Icon-only : p=16 (uniform, applied via compound variant below)
        lg: [
          'px-[var(--inset-component-inset-component-lg-x)]',
          'py-[var(--inset-component-inset-component-lg-y)]',
          'text-[length:var(--typography-size-label-medium)]',
          'leading-[var(--typography-line-height-label-medium)]',
          'gap-[var(--spacing-space-8px)]',
          '[&_svg]:size-6',
        ],
        // ── Medium ─────────────────────────────────────────────────────────────
        // With label: px=16, py=12, Label M text, gap=8
        // Icon-only : p=12 (uniform, applied via compound variant below)
        md: [
          'px-[var(--inset-component-inset-component-md-x)]',
          'py-[var(--inset-component-inset-component-md-y)]',
          'text-[length:var(--typography-size-label-medium)]',
          'leading-[var(--typography-line-height-label-medium)]',
          'gap-[var(--spacing-space-8px)]',
          '[&_svg]:size-5',
        ],
      },

      // Applied when iconOnly=true — overrides padding to uniform square inset
      iconOnly: {
        // Default (label visible): no override needed — size variant handles it
        false: [],
        // Icon-only: uniform padding, aspect-ratio square so it becomes a circle
        true: [],
      },

      // Applied when disabled OR isLoading
      isDisabled: {
        true: [
          '!bg-[var(--action-disabled)]',
          '!text-[var(--content-disabled)]',
          '!opacity-100',
          `!shadow-[${SHADOW_SMALL}]`,
        ],
      },
    },

    // Compound variants: icon-only overrides padding per size
    compoundVariants: [
      {
        size: 'lg',
        iconOnly: true,
        className: [
          '!p-[var(--inset-component-inset-component-lg-y)]',
          'aspect-square',
        ],
      },
      {
        size: 'md',
        iconOnly: true,
        className: [
          '!p-[var(--inset-component-inset-component-md-y)]',
          'aspect-square',
        ],
      },
    ],

    defaultVariants: { size: 'lg', iconOnly: false },
  }
)

// ─── Default Icon (Plus) ───────────────────────────────────────────────────────
function PlusIcon() {
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
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

// ─── Props ─────────────────────────────────────────────────────────────────────
export interface FloatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof floatingButtonVariants>, 'isDisabled'> {
  /**
   * Icon rendered inside the button.
   * Defaults to the plus (+) icon from Figma when omitted.
   */
  icon?: React.ReactNode
  /** Show loading spinner and block interaction. Sets aria-busy. */
  isLoading?: boolean
  'data-testid'?: string
}

// ─── Component ─────────────────────────────────────────────────────────────────
export const FloatingButton = forwardRef<HTMLButtonElement, FloatingButtonProps>(
  (
    {
      className,
      size,
      iconOnly = false,
      icon,
      isLoading = false,
      disabled,
      children,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading
    const resolvedIcon = icon ?? <PlusIcon />

    return (
      <button
        ref={ref}
        className={cn(
          floatingButtonVariants({
            size,
            iconOnly: iconOnly || undefined,
            isDisabled: isDisabled || undefined,
          }),
          className
        )}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        // When icon-only, the button needs an accessible label via aria-label
        // (caller is responsible for providing one via ...props)
        data-testid={testId ?? 'floating-button'}
        {...props}
      >
        {isLoading ? (
          // Spinner — same pattern as Button
          <svg
            className="animate-spin"
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
          <span aria-hidden="true">{resolvedIcon}</span>
        )}

        {/* Label — hidden when icon-only, always visible otherwise (even when loading) */}
        {!iconOnly && children}
      </button>
    )
  }
)

FloatingButton.displayName = 'FloatingButton'
