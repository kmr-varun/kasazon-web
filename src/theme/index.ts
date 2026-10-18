/**
 * Kasazon Design System
 * Centralized theme tokens
 */

export { colors, type Colors } from './colors';
export { typography, type Typography } from './typography';
export { spacing, type Spacing } from './spacing';
export { radius, type Radius } from './radius';

// Combined theme object
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';

export const theme = {
  colors,
  typography,
  spacing,
  radius,
} as const;

export type Theme = typeof theme;
