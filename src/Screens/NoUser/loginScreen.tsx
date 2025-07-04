import React, { useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, Alert, Image, View } from 'react-native';
import axios from 'axios';
import { estilosGlobales } from '../../styles/estilosGlobales';
import { useUsuario } from '../../Components/UsuarioContext';

const logo = require('../../assets/logo.png');

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const { setUsuario } = useUsuario();

  const API_URL = 'http://192.168.18.116:3000/api/users';

  const login = async () => {
    if (!correo.trim() || !clave) {
      Alert.alert('Error', 'Por favor ingrese correo y contraseña.');
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/login`, { correo, clave });

      if (res.data.usuario) {
        setUsuario({
          id: res.data.usuario.id,
          nombre: res.data.usuario.nombre,
          apellido: res.data.usuario.apellido,
        });
        navigation.reset({
          index: 0,
          routes: [{ name: 'Menu' }],
        });
      } else {
        Alert.alert('Error', 'Credenciales inválidas');
      }
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo iniciar sesión. Intenta más tarde.');
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <SafeAreaView style={estilosGlobales.contenedor}>
      <View style={{ alignItems: 'center', marginBottom: 40, marginTop: 20 }}>
        <Image source={logo} style={{ width: 180, height: 180, resizeMode: 'contain' }} />
      </View>

      <TextInput
        style={estilosGlobales.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={estilosGlobales.input}
        placeholder="Contraseña"
        value={clave}
        onChangeText={setClave}
        secureTextEntry
      />

      <TouchableOpacity style={estilosGlobales.boton} onPress={login}>
        <Text style={estilosGlobales.textoBoton}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ textAlign: 'center', marginTop: 15, color: '#007bff' }}>
          ¿No tienes cuenta? Regístrate
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
