import { Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function MenuScreen({ navigation }: any) {
    const productos = [
      { id: '1', nombre: 'Pizza Clásica', tipo: 'Familiar', precioBase: 30 },
      { id: '2', nombre: 'Pizza Pepperoni', tipo: 'Individual', precioBase: 18 },
      { id: '3', nombre: 'Pizza Vegetariana', tipo: 'Familiar', precioBase: 28 },
      { id: '4', nombre: 'Pizza Mixta', tipo: 'Individual', precioBase: 20 },
    ];
  
    const [filtro, setFiltro] = useState<string | null>(null);
    const filtrados = filtro
      ? productos.filter((p) => p.tipo.toLowerCase() === filtro.toLowerCase())
      : productos;
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Menú de Pizzas</Text>
  
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
          <Button title="Todos" onPress={() => setFiltro(null)} />
          <Button title="Familiar" onPress={() => setFiltro('Familiar')} />
          <Button title="Individual" onPress={() => setFiltro('Individual')} />
        </View>
  
        <FlatList
          data={filtrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('PizzaDetalle', { pizza: item })}
              style={styles.itemBox}
            >
              <Text style={styles.item}>{item.nombre}</Text>
              <Text>Tipo: {item.tipo}</Text>
              <Text>Precio base: S/ {item.precioBase.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
        />
  
        <Button title="Ver Promociones" onPress={() => navigation.navigate('Promotions')} />
        <Button title="Personalizar Pizza" onPress={() => navigation.navigate('CustomizePizza')} />
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
  