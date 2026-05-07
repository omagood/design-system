import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'select-none whitespace-nowrap',
    'rounded-[var(--corner-radius-corner-medium)]',
    'font-semibold',
    'transition-colors duration-100',
    'focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-[var(--state-focus-ring)]',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--state-focus-offset)]',
    'disabled:pointer-events-none disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--action-primary)] text-[var(--action-primary-inverse)]',
          'hover:opacity-90 active:opacity-80',
        ],
        secondary: [
          'bg-transparent',
          'border border-[var(--border-outline)]',
          'text-[var(--content-primary)]',
          'hover:bg-[var(--state-hovered-secondary)]',
          'active:bg-[var(--state-pressed-secondary)]',
        ],
        ghost: [
          'bg-transparent',
          'text-[var(--content-primary)]',
          'underline underline-offset-2',
          'hover:bg-[var(--state-hovered-secondary)]',
          'active:bg-[var(--state-pressed-secondary)]',
        ],
        negative: [
          'bg-[var(--action-distructive)] text-white',
          'hover:opacity-90 active:opacity-80',
        ],
      },

      size: {
        lg: [
          'px-[var(--inset-component-inset-component-lg-x)]',
          'py-[var(--inset-component-inset-component-lg-y)]',
          'text-[length:var(--typography-size-label-large)]',
          'leading-[var(--typography-line-height-label-large)]',
          'gap-[var(--spacing-space-8px)]',
          '[&_svg]:size-5',
        ],
        md: [
          'px-[var(--inset-component-inset-component-md-x)]',
          'py-[var(--inset-component-inset-component-md-y)]',
          'text-[length:var(--typography-size-label-medium)]',
          'leading-[var(--typography-line-height-label-medium)]',
          'gap-[var(--spacing-space-8px)]',
          '[&_svg]:size-4',
        ],
        sm: [
          'px-[var(--inset-component-inset-component-sm-x)]',
          'py-[var(--inset-component-inset-component-sm-y)]',
          'text-[length:var(--typography-size-label-small)]',
          'leading-[var(--typography-line-height-label-small)]',
          'gap-[var(--spacing-space-4px)]',
          '[&_svg]:size-4',
        ],
        xs: [
          'px-[var(--spacing-space-8px)]',
          'py-[var(--spacing-space-4px)]',
          'text-[length:var(--typography-size-label-xsmall)]',
          'leading-[var(--typography-line-height-label-xsmall)]',
          'gap-[var(--spacing-space-4px)]',
          '[&_svg]:size-3',
        ],
      },

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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  'data-testid'?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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

export { Button, buttonVariants }
