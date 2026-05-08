import { useContext } from 'react'
import { Tick01Icon } from '@hugeicons/core-free-icons'
import { Checkbox } from '@/components/ui/checkbox'
import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/utils'
import { DropdownContext } from './dropdown'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface DropdownItemProps {
  /** Unique value used for selection state when inside a Dropdown */
  value?: string
  /** Variant — falls back to context variant or 'single-select' */
  variant?: 'single-select' | 'multi-select' | 'radio'
  /** Explicit selected state (used when rendered without a Dropdown context) */
  selected?: boolean
  /** Primary label */
  label: string
  /** Optional secondary description (single-select only) */
  description?: string
  /** Optional leading icon node (24px) */
  icon?: React.ReactNode
  /** Disable the item */
  disabled?: boolean
  /** Click handler — fires in addition to context onSelect */
  onClick?: () => void
  className?: string
  'data-testid'?: string
}

// ── Radio indicator ────────────────────────────────────────────────────────────

function RadioIndicator({ checked }: { checked: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        // 20×20 outer circle
        'relative shrink-0',
        'size-5 rounded-[var(--corner-radius-corner-full)]',
        'border-[1.25px] border-solid border-[color:var(--action-secondary)]',
        'bg-[var(--surface-primary)]',
        'flex items-center justify-center',
      )}
    >
      {checked && (
        // 12px inner dot — offset 2.75px from edge means (20 - 12) / 2 = 4px, but
        // Figma spec says 2.75px offset so inner size = 20 - 2*2.75 ≈ 14.5px.
        // We use 12px as specified for the inner circle.
        <div
          className="size-3 rounded-[var(--corner-radius-corner-full)] bg-[var(--action-primary)]"
        />
      )}
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────────────────────

export function DropdownItem({
  value,
  variant: variantProp,
  selected: selectedProp,
  label,
  description,
  icon,
  disabled = false,
  onClick,
  className,
  'data-testid': testId,
}: DropdownItemProps) {
  // ── Context integration ────────────────────────────────────────────────────
  const ctx = useContext(DropdownContext)

  const resolvedVariant = variantProp ?? ctx?.variant ?? 'single-select'
  const resolvedSelected =
    value !== undefined && ctx
      ? ctx.isSelected(value)
      : (selectedProp ?? false)

  const handleClick = () => {
    if (disabled) return
    if (value !== undefined && ctx) ctx.onSelect(value)
    onClick?.()
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      role="option"
      aria-selected={resolvedSelected}
      aria-disabled={disabled}
      data-testid={testId ?? 'dropdown-item'}
      onClick={handleClick}
      className={cn(
        'w-full flex items-center',
        'px-[var(--inset-component-inset-component-md-x)]',
        'py-[var(--inset-component-inset-component-md-y)]',
        'gap-[var(--gap-gap-related-default)]',
        'rounded-[var(--corner-radius-corner-small)]',
        '[font-family:var(--typography-font-family)]',
        disabled
          ? 'cursor-not-allowed opacity-40'
          : 'cursor-pointer hover:bg-[var(--state-hover-surface)] active:bg-[var(--state-pressed-secondary)]',
        'transition-colors duration-100',
        'select-none',
        className,
      )}
    >
      {/* ── Multi-select: checkbox ─────────────────────────────────────────── */}
      {resolvedVariant === 'multi-select' && (
        <Checkbox
          checked={resolvedSelected}
          disabled={disabled}
          onChange={() => {
            // Selection is handled by the div's onClick via context
          }}
          className="shrink-0 pointer-events-none"
        />
      )}

      {/* ── Radio: radio indicator ────────────────────────────────────────── */}
      {resolvedVariant === 'radio' && (
        <RadioIndicator checked={resolvedSelected} />
      )}

      {/* ── Optional leading icon (all variants) ─────────────────────────── */}
      {icon && (
        <span aria-hidden="true" className="shrink-0 size-6 flex items-center justify-center">
          {icon}
        </span>
      )}

      {/* ── Text column ───────────────────────────────────────────────────── */}
      <span className="flex-1 flex flex-col min-w-0">
        <span
          className={cn(
            'text-[length:var(--typography-size-paragraph-small)]',
            'leading-[var(--typography-line-height-paragraph-small)]',
            '[font-weight:var(--typography-weight-paragraph)]',
            'text-[color:var(--content-primary)]',
            'truncate',
          )}
        >
          {label}
        </span>

        {description && resolvedVariant === 'single-select' && (
          <span
            className={cn(
              'text-[length:var(--typography-size-paragraph-xsmall)]',
              'leading-[var(--typography-line-height-paragraph-xsmall)]',
              '[font-weight:var(--typography-weight-paragraph)]',
              'text-[color:var(--content-secondary)]',
              'truncate',
            )}
          >
            {description}
          </span>
        )}
      </span>

      {/* ── Single-select: tick if selected ──────────────────────────────── */}
      {resolvedVariant === 'single-select' && resolvedSelected && (
        <span aria-hidden="true" className="shrink-0 size-6 flex items-center justify-center text-[color:var(--action-primary)]">
          <Icon icon={Tick01Icon} size={24} />
        </span>
      )}
    </div>
  )
}
