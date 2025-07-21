import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import { mockProducts } from '@/mocks/products';

export default function ProductDetailScreen() {
  const theme = useTheme();
  const { t } = useLanguage();
  const { id } = useLocalSearchParams();
  
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
        <Typography variant="heading">Product not found</Typography>
      </View>
    );
  }

  const handleAddToCart = () => {
    // TODO: Implement add to cart logic
    console.log('Add to cart pressed for product:', product.id);
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: t('productDetail.title'),
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.primaryBackground,
          },
          headerTitleStyle: {
            color: theme.colors.primaryText,
          },
          headerTintColor: theme.colors.accent,
        }} 
      />
      <ScrollView style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
        <Image 
          source={{ uri: product.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <Typography variant="heading" style={styles.title}>
            {product.title}
          </Typography>
          
          <Typography 
            variant="button" 
            style={[styles.price, { color: theme.colors.accent }]}
          >
            {t('common.price', { amount: product.price.toFixed(2) })}
          </Typography>

          <Typography 
            variant="body" 
            style={[styles.description, { color: theme.colors.primaryText }]}
          >
            {product.description}
          </Typography>

          <Button 
            title={t('productDetail.addToCart')} 
            onPress={handleAddToCart}
            style={styles.button} 
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },
  button: {
    height: 56,
  },
});