import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { useAuth } from '@/context/AuthProvider';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import { router } from 'expo-router';

export default function LoginScreen() {
  const theme = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    // Simulate login
    login();
    router.replace('/(tabs)/showcase');
  };

  const handleSignUpPress = () => {
    router.push('/(auth)/signup');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
      <View style={styles.content}>
        <Typography variant="heading" style={styles.title}>
          Welcome Back
        </Typography>
        <Typography variant="body" style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
          Sign in to continue to CreativFusion
        </Typography>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, { 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: theme.colors.primaryText,
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }]}
            placeholder="Email"
            placeholderTextColor={theme.colors.secondaryText}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={[styles.input, { 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: theme.colors.primaryText,
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }]}
            placeholder="Password"
            placeholderTextColor={theme.colors.secondaryText}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button 
            title="Sign In" 
            onPress={handleLogin}
            style={styles.loginButton}
          />

          <Button 
            title="Create Account" 
            onPress={handleSignUpPress}
            style={[styles.signupButton, { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.accent }]}
            textStyle={{ color: theme.colors.accent }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 48,
  },
  form: {
    gap: 16,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  loginButton: {
    height: 56,
    marginTop: 8,
  },
  signupButton: {
    height: 56,
    marginTop: 8,
  },
});