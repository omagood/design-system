import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface IconProps {
  /** Icon data from @hugeicons/core-free-icons */
  icon: IconSvgElement
  /** Width and height in px. Default: 24 */
  size?: number
  /**
   * Icon colour. Accepts any CSS colour value.
   * Default: "currentColor" — inherits from the parent's text colour.
   */
  color?: string
  /** Stroke width. Default: 1.5 */
  strokeWidth?: number
  className?: string
  style?: React.CSSProperties
  'aria-label'?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

// ── Component ──────────────────────────────────────────────────────────────────

export function Icon({
  icon,
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.5,
  className,
  style,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: IconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      primaryColor={color}
      strokeWidth={strokeWidth}
      className={className}
      style={style}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? (ariaLabel ? undefined : true)}
    />
  )
}
