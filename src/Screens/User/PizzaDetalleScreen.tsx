import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useCarro } from '../../Components/CarroContext';
import { estilosGlobales, colores } from '../../styles/estilosGlobales';

export default function PizzaDetalleScreen({ route, navigation }: any) {
  const { pizza } = route.params;
  const [cantidadTexto, setCantidadTexto] = useState('1');

  const { agregarAlCarro } = useCarro();

  const precioBaseNum = Number(pizza.precioBase);
  const cantidad = parseInt(cantidadTexto) || 0;
  const precioFinal = precioBaseNum * cantidad;

  const agregar = () => {
    if (cantidad < 1) {
      Alert.alert('Error', 'La cantidad debe ser mayor que 0');
      return;
    }

    agregarAlCarro({
      nombre: pizza.nombre,
      tipo: 'Normal',
      cantidad,
      total: precioFinal,
    });

    navigation.navigate('Carrito');
  };

  return (
    <SafeAreaView style={estilosGlobales.contenedor}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color={colores.texto} />
      </TouchableOpacity>

      <Text style={estilosGlobales.titulo}>{pizza.nombre}</Text>
      <Text style={styles.subtexto}>Precio unitario: S/ {precioBaseNum.toFixed(2)}</Text>

      <TextInput
        style={estilosGlobales.input}
        keyboardType="numeric"
        placeholder="Cantidad"
        value={cantidadTexto}
        onChangeText={setCantidadTexto}
      />

      <Text style={styles.total}>Total: S/ {precioFinal.toFixed(2)}</Text>

      <TouchableOpacity style={estilosGlobales.boton} onPress={agregar}>
        <Text style={estilosGlobales.textoBoton}>Agregar al pedido</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  subtexto: {
    fontSize: 18,
    color: colores.texto,
    marginBottom: 6,
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colores.primario,
    marginTop: 20,
    marginBottom: 20,
  },
});
