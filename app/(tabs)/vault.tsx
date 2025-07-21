import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';
import Typography from '@/components/Typography';
import VaultCard from '@/components/VaultCard';
import { trpc } from '@/lib/trpc';

export default function VaultScreen() {
  const theme = useTheme();
  const { t } = useLanguage();

  const { data: categories, isLoading, error } = trpc.vault.categories.useQuery();

  const renderCategory = ({ item, index }: { item: any, index: number }) => (
    <View style={[styles.categoryContainer, { marginRight: index % 2 === 0 ? 8 : 0, marginLeft: index % 2 === 1 ? 8 : 0 }]}>
      <VaultCard category={item} />
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
          Error loading vault
        </Typography>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
      <View style={styles.header}>
        <Typography variant="heading" style={styles.title}>
          {t('vault.title')}
        </Typography>
        <Typography variant="body" style={[styles.description, { color: theme.colors.secondaryText }]}>
          {t('vault.description')}
        </Typography>
      </View>

      <FlatList
        data={categories || []}
        renderItem={renderCategory}
        numColumns={2}
        contentContainerStyle={styles.categoriesContainer}
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
    paddingBottom: 24,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoryContainer: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
});