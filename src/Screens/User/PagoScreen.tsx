import React from 'react';
import { SafeAreaView, StyleSheet, Text, Button, Alert } from 'react-native';
import { useCarro } from '../../Components/CarroContext';

export default function PagoScreen({ navigation, route }: any) {
  const { limpiarCarro } = useCarro();
  const { total } = route.params;

  const confirmarPago = () => {
    Alert.alert('Pago exitoso', `Has pagado S/ ${total.toFixed(2)}`, [
      {
        text: 'Aceptar',
        onPress: () => {
          limpiarCarro();
          navigation.navigate('Menu');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pago</Text>
      <Text style={styles.total}>Total a pagar: S/ {total.toFixed(2)}</Text>
      <Button title="Confirmar Pago" onPress={confirmarPago} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  total: { fontSize: 22, marginBottom: 40 },
});
