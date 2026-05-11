import React, { createContext, useContext, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

// ── Context ────────────────────────────────────────────────────────────────────

export interface DropdownContextValue {
  variant: 'single-select' | 'multi-select' | 'radio'
  isSelected: (value: string) => boolean
  onSelect: (value: string) => void
}

export const DropdownContext = createContext<DropdownContextValue | null>(null)

export function useDropdown() {
  return useContext(DropdownContext)
}

// ── Types ──────────────────────────────────────────────────────────────────────

export interface DropdownProps {
  variant?: 'single-select' | 'multi-select' | 'radio'
  /** Controlled value */
  value?: string | string[]
  /** Uncontrolled default value */
  defaultValue?: string | string[]
  onChange?: (value: string | string[]) => void
  children: React.ReactNode
  /** Multi-select only: show a "Select all" row + divider at top */
  selectAll?: boolean
  /** Max-height of the scrollable list in px. Default: 280 */
  maxHeight?: number
  className?: string
  style?: React.CSSProperties
  'data-testid'?: string
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Collect all `value` props from direct DropdownItem children */
function collectChildValues(children: React.ReactNode): string[] {
  const values: string[] = []
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && (child.props as { value?: string }).value !== undefined) {
      values.push((child.props as { value: string }).value)
    }
  })
  return values
}

// ── Select-all row ─────────────────────────────────────────────────────────────

interface SelectAllRowProps {
  allSelected: boolean
  someSelected: boolean
  onToggle: () => void
}

function SelectAllRow({ allSelected, someSelected, onToggle }: SelectAllRowProps) {
  return (
    <div
      role="option"
      aria-selected={allSelected}
      data-testid="dropdown-select-all"
      onClick={onToggle}
      className={cn(
        'w-full flex items-center',
        'px-[var(--inset-component-inset-component-md-x)]',
        'py-[var(--inset-component-inset-component-md-y)]',
        'gap-[var(--gap-gap-related-default)]',
        'rounded-[var(--corner-radius-corner-small)]',
        '[font-family:var(--typography-font-family)]',
        'cursor-pointer hover:bg-[var(--state-hover-fill)] active:bg-[var(--state-pressed-fill)]',
        'transition-colors duration-100',
        'select-none',
      )}
    >
      <Checkbox
        checked={allSelected}
        indeterminate={someSelected}
        onChange={() => {
          // Click is handled by the parent div
        }}
        className="shrink-0 pointer-events-none"
      />

      <span
        className={cn(
          'flex-1',
          'text-[length:var(--typography-size-paragraph-small)]',
          'leading-[var(--typography-line-height-paragraph-small)]',
          '[font-weight:var(--typography-weight-paragraph)]',
          'text-[color:var(--content-primary)]',
        )}
      >
        Select all
      </span>
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────────────────────

export function Dropdown({
  variant = 'single-select',
  value: controlledValue,
  defaultValue,
  onChange,
  children,
  selectAll = false,
  maxHeight = 280,
  className,
  style,
  'data-testid': testId,
}: DropdownProps) {
  const isControlled = controlledValue !== undefined

  // ── Internal selection state (uncontrolled) ──────────────────────────────
  const [internalValue, setInternalValue] = useState<string | string[] | undefined>(
    defaultValue
  )

  const effectiveValue = isControlled ? controlledValue : internalValue

  // ── Selection logic ────────────────────────────────────────────────────────
  const isSelected = (v: string): boolean => {
    if (effectiveValue === undefined) return false
    if (Array.isArray(effectiveValue)) return effectiveValue.includes(v)
    return effectiveValue === v
  }

  const onSelect = (v: string) => {
    let next: string | string[]

    if (variant === 'multi-select') {
      const current = Array.isArray(effectiveValue) ? effectiveValue : []
      next = current.includes(v) ? current.filter((x) => x !== v) : [...current, v]
    } else {
      // single-select / radio
      next = v
    }

    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  // ── Select-all logic (multi-select) ────────────────────────────────────────
  const childValues = collectChildValues(children)
  const allSelected = childValues.length > 0 && childValues.every(isSelected)
  const someSelected = childValues.some(isSelected) && !allSelected

  const handleSelectAll = () => {
    const next: string[] = allSelected ? [] : [...childValues]
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  // ── Context value ──────────────────────────────────────────────────────────
  const ctxValue: DropdownContextValue = { variant, isSelected, onSelect }

  return (
    <DropdownContext.Provider value={ctxValue}>
      <div
        role="listbox"
        aria-multiselectable={variant === 'multi-select'}
        data-testid={testId ?? 'dropdown'}
        className={cn(
          'bg-[var(--surface-primary)]',
          'rounded-[var(--corner-radius-corner-medium)]',
          'shadow-elevation-medium',
          'py-[var(--inset-inline-inset-inline-sm-y)]',
          'w-full min-w-[200px]',
          'dropdown-scroll',
          className,
        )}
        style={{ maxHeight, ...style }}
      >
        {/* ── Select-all row (multi-select only) ──────────────────────────── */}
        {variant === 'multi-select' && selectAll && (
          <>
            <SelectAllRow
              allSelected={allSelected}
              someSelected={someSelected}
              onToggle={handleSelectAll}
            />
            <div
              aria-hidden="true"
              className="h-px mx-[var(--inset-component-inset-component-md-x)] bg-[var(--border-divider)]"
            />
          </>
        )}

        {/* ── Items ────────────────────────────────────────────────────────── */}
        {children}
      </div>
    </DropdownContext.Provider>
  )
}
