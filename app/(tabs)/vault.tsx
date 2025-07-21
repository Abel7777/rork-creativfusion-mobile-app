import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';
import Typography from '@/components/Typography';
import Button from '@/components/Button';

export default function VaultScreen() {
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
      <Typography variant="heading" style={styles.title}>
        {t('vault.title')}
      </Typography>
      <Typography variant="body" style={styles.description}>
        {t('vault.description')}
      </Typography>
      <Button 
        title={t('vault.openVault')} 
        style={styles.button} 
      />
    </View>
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