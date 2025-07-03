import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, ImageBackground, StatusBar } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const logo=require('../../assets/logo.png')

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const API_URL = 'http://192.168.18.116:3000/api/users';

  const loginUsuario = async () => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      correo:email,
      clave:password
    });

    const data = res.data;
    console.log('✅ Login exitoso:', data);

    
    Alert.alert('Bienvenido', `Hola ${data.usuario.nombre}`);
    
    //navigation.navigate('Menu')
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Menu',params:{usuario:data.usuario}, },],})
    );
  } catch (error:any) {
    if (error.response?.data?.error) {
      Alert.alert('Error de login', error.response.data.error);
    } else {
      Alert.alert('Error de red', 'No se pudo conectar con el servidor');
    }
    
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={{marginTop:30,width:200, height:200,alignSelf: 'center'}}></Image>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={{marginVertical:8,paddingHorizontal:80}}>
        <Button title="Ingresar" onPress={()=>loginUsuario()} />
      </View>
      <View style={{marginVertical:8,paddingHorizontal:80}}>
        <Button title="¿No tienes cuenta? Regístrate" onPress={() => navigation.navigate('Register')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFCEB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D35400',
    marginBottom: 15,
    marginTop:10,
    textAlign:'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal:30
  },
  itemBox: {
    padding: 10,
    backgroundColor: '#FFF9E5',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    fontSize: 18,
    fontWeight: '600',
  },
});