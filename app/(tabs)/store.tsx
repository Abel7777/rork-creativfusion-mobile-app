import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import Typography from '@/components/Typography';
import Button from '@/components/Button';

export default function StoreScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
      <Typography variant="heading" style={styles.title}>
        Store
      </Typography>
      <Typography variant="body" style={styles.description}>
        Browse and purchase creative assets
      </Typography>
      <Button 
        title="Shop Now" 
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