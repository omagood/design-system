/**
 * Shared Storybook utilities for icon-aware stories.
 *
 * Usage in any story file:
 *   import { iconArgType, resolveIcon } from './story-utils'
 *
 *   argTypes: { leftIconName: iconArgType }
 *   render: ({ leftIconName, ...args }) => (
 *     <Button leftIcon={resolveIcon(leftIconName)} {...args} />
 *   )
 */
import React from 'react'
import * as HugeIcons from '@hugeicons/core-free-icons'
import { Icon } from '@/components/ui/icon'
import type { IconSvgElement } from '@hugeicons/react'

// All icon data keyed by export name
export const iconMap = Object.fromEntries(
  Object.entries(HugeIcons).filter(([, v]) => Array.isArray(v))
) as Record<string, IconSvgElement>

export const NONE = '(none)' as const

// Sorted names with a leading "(none)" sentinel
export const iconSelectOptions = [NONE, ...Object.keys(iconMap).sort()]

/**
 * Drop-in argType for any prop that accepts a React icon node.
 * Shows a searchable select in the Controls panel.
 */
export const iconArgType = {
  control: 'select',
  options: iconSelectOptions,
  description: 'Icon from @hugeicons/core-free-icons',
} as const

/**
 * Convert a selected icon name string → <Icon> element (or undefined for "(none)").
 * Pass the result directly to any `icon`, `leftIcon`, or `rightIcon` prop.
 */
export function resolveIcon(name: string | undefined): React.ReactNode {
  if (!name || name === NONE) return undefined
  const data = iconMap[name]
  return data ? <Icon icon={data} /> : undefined
}
