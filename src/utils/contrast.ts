import type { ContrastResult } from '../types/color';
import { getRelativeLuminance } from './colorUtils';

/**
 * Calculate WCAG contrast ratio between two colors
 */
export function getContrastRatio(fg: string, bg: string): number {
  const l1 = getRelativeLuminance(fg);
  const l2 = getRelativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Full WCAG compliance check
 */
export function checkContrast(fg: string, bg: string): ContrastResult {
  const ratio = getContrastRatio(fg, bg);
  return {
    ratio: Math.round(ratio * 100) / 100,
    wcagAA: ratio >= 4.5,
    wcagAAA: ratio >= 7,
    wcagAALarge: ratio >= 3,
    wcagAAALarge: ratio >= 4.5,
  };
}

/**
 * Format contrast ratio for display
 */
export function formatContrastRatio(ratio: number): string {
  return ratio.toFixed(2) + ':1';
}
