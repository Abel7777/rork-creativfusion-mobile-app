import React from 'react';
import { 
  Pressable, 
  Text, 
  StyleSheet, 
  PressableProps, 
  StyleProp, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

interface ButtonProps extends PressableProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  style, 
  textStyle, 
  onPressIn, 
  onPressOut, 
  ...props 
}) => {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = (e: any) => {
    scale.value = withSpring(0.97);
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    scale.value = withSpring(1);
    onPressOut?.(e);
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        style={[styles.button, { backgroundColor: theme.colors.accent }, style]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...props}
      >
        <Text 
          style={[
            styles.text, 
            { 
              color: theme.colors.black,
              fontFamily: theme.typography.button.fontFamily,
              fontWeight: theme.typography.button.fontWeight,
              fontSize: theme.typography.button.fontSize,
            }, 
            textStyle
          ]}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default Button;