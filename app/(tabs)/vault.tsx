import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';
import Typography from '@/components/Typography';
import VaultCard from '@/components/VaultCard';
import { mockVaultCategories } from '@/mocks/vault';

export default function VaultScreen() {
  const theme = useTheme();
  const { t } = useLanguage();

  const renderCategory = ({ item, index }: { item: typeof mockVaultCategories[0], index: number }) => (
    <View style={[styles.categoryContainer, { marginRight: index % 2 === 0 ? 8 : 0, marginLeft: index % 2 === 1 ? 8 : 0 }]}>
      <VaultCard category={item} />
    </View>
  );

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
        data={mockVaultCategories}
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