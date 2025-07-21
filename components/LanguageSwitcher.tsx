import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';
import Typography from '@/components/Typography';

const LanguageSwitcher: React.FC = () => {
  const theme = useTheme();
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === 'en' ? 'de' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <Pressable
      style={[styles.container, { 
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        borderColor: theme.colors.accent,
      }]}
      onPress={handleLanguageChange}
    >
      <Typography 
        variant="button" 
        style={[styles.text, { color: theme.colors.accent }]}
      >
        {currentLanguage.toUpperCase()}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
  },
});

export default LanguageSwitcher;