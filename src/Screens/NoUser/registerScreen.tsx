import { Button, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function RegisterScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Registrarse" onPress={() => navigation.navigate('Login')} />
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
    },
    input: {
      borderWidth: 1,
      borderColor: '#CCC',
      backgroundColor: '#FFF',
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
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
  