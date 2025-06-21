import { Button, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function PizzaDetalleScreen({ route }: any) {
    const { pizza } = route.params;
    const [cantidad, setCantidad] = useState(1);
    const precioFinal = pizza.precioBase * cantidad;
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{pizza.nombre}</Text>
        <Text>Tipo: {pizza.tipo}</Text>
        <Text>Precio unitario: S/ {pizza.precioBase}</Text>
  
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Cantidad"
          value={cantidad.toString()}
          onChangeText={(value) => setCantidad(parseInt(value) || 1)}
        />
        <Text style={styles.title}>Total: S/ {precioFinal.toFixed(2)}</Text>
        <Button title="Agregar al pedido" onPress={() => alert('Agregado')} />
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