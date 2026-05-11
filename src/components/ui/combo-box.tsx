import { useEffect, useId, useRef, useState } from 'react'
import { AlertCircleIcon, ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons'
import { Icon } from '@/components/ui/icon'
import { Dropdown } from '@/components/ui/dropdown'
import { DropdownItem } from '@/components/ui/dropdown-item'
import { cn } from '@/lib/utils'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ComboBoxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboBoxProps {
  /** Floating label shown above the trigger */
  label?: string
  /** Available options rendered in the dropdown list */
  options: ComboBoxOption[]
  /** Controlled selected values */
  value?: string[]
  /** Uncontrolled default selected values */
  defaultValue?: string[]
  /** Called when the selection changes */
  onChange?: (values: string[]) => void
  /** Placeholder text shown when nothing is selected */
  placeholder?: string
  /** Show "Select all" row at the top of the list (default: true) */
  selectAll?: boolean
  disabled?: boolean
  /** Helper text shown below the trigger */
  helperText?: string
  /** Puts the trigger in error state */
  error?: boolean
  /** Maximum height of the dropdown in px (default: 280) */
  maxHeight?: number
  className?: string
  'data-testid'?: string
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ComboBox({
  label = 'Label',
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder,
  selectAll = true,
  disabled = false,
  helperText,
  error = false,
  maxHeight = 280,
  className,
  'data-testid': testId,
}: ComboBoxProps) {
  const id = useId()
  const containerRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)

  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue ?? [])
  const selectedValues = isControlled ? (controlledValue ?? []) : internalValue

  const hasValue = selectedValues.length > 0

  // Label floats up when the popover is open or items are selected
  const labelFloated = open || hasValue

  // Build comma-separated display string from selected values
  const displayText = hasValue
    ? selectedValues
        .map((v) => options.find((o) => o.value === v)?.label ?? v)
        .join(', ')
    : (placeholder ?? '')

  // ── Selection handler ──────────────────────────────────────────────────────
  const handleChange = (next: string | string[]) => {
    const values = Array.isArray(next) ? next : [next]
    if (!isControlled) setInternalValue(values)
    onChange?.(values)
  }

  // ── Close on outside click ─────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open])

  // ── Close on Escape ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // ── Border (mirrors TextField logic) ──────────────────────────────────────
  const borderClass = error
    ? 'field-border-error'
    : disabled
    ? 'field-border-disabled'
    : open
    ? 'field-border-focus'
    : hasValue
    ? 'field-border-filled'
    : 'field-border-default'

  const bgClass = disabled
    ? 'bg-[var(--surface-disabled)]'
    : 'bg-[var(--surface-tertiary)]'

  const labelBgClass = disabled
    ? 'bg-[var(--surface-disabled)]'
    : 'bg-[var(--surface-tertiary)]'

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex flex-col gap-[var(--spacing-space-4px)] w-full',
        '[font-family:var(--typography-font-family)]',
        className,
      )}
      data-testid={testId ?? 'combo-box'}
    >
      {/* ── Trigger ───────────────────────────────────────────────────────── */}
      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={cn(
          'group relative flex items-center w-full text-left',
          'rounded-[var(--corner-radius-corner-medium)]',
          'px-[var(--inset-component-inset-component-md-x)]',
          'py-[var(--inset-component-inset-component-md-y)]',
          bgClass,
          borderClass,
          'transition-[box-shadow] duration-150',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        )}
      >
        {/* Hover overlay (matches TextField) */}
        {!disabled && !open && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-[inherit] pointer-events-none bg-[var(--state-hover-fill)] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          />
        )}

        {/* ── Floating label ────────────────────────────────────────────── */}
        <span
          aria-hidden="true"
          className={cn(
            'absolute pointer-events-none select-none',
            'transition-all duration-150',
            labelFloated
              ? 'top-[-9px] left-[15px]'
              : 'top-1/2 -translate-y-1/2 left-[var(--inset-component-inset-component-md-x)]',
          )}
        >
          {/* Background strip that cuts through the border */}
          <span
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
        </span>

        {/* ── Display value ─────────────────────────────────────────────── */}
        <span
          className={cn(
            'flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap',
            'text-[length:var(--typography-size-paragraph-medium)]',
            'leading-[var(--typography-line-height-paragraph-medium)]',
            '[font-weight:var(--typography-weight-paragraph)]',
            disabled
              ? 'text-[color:var(--content-disabled)]'
              : hasValue
              ? 'text-[color:var(--content-primary)]'
              : 'text-[color:var(--content-secondary)]',
          )}
        >
          {displayText}
        </span>

        {/* ── Chevron icon ──────────────────────────────────────────────── */}
        <span
          aria-hidden="true"
          className={cn(
            'shrink-0 ml-[var(--spacing-space-8px)]',
            disabled
              ? 'text-[color:var(--content-disabled)]'
              : 'text-[color:var(--content-secondary)]',
          )}
        >
          <Icon icon={open ? ArrowUp01Icon : ArrowDown01Icon} size={24} />
        </span>
      </button>

      {/* ── Dropdown popover ──────────────────────────────────────────────── */}
      {open && (
        <div
          role="presentation"
          className="absolute top-full left-0 right-0 z-50 mt-[var(--spacing-space-4px)]"
        >
          <Dropdown
            variant="multi-select"
            value={selectedValues}
            onChange={handleChange}
            selectAll={selectAll}
            maxHeight={maxHeight}
          >
            {options.map((opt) => (
              <DropdownItem
                key={opt.value}
                value={opt.value}
                label={opt.label}
                disabled={opt.disabled}
                variant="multi-select"
              />
            ))}
          </Dropdown>
        </div>
      )}

      {/* ── Helper text ───────────────────────────────────────────────────── */}
      {helperText && (
        <div className="flex gap-[var(--spacing-space-4px)] items-center w-full px-[var(--inset-component-inset-component-md-x)]">
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
