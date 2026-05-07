import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Shadow utilities are defined in global.css as .shadow-elevation-medium / .shadow-elevation-small.
// Do NOT use template-literal [box-shadow:${...}] — Tailwind's scanner won't see dynamic
// class strings and will generate no CSS for them.

const floatingButtonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'select-none whitespace-nowrap',
    'rounded-[var(--corner-radius-corner-full)]',
    'bg-[var(--action-primary)] text-[var(--action-primary-inverse)]',
    '[font-family:var(--typography-font-family)]',
    '[font-weight:var(--typography-weight-label)]',
    // elevation-medium at rest — named utility so Tailwind generates the CSS
    'shadow-elevation-medium',
    'transition-shadow duration-150',
    'focus-visible:outline-none',
    'focus-visible:ring-[length:var(--focus-focus-ring-width)] focus-visible:ring-[var(--state-focus-ring)]',
    'focus-visible:ring-offset-[var(--focus-focus-ring-offset)]',
    'disabled:pointer-events-none disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        lg: [
          'px-[var(--inset-component-inset-component-lg-x)]',
          'py-[var(--inset-component-inset-component-lg-y)]',
          'text-[length:var(--typography-size-label-medium)]',
          'leading-[var(--typography-line-height-label-medium)]',
          'gap-[var(--spacing-space-8px)]',
          '[&_svg]:size-6',
        ],
        md: [
          'px-[var(--inset-component-inset-component-md-x)]',
          'py-[var(--inset-component-inset-component-md-y)]',
          'text-[length:var(--typography-size-label-medium)]',
          'leading-[var(--typography-line-height-label-medium)]',
          'gap-[var(--spacing-space-8px)]',
          '[&_svg]:size-5',
        ],
      },

      iconOnly: {
        false: [],
        true: [],
      },

      // Disabled drops to elevation-small per Figma spec
      isDisabled: {
        true: [
          '!bg-[var(--action-disabled)]',
          '!text-[var(--content-disabled)]',
          '!opacity-100',
          '!shadow-elevation-small',
        ],
      },
    },

    compoundVariants: [
      {
        size: 'lg',
        iconOnly: true,
        className: ['!p-[var(--inset-component-inset-component-lg-y)]', 'aspect-square'],
      },
      {
        size: 'md',
        iconOnly: true,
        className: ['!p-[var(--inset-component-inset-component-md-y)]', 'aspect-square'],
      },
    ],

    defaultVariants: { size: 'lg', iconOnly: false },
  }
)

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

export interface FloatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof floatingButtonVariants>, 'isDisabled'> {
  icon?: React.ReactNode
  isLoading?: boolean
  'data-testid'?: string
}

const FloatingButton = forwardRef<HTMLButtonElement, FloatingButtonProps>(
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
          // overflow-hidden clips the white hover overlay to the pill shape,
          // but does NOT clip box-shadow (box-shadow is rendered outside the border box)
          'group relative overflow-hidden',
          className
        )}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        data-testid={testId ?? 'floating-button'}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin"
            style={{ width: '1em', height: '1em' }}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <span aria-hidden="true">{resolvedIcon}</span>
        )}

        {!iconOnly && children}

        {/* Hover / pressed white overlay — matches Figma's rgba white tint */}
        {!isDisabled && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-[inherit] pointer-events-none bg-[var(--state-hover)] opacity-0 group-hover:opacity-100 group-active:bg-[var(--state-pressed)] transition-opacity duration-150"
          />
        )}
      </button>
    )
  }
)

FloatingButton.displayName = 'FloatingButton'

export { FloatingButton, floatingButtonVariants }
