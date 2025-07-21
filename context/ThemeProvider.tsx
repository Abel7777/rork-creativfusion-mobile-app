import createContextHook from '@nkzw/create-context-hook';
import { theme } from '@/constants/theme';

export const [ThemeProvider, useTheme] = createContextHook(() => {
  return theme;
});