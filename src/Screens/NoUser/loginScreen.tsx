//RNFS - Ahhh
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, ImageBackground, StatusBar } from 'react-native'
import React, { useState } from 'react'

import MyButton from '../../Components/MyButton';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const login = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Ingrese un correo válido');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      navigation.navigate('Menu');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Imagen superior */}
          <View style={styles.topSection}>
            <ImageBackground
              source={require('../../assets/pizza.jpg')}
              resizeMode="cover"
              style={styles.imageBackground}
            >
              <View style={styles.overlay} />

              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/logo.png')}
                  resizeMode="contain"
                  style={styles.logo}
                />
              </View>
            </ImageBackground>
          </View>


          <View style={styles.bottomSection}>
            <Text style={styles.title}>🍕 Get a Slice! 🍕</Text>

            <TextInput
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              style={[styles.input, emailError ? styles.inputError : null]}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}

            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[styles.input, passwordError ? styles.inputError : null]}
            />
            {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}

            <MyButton title="Login" onPress={login} />

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.text}>
                <Text style={styles.black}>¿Not a member yet? </Text>
                <Text style={styles.green}>Create a profile</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  logo: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bottomSection: {
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    zIndex: 4,
    height: '60%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16
  },
  inputError: {
    borderColor: 'red'
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 4
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center'
  },
  black: {
    color: '#000'
  },
  green: {
    color: 'green',
    fontWeight: 'bold'
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end', // para que el bottomSection quede abajo
  },
  topSection: {
    height: '40%',
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
    position: 'absolute',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },
});
