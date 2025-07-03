import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, Image, Alert, View } from 'react-native';
import axios from 'axios';
import { estilosGlobales, colores } from '../../styles/estilosGlobales';

const logo = require('../../assets/logo.png');

export default function RegisterScreen({ navigation }: any) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');

  const API_URL = 'http://192.168.18.116:3000/api/users';

  const validarCampos = (): boolean => {
    const soloLetras = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nom = nombre.trim();
    const ape = apellido.trim();
    const corr = correo.trim();

    if (!nom) {
      Alert.alert('Error', 'El campo Nombre es obligatorio.');
      return false;
    }
    if (!soloLetras.test(nom)) {
      Alert.alert('Error', 'El nombre solo debe contener letras.');
      return false;
    }

    if (!ape) {
      Alert.alert('Error', 'El campo Apellido es obligatorio.');
      return false;
    }
    if (!soloLetras.test(ape)) {
      Alert.alert('Error', 'El apellido solo debe contener letras.');
      return false;
    }

    if (!corr) {
      Alert.alert('Error', 'El campo Correo es obligatorio.');
      return false;
    }
    if (!correoValido.test(corr) || !corr.includes('.com')) {
      Alert.alert('Error', 'Correo inválido. Debe contener "@" y terminar en ".com"');
      return false;
    }

    if (!clave) {
      Alert.alert('Error', 'El campo Contraseña es obligatorio.');
      return false;
    }
    if (clave.includes(' ')) {
      Alert.alert('Error', 'La contraseña no debe contener espacios.');
      return false;
    }

    return true;
  };

  const registrar = async () => {
    if (!validarCampos()) return;

    try {
      const res = await axios.post(`${API_URL}/register`, {
        nombre,
        apellido,
        correo,
        clave,
      });

      Alert.alert('Éxito', res.data.message);
      navigation.navigate('Login');
    } catch (error: any) {
      console.error('Error registro:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.message || 'Hubo un problema al registrar. Intenta más tarde.');
    }
  };

  return (
    <SafeAreaView style={estilosGlobales.contenedor}>
      <Image source={logo} style={{ width: 200, height: 200, alignSelf: 'center', marginBottom: 20 }} />
      <Text style={estilosGlobales.titulo}>Registro</Text>

      <TextInput style={estilosGlobales.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={estilosGlobales.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
      <TextInput style={estilosGlobales.input} placeholder="Correo" value={correo} onChangeText={setCorreo} />
      <TextInput style={estilosGlobales.input} placeholder="Contraseña" value={clave} secureTextEntry onChangeText={setClave} />

      <TouchableOpacity style={estilosGlobales.boton} onPress={registrar}>
        <Text style={estilosGlobales.textoBoton}>Registrarse</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 12 }}>
        <TouchableOpacity
          style={{ ...estilosGlobales.boton, backgroundColor: colores.grisClaro }}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{ ...estilosGlobales.textoBoton, color: colores.texto }}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}