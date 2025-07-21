import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { useAuth } from '@/context/AuthProvider';
import { useLanguage } from '@/context/LanguageProvider';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import { router } from 'expo-router';

export default function LoginScreen() {
  const theme = useTheme();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('demo@creativfusion.com');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t('common.error'), t('login.fillAllFields'));
      return;
    }
    
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    
    if (result.success) {
      router.replace('/(tabs)/showcase');
    } else {
      Alert.alert(t('common.error'), result.error || 'Login failed');
    }
  };

  const handleSignUpPress = () => {
    router.push('/(auth)/signup');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
      <View style={styles.content}>
        <Typography variant="heading" style={styles.title}>
          {t('login.welcome')}
        </Typography>
        <Typography variant="body" style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
          {t('login.signInToContinue')}
        </Typography>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, { 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: theme.colors.primaryText,
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }]}
            placeholder={t('login.email')}
            placeholderTextColor={theme.colors.secondaryText}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
          
          <TextInput
            style={[styles.input, { 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: theme.colors.primaryText,
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }]}
            placeholder={t('login.password')}
            placeholderTextColor={theme.colors.secondaryText}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
          />

          <Button 
            title={isLoading ? 'Signing In...' : t('login.signIn')} 
            onPress={handleLogin}
            style={styles.loginButton}
            disabled={isLoading}
          />

          <Button 
            title={t('login.createAccount')} 
            onPress={handleSignUpPress}
            style={[styles.signupButton, { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.accent }]}
            textStyle={{ color: theme.colors.accent }}
            disabled={isLoading}
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