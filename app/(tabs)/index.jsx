import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    setLoading(true);

    try {
      console.log('Payload:', { email, password }); // Log the payload being sent

      const response = await axios.post('https://dev.ivitafi.com/api/User/authenticate', {
        email,
        password,
      });

      console.log('Response:', response.data); // Log the response for debugging

      if (response.data.token) {
        Alert.alert('Success', 'Login successful!');
        // Navigate to another screen or save token in secure storage
      } else {
        Alert.alert('Error', response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Redirect to password recovery page.');
  };

  return (
    <View style={styles.outerContainer}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/amerisBankLogo.png')}
      />
      <Text style={styles.title}>Ameris Bank Healthcare Financing</Text>
      <TextInput
        style={styles.input}
        placeholder="Email ID"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="#aaa" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.footerText}>
        Terms of Service | Privacy Policy | FAQ
      </Text>
      <Text style={styles.poweredBy}>Powered by</Text>
      <Image
        style={styles.poweredByLogo}
        source={require('../../assets/images/iVitaFi.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFFFF',
    padding: 16,
  },
  logo: {
    width: 91,
    height: 95,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    color: '#141218',
    fontSize: 24,
    fontFamily: 'Montserrat',
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: 0.20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: '#FEFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#232126',
    fontSize: 15,
    fontFamily: 'Montserrat',
    fontWeight: '400',
    lineHeight: 30,
    letterSpacing: 0.20,
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1F3644',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Montserrat',
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: 0.20,
  },
  footerText: {
    textAlign: 'center',
    color: '#151616',
    fontSize: 15,
    fontFamily: 'Montserrat',
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: 0.20,
    marginBottom: 20,
  },
  poweredBy: {
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
    fontFamily: 'Montserrat',
    fontWeight: '400',
    lineHeight: 30,
    letterSpacing: 0.20,
    marginBottom: 10,
  },
  poweredByLogo: {
    width: 102,
    height: 37,
  },
});

export default LoginScreen;