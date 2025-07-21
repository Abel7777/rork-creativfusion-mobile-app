import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';
import Typography from '@/components/Typography';
import { Ionicons } from '@expo/vector-icons';

interface VaultCategory {
  id: string;
  titleKey: string;
  icon: string;
  count: number;
}

interface VaultCardProps {
  category: VaultCategory;
}

const VaultCard: React.FC<VaultCardProps> = ({ category }) => {
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <Pressable 
      style={[styles.container, { 
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        borderColor: 'rgba(255, 215, 0, 0.3)'
      }]}
    >
      <View style={styles.iconContainer}>
        <Ionicons 
          name={category.icon as any} 
          size={32} 
          color={theme.colors.accent} 
        />
      </View>
      <Typography 
        variant="body" 
        style={[styles.title, { color: theme.colors.primaryText }]}
        numberOfLines={2}
      >
        {t(category.titleKey)}
      </Typography>
      <Typography 
        variant="body" 
        style={[styles.count, { color: theme.colors.secondaryText }]}
      >
        {category.count} items
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    minHeight: 140,
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '600' as const,
  },
  count: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default VaultCard;