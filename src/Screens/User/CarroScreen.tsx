import React from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View, Button, TouchableOpacity } from 'react-native';
import { useCarro,Producto } from '../../Components/CarroContext';
import { FontAwesome } from '@expo/vector-icons';

export default function CarroScreen({ navigation }: any) {
  const { carro, eliminarDelCarro, limpiarCarro } = useCarro();

  const totalCompra = carro.reduce((acc, item) => acc + item.total * item.cantidad, 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Botón atrás */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Carrito de Compras</Text>

      {carro.length === 0 ? (
        <Text style={styles.emptyText}>El carrito está vacío</Text>
      ) : (
        <>
          <FlatList
            data={carro}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.nombre}</Text>
                <Text>Cantidad: {item.cantidad}</Text>
                {item.tamanio && <Text>Tamaño: {item.tamanio}</Text>}
                {item.masa && <Text>Masa: {item.masa}</Text>}
                {item.ingredientes && item.ingredientes.length > 0 && (
                  <Text>Ingredientes: {item.ingredientes.join(', ')}</Text>
                )}
                <Text>Precio total: S/ {item.total.toFixed(2)}</Text>
                <Button title="Eliminar" onPress={() => eliminarDelCarro(item.id)} />
              </View>
            )}
          />

          <Text style={styles.total}>Total a pagar: S/ {totalCompra.toFixed(2)}</Text>

          <View style={styles.buttonGroup}>
            <Button title="Pagar" onPress={() => navigation.navigate('Pago')} />
            <Button title="Vaciar carrito" onPress={limpiarCarro} color="red" />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  backButton: {
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
