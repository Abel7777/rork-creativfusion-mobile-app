import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';
import Typography from '@/components/Typography';
import Button from '@/components/Button';

export default function ConciergeScreen() {
  const theme = useTheme();
  const { t } = useLanguage();

  const handleBookAppointment = () => {
    // TODO: Implement booking logic
    console.log('Book appointment pressed');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
      <View style={styles.content}>
        <Typography variant="heading" style={styles.title}>
          {t('concierge.title')}
        </Typography>
        
        <Typography 
          variant="body" 
          style={[styles.description, { color: theme.colors.primaryText }]}
        >
          {t('concierge.description')}
        </Typography>

        <View style={styles.buttonContainer}>
          <Button 
            title={t('concierge.bookButton')} 
            onPress={handleBookAppointment}
            style={styles.button} 
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: '80%',
    maxWidth: 300,
    height: 56,
  },
});