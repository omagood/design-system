import { forwardRef, useId, useState } from 'react'
import { cn } from '@/lib/utils'

// Alert-circle icon used in helper text
function AlertCircleIcon({ className }: { className?: string }) {
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
      width={16}
      height={16}
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Floating label / placeholder text */
  label?: string
  /** Helper text shown below the field */
  helperText?: string
  /** Puts the field in error state (red border + error-coloured helper text) */
  error?: boolean
  /** Icon node rendered on the right side of the input */
  rightIcon?: React.ReactNode
  'data-testid'?: string
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      label = 'Label',
      helperText,
      error = false,
      rightIcon,
      disabled,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      'data-testid': testId,
      id: idProp,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = idProp ?? generatedId

    const [focused, setFocused] = useState(false)
    const [internalValue, setInternalValue] = useState<string>(
      defaultValue != null ? String(defaultValue) : ''
    )

    const isControlled = value !== undefined
    const currentValue = isControlled ? String(value ?? '') : internalValue
    const hasValue = currentValue.length > 0

    // Label floats up when the field is focused or has a value
    const labelFloated = focused || hasValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value)
      onChange?.(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false)
      onBlur?.(e)
    }

    // ── Border ──────────────────────────────────────────────────────────────
    // Named utilities defined in global.css — Tailwind v4's scanner doesn't
    // reliably generate `border-2` from conditional ternary strings.
    const borderClass = error
      ? 'field-border-error'
      : disabled
      ? 'field-border-disabled'
      : focused
      ? 'field-border-focus'
      : hasValue
      ? 'field-border-filled'
      : 'field-border-default'

    // ── Background ──────────────────────────────────────────────────────────
    const bgClass = disabled
      ? 'bg-[var(--surface-disabled)]'
      : 'bg-[var(--surface-tertiary)]'

    // ── Label background strip (cuts through the border when floated) ───────
    const labelBgClass = disabled
      ? 'bg-[var(--surface-disabled)]'
      : 'bg-[var(--surface-tertiary)]'

    // ── Vertical padding shrinks when the label is floating ──────────────────
    // (label is absolutely positioned above the box, so the content area height stays stable)
    const pyClass = labelFloated
      ? 'py-[var(--inset-component-inset-component-sm-y)]'
      : 'py-[var(--inset-component-inset-component-md-y)]'

    return (
      <div className={cn('flex flex-col gap-[4px] w-full', className)}>
        {/* ── Input box ───────────────────────────────────────────────────── */}
        <div
          className={cn(
            'group relative flex items-center w-full',
            'rounded-[var(--corner-radius-corner-medium)]',
            'px-[var(--inset-component-inset-component-md-x)]',
            pyClass,
            bgClass,
            borderClass,
            'transition-[padding,border-width,border-color] duration-150',
            disabled && 'cursor-not-allowed',
          )}
        >
          {/* Hover overlay — white 20% tint (matches Figma hover layer) */}
          {!disabled && !focused && (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:bg-white/20 group-hover:opacity-100 transition-opacity duration-150"
            />
          )}

          {/* ── Floating label ──────────────────────────────────────────── */}
          <label
            htmlFor={id}
            className={cn(
              'absolute pointer-events-none select-none',
              'transition-all duration-150',
              labelFloated
                ? 'top-[-9px] left-[15px]'
                : 'top-1/2 -translate-y-1/2 left-[var(--inset-component-inset-component-md-x)]',
            )}
          >
            {/*
             * Background strip — visually "cuts" the border so the floating
             * label text sits on top of the box edge cleanly.
             */}
            <span
              aria-hidden="true"
              className={cn(
                'absolute bottom-0 left-[-4px] right-[-4px] h-[8px] transition-colors duration-150',
                labelFloated ? labelBgClass : 'bg-transparent',
              )}
            />

            <span
              className={cn(
                'relative z-10 block whitespace-nowrap',
                'font-[var(--typography-weight-paragraph)]',
                'transition-all duration-150',
                labelFloated
                  ? [
                      'text-[length:var(--typography-size-paragraph-xsmall)]',
                      'leading-[var(--typography-line-height-paragraph-xsmall)]',
                    ]
                  : [
                      'text-[length:var(--typography-size-paragraph-medium)]',
                      'leading-[var(--typography-line-height-paragraph-medium)]',
                    ],
                disabled
                  ? 'text-[color:var(--content-disabled)]'
                  : 'text-[color:var(--content-secondary)]',
              )}
            >
              {label}
            </span>
          </label>

          {/* ── Native input ────────────────────────────────────────────── */}
          <input
            ref={ref}
            id={id}
            className={cn(
              'flex-1 min-w-0 bg-transparent outline-none border-none p-0',
              'text-[length:var(--typography-size-paragraph-medium)]',
              'leading-[var(--typography-line-height-paragraph-medium)]',
              'font-[var(--typography-weight-paragraph)]',
              disabled
                ? 'cursor-not-allowed text-[color:var(--content-disabled)]'
                : 'text-[color:var(--content-primary)]',
            )}
            disabled={disabled}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            // Suppress native placeholder — label serves that role
            placeholder=""
            data-testid={testId ?? 'text-field-input'}
            aria-invalid={error || undefined}
            aria-describedby={helperText ? `${id}-helper` : undefined}
            {...props}
          />

          {/* ── Right icon slot ─────────────────────────────────────────── */}
          {rightIcon && (
            <div className="flex items-center shrink-0 ml-2 [&_svg]:size-6 text-[color:var(--content-secondary)]">
              {rightIcon}
            </div>
          )}
        </div>

        {/* ── Helper text ─────────────────────────────────────────────────── */}
        {helperText && (
          <div
            id={`${id}-helper`}
            className="flex gap-[4px] items-center w-full px-4"
          >
            <AlertCircleIcon
              className={cn(
                'shrink-0 size-4',
                disabled
                  ? 'text-[color:var(--content-disabled)]'
                  : error
                  ? 'text-[color:var(--sentiment-negative-foreground)]'
                  : 'text-[color:var(--content-secondary)]',
              )}
            />
            <span
              className={cn(
                'flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap',
                'text-[length:var(--typography-size-paragraph-xsmall)]',
                'leading-[var(--typography-line-height-paragraph-xsmall)]',
                'font-[var(--typography-weight-paragraph)]',
                disabled
                  ? 'text-[color:var(--content-disabled)]'
                  : error
                  ? 'text-[color:var(--sentiment-negative-foreground)]'
                  : 'text-[color:var(--content-secondary)]',
              )}
            >
              {helperText}
            </span>
          </div>
        )}
      </div>
    )
  }
)

TextField.displayName = 'TextField'

export { TextField }
