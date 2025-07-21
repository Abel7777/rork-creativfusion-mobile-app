import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';
import Typography from '@/components/Typography';
import FilterChip from '@/components/FilterChip';
import ProductCard from '@/components/ProductCard';
import { trpc } from '@/lib/trpc';

const filterCategories = ['aiArt', 'music', 'prints'] as const;

export default function StoreScreen() {
  const theme = useTheme();
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const { data: products, isLoading, error } = trpc.products.list.useQuery({
    category: selectedFilter as any,
  });

  const renderProduct = ({ item, index }: { item: any, index: number }) => (
    <View style={[styles.productContainer, { marginRight: index % 2 === 0 ? 8 : 0, marginLeft: index % 2 === 1 ? 8 : 0 }]}>
      <ProductCard product={item} />
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.colors.primaryBackground }]}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.colors.primaryBackground }]}>
        <Typography variant="body" style={{ color: theme.colors.secondaryText }}>
          Error loading products
        </Typography>
      </View>
    );
  }

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
        data={products || []}
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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
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