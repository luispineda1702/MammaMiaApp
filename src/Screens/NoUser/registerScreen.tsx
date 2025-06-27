import { Button, SafeAreaView, StyleSheet, Text, TextInput ,Image, View} from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';

const logo=require('../../assets/logo.png')

export default function RegisterScreen({ navigation }: any) {
    const [name, setName] = useState('');
    const [lastname, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const API_URL = 'http://192.168.18.116:3000/api/users';

    const validarCampos = () => {
      const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
      const emailValido = /^[^\s@]+@[^\s@]+\.(com)$/;
      const sinEspacios = /^\S+$/;

      if (!soloLetras.test(name.trim())) {
        alert('El nombre solo debe contener letras');
        return false;
      }

      if (!soloLetras.test(lastname.trim())) {
        alert('El apellido solo debe contener letras');
        return false;
      }

      if (!emailValido.test(email.trim())) {
        alert('Correo inválido. Debe contener @ y terminar en .com');
        return false;
      }

      if (!sinEspacios.test(password)) {
        alert('La contraseña no debe contener espacios');
        return false;
      }

      return true;
      };

      const registrarUsuario = async () => {
        if (!validarCampos()) return;
        try {
          const res = await axios.post(`${API_URL}/register`, {
            nombre:name,
            apellido:lastname,
            correo: email,
            clave: password
          });
          console.log(res.data);
          alert(res.data.message);
          navigation.navigate('Login')
        } catch (error:any) {
          console.error(error.response?.data || error.message);
          alert('Error al registrar');
        }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Image source={logo} style={{marginTop:30,width:200, height:200,alignSelf: 'center'}}></Image>
        <Text style={styles.title}>Registro</Text>
        <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Apellido" value={lastname} onChangeText={setlastName} />
        <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={{marginVertical:8,paddingHorizontal:80}}>
          <Button title="Registrarse" onPress={() =>registrarUsuario()} />
        </View>
        <View style={{marginVertical:8,paddingHorizontal:80}}>
          <Button title="Cancelar" onPress={() => navigation.navigate('Login')} />
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