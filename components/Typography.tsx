import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';

interface TypographyProps extends TextProps {
  variant?: 'heading' | 'body' | 'button';
}

const Typography: React.FC<TypographyProps> = ({ 
  variant = 'body', 
  style, 
  children, 
  ...props 
}) => {
  const theme = useTheme();
  
  const getTypographyStyle = () => {
    switch (variant) {
      case 'heading':
        return {
          fontFamily: theme.typography.heading.fontFamily,
          fontWeight: theme.typography.heading.fontWeight,
          fontSize: theme.typography.heading.fontSize,
          color: theme.colors.primaryText,
        };
      case 'button':
        return {
          fontFamily: theme.typography.button.fontFamily,
          fontWeight: theme.typography.button.fontWeight,
          fontSize: theme.typography.button.fontSize,
          color: theme.colors.primaryText,
        };
      case 'body':
      default:
        return {
          fontFamily: theme.typography.body.fontFamily,
          fontWeight: theme.typography.body.fontWeight,
          fontSize: theme.typography.body.fontSize,
          color: theme.colors.primaryText,
        };
    }
  };

  return (
    <Text 
      style={[styles.text, getTypographyStyle(), style]} 
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    // Base styles if needed
  },
});

export default Typography;