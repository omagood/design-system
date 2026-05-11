import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Add01Icon, Loading03Icon } from '@hugeicons/core-free-icons'
import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/utils'

// Shadow utilities are defined in global.css as .shadow-elevation-medium / .shadow-elevation-small.
// Do NOT use template-literal [box-shadow:${...}] — Tailwind's scanner won't see dynamic
// class strings and will generate no CSS for them.

const floatingButtonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'select-none whitespace-nowrap',
    'rounded-[var(--corner-radius-full)]',
    'bg-[var(--action-primary)] text-[var(--action-primary-inverse)]',
    '[font-family:var(--typography-font-family)]',
    '[font-weight:var(--typography-weight-label)]',
    // elevation-medium at rest — named utility so Tailwind generates the CSS
    'shadow-elevation-medium',
    'transition-shadow duration-150',
    'focus-visible:outline-none',
    'focus-visible:ring-[length:var(--focus-ring-width)] focus-visible:ring-[var(--state-focus-ring)]',
    'focus-visible:ring-offset-[var(--focus-ring-offset)]',
    'disabled:pointer-events-none disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        lg: [
          'px-[var(--inset-component-lg-x)]',
          'py-[var(--inset-component-lg-y)]',
          'text-[length:var(--typography-size-label-medium)]',
          'leading-[var(--typography-line-height-label-medium)]',
          'gap-[var(--spacing-space-8px)]',
          '[&_svg]:size-6',
        ],
        md: [
          'px-[var(--inset-component-md-x)]',
          'py-[var(--inset-component-md-y)]',
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
        className: ['!p-[var(--inset-component-lg-y)]', 'aspect-square'],
      },
      {
        size: 'md',
        iconOnly: true,
        className: ['!p-[var(--inset-component-md-y)]', 'aspect-square'],
      },
    ],

    defaultVariants: { size: 'lg', iconOnly: false },
  }
)


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
    const resolvedIcon = icon ?? <Icon icon={Add01Icon} />

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
          <Icon icon={Loading03Icon} className="animate-spin" style={{ width: '1em', height: '1em' }} />
        ) : (
          <span aria-hidden="true">{resolvedIcon}</span>
        )}

        {!iconOnly && children}

        {/* Hover / pressed white overlay — matches Figma's rgba white tint */}
        {!isDisabled && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-[inherit] pointer-events-none bg-[var(--state-hover-overlay)] opacity-0 group-hover:opacity-100 group-active:bg-[var(--state-pressed-overlay)] transition-opacity duration-150"
          />
        )}
      </button>
    )
  }
)

FloatingButton.displayName = 'FloatingButton'

export { FloatingButton, floatingButtonVariants }
