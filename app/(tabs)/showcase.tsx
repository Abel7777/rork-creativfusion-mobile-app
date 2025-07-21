import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function ShowcaseScreen() {
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: t('showcase.title'),
          headerShown: true,
          headerRight: () => <LanguageSwitcher />,
        }} 
      />
      <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
        <Typography variant="heading" style={styles.title}>
          {t('showcase.title')}
        </Typography>
        <Typography variant="body" style={styles.description}>
          {t('showcase.description')}
        </Typography>
        <Button 
          title={t('showcase.explore')} 
          style={styles.button} 
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    maxWidth: 300,
  },
});