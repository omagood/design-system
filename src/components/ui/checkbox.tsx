import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// ── Icons ──────────────────────────────────────────────────────────────────────

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M1 4L3.5 6.5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DashIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="2"
      viewBox="0 0 12 2"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <line
        x1="0" y1="1" x2="12" y2="1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ── Types ──────────────────────────────────────────────────────────────────────

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Optional label rendered to the right of the box */
  label?: string
  /** Renders the dash icon — takes visual precedence over checked */
  indeterminate?: boolean
  'data-testid'?: string
}

// ── Component ──────────────────────────────────────────────────────────────────

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      indeterminate = false,
      disabled,
      checked,
      defaultChecked,
      onChange,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    // ── Controlled / uncontrolled ──────────────────────────────────────────────
    const isControlled = checked !== undefined
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false)
    const isChecked = isControlled ? !!checked : internalChecked

    // ── Indeterminate (DOM property — not an HTML attribute) ───────────────────
    const localRef = useRef<HTMLInputElement | null>(null)
    const mergedRef = useCallback(
      (node: HTMLInputElement | null) => {
        localRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
      },
      [ref]
    )

    useEffect(() => {
      if (localRef.current) localRef.current.indeterminate = indeterminate
    }, [indeterminate])

    // ── Event handlers ─────────────────────────────────────────────────────────
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalChecked(e.target.checked)
      onChange?.(e)
    }

    // ── Visual state ───────────────────────────────────────────────────────────
    const isFilled = isChecked || indeterminate

    // One named utility per state — defined in global.css so Tailwind's
    // scanner doesn't have to infer them from ternary expressions.
    const boxClass = disabled
      ? isFilled ? 'cb-box-filled-disabled' : 'cb-box-unchecked-disabled'
      : isFilled ? 'cb-box-filled'          : 'cb-box-unchecked'

    // Icon colour
    const iconColor = disabled
      ? 'text-[color:var(--content-disabled)]'
      : 'text-[color:var(--action-primary-inverse)]'

    return (
      <label
        className={cn(
          'inline-flex items-center gap-[var(--spacing-space-8px)]',
          '[font-family:var(--typography-font-family)]',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          className,
        )}
      >
        {/* ── Control ───────────────────────────────────────────────────────── */}
        {/*
         * 24×24 outer container = generous hit area.
         * 20×20 visual box = inset 2px on all sides, exact Figma size.
         */}
        <div className="group relative size-6 shrink-0">
          {/* Native input — invisible, full-size, owns all a11y + events */}
          <input
            ref={mergedRef}
            type="checkbox"
            disabled={disabled}
            checked={isControlled ? isChecked : undefined}
            defaultChecked={!isControlled ? (defaultChecked ?? false) : undefined}
            onChange={handleChange}
            data-testid={testId ?? 'checkbox'}
            className="peer absolute inset-0 m-0 h-full w-full cursor-[inherit] opacity-0"
            {...props}
          />

          {/* Visual box */}
          <div
            className={cn(
              // Layout
              'pointer-events-none absolute inset-[2px]',
              'flex items-center justify-center overflow-hidden',
              // Shape
              'rounded-[var(--corner-radius-small)]',
              // Colours + border — named utility covers bg, border-color, border-width, border-style
              boxClass,
              // Focus ring (driven by the hidden peer input)
              'peer-focus-visible:ring-[length:var(--focus-focus-ring-width)]',
              'peer-focus-visible:ring-[color:var(--state-focus-ring)]',
              'peer-focus-visible:ring-offset-[var(--focus-focus-ring-offset)]',
            )}
          >
            {/* Hover / pressed overlay — only for filled + enabled */}
            {!disabled && isFilled && (
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-[inherit] pointer-events-none bg-[var(--state-hover-overlay)] opacity-0 group-hover:opacity-100 group-active:bg-[var(--state-pressed-overlay)] transition-opacity duration-150"
              />
            )}

            {/* Icon — sits above the overlay */}
            {indeterminate ? (
              <DashIcon className={cn('relative z-10 shrink-0', iconColor)} />
            ) : isChecked ? (
              <CheckIcon className={cn('relative z-10 shrink-0', iconColor)} />
            ) : null}
          </div>
        </div>

        {/* ── Label ─────────────────────────────────────────────────────────── */}
        {label && (
          <span
            className={cn(
              '[font-weight:var(--typography-weight-paragraph)]',
              'text-[length:var(--typography-size-paragraph-medium)]',
              'leading-[var(--typography-line-height-paragraph-medium)]',
              disabled
                ? 'text-[color:var(--content-disabled)]'
                : 'text-[color:var(--content-primary)]',
            )}
          >
            {label}
          </span>
        )}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
