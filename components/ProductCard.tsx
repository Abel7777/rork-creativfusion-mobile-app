import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';
import Typography from '@/components/Typography';
import { router } from 'expo-router';

interface Product {
  id: string;
  title: string;
  price: number;
  category: 'aiArt' | 'music' | 'prints';
  imageUrl: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const theme = useTheme();
  const { t } = useLanguage();

  const handlePress = () => {
    router.push(`/(tabs)/store/product-detail?id=${product.id}`);
  };

  return (
    <Pressable 
      style={[styles.container, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}
      onPress={handlePress}
    >
      <Image 
        source={{ uri: product.imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Typography 
          variant="body" 
          style={[styles.title, { color: theme.colors.primaryText }]}
          numberOfLines={2}
        >
          {product.title}
        </Typography>
        <Typography 
          variant="button" 
          style={[styles.price, { color: theme.colors.accent }]}
        >
          {t('common.price', { amount: product.price.toFixed(2) })}
        </Typography>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
  },
});

export default ProductCard;