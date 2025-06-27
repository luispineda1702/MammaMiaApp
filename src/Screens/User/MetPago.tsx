import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  View,
} from 'react-native';
import { useCarro } from '../../Components/CarroContext';
import { useHistorial } from '../../Components/HistorialContext';

export default function MetodoPagoScreen({ navigation }: any) {
  const [metodoPago, setMetodoPago] = useState<string | null>(null);
  const { carro, limpiarCarro, total } = useCarro();
  const { agregarPedido } = useHistorial();

  const confirmarPago = () => {
    if (!metodoPago) {
      Alert.alert('Error', 'Seleccione un método de pago');
      return;
    }

    if (carro.length === 0) {
      Alert.alert('Error', 'El carrito está vacío');
      return;
    }

    const productosParaPedido = carro.map(({ nombre, cantidad, total }) => ({
      nombre,
      cantidad,
      precio: total,
    }));

    const nuevoPedido = {
      id: Date.now(),
      fecha: new Date().toLocaleString(),
      productos: productosParaPedido,
      total,
      metodoPago,
    };

    agregarPedido(nuevoPedido);
    limpiarCarro();
    Alert.alert('Éxito', 'Pago realizado correctamente', [
      { text: 'OK', onPress: () => navigation.navigate('Perfil') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Selecciona método de pago</Text>

      {['Tarjeta', 'Yape', 'Plin', 'Efectivo'].map((metodo) => (
        <TouchableOpacity
          key={metodo}
          style={[styles.option, metodoPago === metodo && styles.selected]}
          onPress={() => setMetodoPago(metodo)}
        >
          <Text>{metodo}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.resumenTitle}>Resumen del pedido:</Text>
      <ScrollView style={styles.resumenContainer}>
        {carro.map((prod) => (
          <View key={prod.id} style={styles.productoRow}>
            <Text>{prod.nombre} x {prod.cantidad}</Text>
            <Text>S/ {prod.total.toFixed(2)}</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalTexto}>Total:</Text>
          <Text style={styles.totalPrecio}>S/ {total.toFixed(2)}</Text>
        </View>
      </ScrollView>

      <Button title="Confirmar pago" onPress={confirmarPago} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
  option: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 8,
  },
  selected: {
    backgroundColor: '#aee',
  },
  resumenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  resumenContainer: {
    maxHeight: 180,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  productoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 6,
  },
  totalTexto: { fontWeight: 'bold', fontSize: 16 },
  totalPrecio: { fontWeight: 'bold', fontSize: 16 },
});
