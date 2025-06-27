import React from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet } from 'react-native';
import { useHistorial } from '../../Components/HistorialContext';

export default function HistorialScreen() {
  const { historial } = useHistorial();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Historial de Pedidos</Text>
      {historial.length === 0 ? (
        <Text style={styles.empty}>No hay pedidos registrados.</Text>
      ) : (
        <FlatList
          data={historial}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.pedidoBox}>
              <Text style={styles.fecha}>{item.fecha}</Text>
              <Text>Método de pago: {item.metodoPago}</Text>
              <Text>Total: S/ {item.total.toFixed(2)}</Text>
              <Text>Productos:</Text>
              {item.productos.map((p, i) => (
                <Text key={i}>• {p.nombre} x {p.cantidad}</Text>
              ))}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  empty: { textAlign: 'center', fontSize: 16, marginTop: 20 },
  pedidoBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  fecha: { fontWeight: 'bold', marginBottom: 4 },
});
