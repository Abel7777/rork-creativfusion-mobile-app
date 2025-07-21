import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import Typography from '@/components/Typography';

interface FilterChipProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ title, isSelected, onPress }) => {
  const theme = useTheme();

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? theme.colors.accent : 'rgba(255, 255, 255, 0.1)',
          borderColor: isSelected ? theme.colors.accent : 'rgba(255, 255, 255, 0.2)',
        }
      ]}
      onPress={onPress}
    >
      <Typography
        variant="button"
        style={[
          styles.text,
          {
            color: isSelected ? theme.colors.black : theme.colors.primaryText,
          }
        ]}
      >
        {title}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 12,
  },
  text: {
    fontSize: 14,
  },
});

export default FilterChip;