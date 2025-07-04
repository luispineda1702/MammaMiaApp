import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { estilosGlobales, colores } from '../../styles/estilosGlobales';

const metodosPago = ['Tarjeta', 'Yape', 'Plin', 'Efectivo'];

export default function MetodoPagoScreen({ navigation }: any) {
  const [metodoSeleccionado, setMetodoSeleccionado] = useState<string>(metodosPago[0]);
  const [direccion, setDireccion] = useState('');

  const confirmar = () => {
    if (!direccion.trim()) {
      alert('Por favor ingresa una dirección.');
      return;
    }
    navigation.navigate('ConfirmarPedido', {
      metodo: metodoSeleccionado,
      direccion,
    });
  };

  return (
    <SafeAreaView style={[estilosGlobales.contenedor, styles.container]}>
      <Text style={styles.titulo}>Selecciona método de pago</Text>

      <View style={styles.opcionesContainer}>
        {metodosPago.map((metodo) => (
          <TouchableOpacity
            key={metodo}
            style={[
              styles.opcion,
              metodo === metodoSeleccionado && styles.opcionSeleccionada,
            ]}
            onPress={() => setMetodoSeleccionado(metodo)}
          >
            <Text
              style={[
                styles.textoOpcion,
                metodo === metodoSeleccionado && { color: colores.fondo, fontWeight: '700' },
              ]}
            >
              {metodo}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Dirección de entrega:</Text>
      <TextInput
        style={estilosGlobales.input}
        placeholder="Escribe la dirección"
        value={direccion}
        onChangeText={setDireccion}
      />

      <TouchableOpacity style={[estilosGlobales.boton, styles.boton]} onPress={confirmar}>
        <Text style={estilosGlobales.textoBoton}>Confirmar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: colores.fondo,
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: colores.texto,
    marginVertical: 20,
    textAlign: 'center',
  },
  opcionesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  opcion: {
    borderWidth: 1,
    borderColor: colores.primario,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    marginVertical: 6,
    backgroundColor: colores.fondo,
  },
  opcionSeleccionada: {
    backgroundColor: colores.primario,
  },
  textoOpcion: {
    fontSize: 18,
    color: colores.texto,
  },
  label: {
    fontSize: 18,
    color: colores.texto,
    marginBottom: 8,
  },
  boton: {
    marginTop: 20,
  },
});
