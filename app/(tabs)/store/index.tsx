import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';
import Typography from '@/components/Typography';
import FilterChip from '@/components/FilterChip';
import ProductCard from '@/components/ProductCard';
import { mockProducts, filterCategories } from '@/mocks/products';

export default function StoreScreen() {
  const theme = useTheme();
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredProducts = selectedFilter 
    ? mockProducts.filter(product => product.category === selectedFilter)
    : mockProducts;

  const renderProduct = ({ item, index }: { item: typeof mockProducts[0], index: number }) => (
    <View style={[styles.productContainer, { marginRight: index % 2 === 0 ? 8 : 0, marginLeft: index % 2 === 1 ? 8 : 0 }]}>
      <ProductCard product={item} />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
      <View style={styles.header}>
        <Typography variant="heading" style={styles.title}>
          {t('store.title')}
        </Typography>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filterCategories.map((category) => (
          <FilterChip
            key={category}
            title={t(`store.filters.${category}`)}
            isSelected={selectedFilter === category}
            onPress={() => setSelectedFilter(selectedFilter === category ? null : category)}
          />
        ))}
      </ScrollView>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        numColumns={2}
        contentContainerStyle={styles.productsContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  productsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productContainer: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
});