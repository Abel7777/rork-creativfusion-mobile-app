import React from 'react';
import { View, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import { trpc } from '@/lib/trpc';

export default function ProductDetailScreen() {
  const theme = useTheme();
  const { t } = useLanguage();
  const { id } = useLocalSearchParams();
  
  const { data: product, isLoading, error } = trpc.products.detail.useQuery({
    id: id as string,
  });

  const handleAddToCart = () => {
    // TODO: Implement add to cart logic
    console.log('Add to cart pressed for product:', product?.id);
  };

  if (isLoading) {
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
        <View style={[styles.container, styles.centered, { backgroundColor: theme.colors.primaryBackground }]}>
          <ActivityIndicator size="large" color={theme.colors.accent} />
        </View>
      </>
    );
  }

  if (error || !product) {
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
        <View style={[styles.container, styles.centered, { backgroundColor: theme.colors.primaryBackground }]}>
          <Typography variant="heading">Product not found</Typography>
        </View>
      </>
    );
  }

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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
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