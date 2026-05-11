import { forwardRef, useId, useState } from 'react'
import { AlertCircleIcon } from '@hugeicons/core-free-icons'
import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/utils'

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

    // ── Label background strip colour (cuts through border when floated) ────
    const labelBgClass = disabled
      ? 'bg-[var(--surface-disabled)]'
      : 'bg-[var(--surface-tertiary)]'

    // ── Floating label position ──────────────────────────────────────────────
    // Error floated position is 1px higher and 1px further left (Figma spec)
    const labelFloatedPos = error
      ? 'top-[-10px] left-[14px]'
      : 'top-[-9px] left-[15px]'

    return (
      <div className={cn('flex flex-col gap-[var(--spacing-space-4px)] w-full [font-family:var(--typography-font-family)]', className)}>
        {/* ── Input box ───────────────────────────────────────────────────── */}
        {/*
         * IMPORTANT: padding is FIXED at md-y (12px) for all states.
         * The label moves via absolute positioning only — the box height
         * never changes. (Figma: Large size always uses inset-component-md-y.)
         */}
        <div
          className={cn(
            'group relative flex items-center w-full',
            'rounded-[var(--corner-radius-corner-medium)]',
            'px-[var(--inset-component-inset-component-md-x)]',
            'py-[var(--inset-component-inset-component-md-y)]',
            bgClass,
            borderClass,
            'transition-[border-width,border-color] duration-150',
            disabled && 'cursor-not-allowed',
          )}
        >
          {/* Hover overlay — white 20% tint (matches Figma hover layer) */}
          {!disabled && !focused && (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-[inherit] pointer-events-none bg-[var(--state-hover-fill)] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            />
          )}

          {/* ── Floating label ──────────────────────────────────────────── */}
          <label
            htmlFor={id}
            className={cn(
              'absolute pointer-events-none select-none',
              'transition-all duration-150',
              labelFloated
                ? labelFloatedPos
                : 'top-1/2 -translate-y-1/2 left-[var(--inset-component-inset-component-md-x)]',
            )}
          >
            {/*
             * Background strip — visually breaks the border so the floating
             * label sits cleanly on top of the box edge.
             * Transparent when label is in-field (empty/hover state).
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
                '[font-weight:var(--typography-weight-paragraph)]',
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
              '[font-weight:var(--typography-weight-paragraph)]',
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
            <div className="flex items-center shrink-0 ml-[var(--spacing-space-8px)] [&_svg]:size-6 text-[color:var(--content-secondary)]">
              {rightIcon}
            </div>
          )}
        </div>

        {/* ── Helper text ─────────────────────────────────────────────────── */}
        {helperText && (
          <div
            id={`${id}-helper`}
            className="flex gap-[var(--spacing-space-4px)] items-center w-full px-[var(--inset-component-inset-component-md-x)]"
          >
            <Icon
              icon={AlertCircleIcon}
              size={16}
              className={cn(
                'shrink-0',
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
                '[font-weight:var(--typography-weight-paragraph)]',
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
