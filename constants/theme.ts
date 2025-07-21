export const theme = {
  colors: {
    primaryBackground: '#0A0A0A',
    primaryText: '#F5F5F5',
    accent: '#FFD700', // Gold
    secondaryText: '#a0a0a0',
    black: '#000000',
    white: '#FFFFFF',
  },
  typography: {
    heading: {
      fontFamily: 'serif',
      fontWeight: '600' as const,
      fontSize: 24,
    },
    body: {
      fontFamily: 'sans-serif',
      fontWeight: '400' as const,
      fontSize: 16,
    },
    button: {
      fontFamily: 'sans-serif',
      fontWeight: '700' as const,
      fontSize: 15,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999,
  },
};

export type Theme = typeof theme;