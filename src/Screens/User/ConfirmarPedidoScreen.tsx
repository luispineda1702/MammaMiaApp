import React from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useCarro } from '../../Components/CarroContext';
import { useUsuario } from '../../Components/UsuarioContext';
import { estilosGlobales, colores } from '../../styles/estilosGlobales';

export default function ConfirmarPedidoScreen({ route, navigation }: any) {
  const { carro, limpiarCarro } = useCarro();
  const { usuario } = useUsuario();
  const { metodo, direccion } = route.params;

  const total = carro.reduce((acc: number, item) => acc + item.total, 0);

  const confirmar = async () => {
    if (!usuario) {
      Alert.alert('Error', 'Debes iniciar sesión para confirmar el pedido.');
      return;
    }

    try {
      await axios.post('http://192.168.18.116:3000/api/pedidos', {
        usuarioId: usuario.id,
        direccion,
        metodoPago: metodo,
        total,
        productos: carro,
      });

      limpiarCarro();
      Alert.alert('Éxito', 'Pedido confirmado');
      navigation.navigate('Perfil');
    } catch (e) {
      console.error('Error al confirmar pedido', e);
      Alert.alert('Error', 'No se pudo confirmar el pedido.');
    }
  };

  return (
    <SafeAreaView style={[estilosGlobales.contenedor, styles.container]}>
      <Text style={styles.titulo}>Confirmar Pedido</Text>
      <Text style={styles.texto}>Dirección: {direccion}</Text>
      <Text style={styles.texto}>Método de pago: {metodo}</Text>
      <Text style={styles.texto}>Total: S/ {total.toFixed(2)}</Text>

      <TouchableOpacity style={[estilosGlobales.boton, styles.boton]} onPress={confirmar}>
        <Text style={estilosGlobales.textoBoton}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colores.fondo,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: colores.texto,
    marginBottom: 20,
    textAlign: 'center',
  },
  texto: {
    fontSize: 18,
    color: colores.texto,
    marginBottom: 10,
  },
  boton: {
    marginTop: 30,
  },
});
