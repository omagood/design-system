import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ─── Variants ─────────────────────────────────────────────────────────────────
// All values reference CSS variables from the token system — no hardcoded values.
// Token source: tokens/transformed/css/variables.css
//
// Shadow tokens (confirmed from Figma):
//   elevation-medium (default / hover / pressed):
//     0 1px 8px var(--shadow-shadow-soft), 0 4px 10px var(--shadow-shadow-strong)
//   elevation-small (disabled only):
//     0 1px 3px var(--shadow-shadow-soft), 0 3px 6px var(--shadow-shadow-strong)
//
// Multi-layer box-shadow with CSS vars requires [box-shadow:...] arbitrary property
// syntax — Tailwind's shadow-[...] utility cannot parse comma-separated layers.
//
// Hover/pressed overlay: Figma uses rgba(255,255,255,0.20) and rgba(255,255,255,0.32)
// layered on top via backgroundImage. Applied via inline style in the component.
//
// ⚠ Token gaps flagged to Design System Lead:
//   1. --typography-weight-label resolves to "600px" — using font-semibold workaround

// CSS var references for the two-layer shadows
const SHADOW_MEDIUM =
  '0px 1px var(--shadow-medium-shadow-medium-blur-1) 0px var(--shadow-shadow-soft),' +
  '0px var(--shadow-medium-shadow-y-l2-2) var(--shadow-medium-shadow-medium-blur-2) 0px var(--shadow-shadow-strong)'

const SHADOW_SMALL =
  '0px var(--shadow-small-shadow-small-y-1) var(--shadow-small-shadow-small-blur-1) 0px var(--shadow-shadow-soft),' +
  '0px var(--shadow-small-shadow-small-y-2) var(--shadow-small-shadow-small-blur-2) 0px var(--shadow-shadow-strong)'

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
    'transition-[box-shadow,opacity] duration-150',
    // Shadow — elevation-medium at rest (default/hover/pressed per Figma)
    `[box-shadow:${SHADOW_MEDIUM}]`,
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

      // Applied when disabled OR isLoading — drops to elevation-small per Figma
      isDisabled: {
        true: [
          '!bg-[var(--action-disabled)]',
          '!text-[var(--content-disabled)]',
          '!opacity-100',
          `![box-shadow:${SHADOW_SMALL}]`,
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
          // Hover/pressed overlay: Figma uses a white tint (20% hover, 32% pressed)
          // layered via background-image on top of --action-primary.
          // We apply it with group + CSS pseudo-classes on a sibling overlay layer.
          'group relative overflow-hidden',
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

        {/* Hover / pressed white overlay — matches Figma's rgba white tint layers */}
        {!isDisabled && (
          <span
            aria-hidden="true"
            className={[
              'absolute inset-0 rounded-[inherit] pointer-events-none',
              'opacity-0',
              'group-hover:opacity-100 group-hover:bg-white/20',
              'group-active:bg-white/30',
            ].join(' ')}
          />
        )}
      </button>
    )
  }
)

FloatingButton.displayName = 'FloatingButton'
