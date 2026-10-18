/**
 * Kasazon Color Palette
 * Extracted from Figma design
 */

export const colors = {
  // Primary brand color
  primary: '#02368C',

  // Text colors
  text: {
    primary: '#111111',
    secondary: '#333333',
    white: '#FFFFFF',
  },

  // Accent colors
  accent: {
    gold: '#DCA700',
    goldDark: '#CF9D00',
  },

  // Background colors
  background: {
    white: '#FFFFFF',
    transparent: 'transparent',
    gold: '#CF9D00',
  },
} as const;

export type Colors = typeof colors;
