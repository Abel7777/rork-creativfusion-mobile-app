import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { useAuth } from '@/context/AuthProvider';
import { useLanguage } from '@/context/LanguageProvider';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import { router } from 'expo-router';

export default function SignupScreen() {
  const theme = useTheme();
  const { signup } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert(t('common.error'), t('signup.fillAllFields'));
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert(t('common.error'), t('signup.passwordsDoNotMatch'));
      return;
    }
    
    setIsLoading(true);
    const result = await signup(email, password);
    setIsLoading(false);
    
    if (result.success) {
      router.replace('/(tabs)/showcase');
    } else {
      Alert.alert(t('common.error'), result.error || 'Signup failed');
    }
  };

  const handleSignInPress = () => {
    router.push('/(auth)/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
      <View style={styles.content}>
        <Typography variant="heading" style={styles.title}>
          {t('signup.createAccount')}
        </Typography>
        <Typography variant="body" style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
          {t('signup.join')}
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

          <TextInput
            style={[styles.input, { 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: theme.colors.primaryText,
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }]}
            placeholder={t('signup.confirmPassword')}
            placeholderTextColor={theme.colors.secondaryText}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!isLoading}
          />

          <Button 
            title={isLoading ? 'Creating Account...' : t('signup.createAccount')} 
            onPress={handleSignup}
            style={styles.signupButton}
            disabled={isLoading}
          />

          <Button 
            title={t('signup.alreadyHaveAccount')} 
            onPress={handleSignInPress}
            style={[styles.loginButton, { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.accent }]}
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
  signupButton: {
    height: 56,
    marginTop: 8,
  },
  loginButton: {
    height: 56,
    marginTop: 8,
  },
});