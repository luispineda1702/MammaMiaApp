import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useCarro, Producto } from '../../Components/CarroContext';
import { estilosGlobales, colores } from '../../styles/estilosGlobales';

const CARD_WIDTH = Dimensions.get('screen').width * 0.9;

export default function CarritoScreen({ navigation }: any) {
  const { carro } = useCarro();
  const total = carro.reduce((acc: number, item) => acc + item.total, 0);

  return (
    <SafeAreaView style={[estilosGlobales.contenedor, styles.container]}>
      <FlatList
        data={carro}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            {item.tipo && <Text style={styles.texto}>Tipo: {item.tipo}</Text>}
            {item.tamanio && <Text style={styles.texto}>Tamaño: {item.tamanio}</Text>}
            {item.masa && <Text style={styles.texto}>Masa: {item.masa}</Text>}
            {item.ingredientes && item.ingredientes.length > 0 && (
              <Text style={styles.texto}>Ingredientes: {item.ingredientes.join(', ')}</Text>
            )}
            <Text style={styles.total}>Subtotal: S/ {item.total.toFixed(2)}</Text>
          </View>
        )}
      />

      <Text style={styles.totalFinal}>Total: S/ {total.toFixed(2)}</Text>

      <TouchableOpacity
        style={[estilosGlobales.boton, styles.boton]}
        onPress={() => navigation.navigate('MetodoPago')}
      >
        <Text style={estilosGlobales.textoBoton}>Pagar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colores.fondo,
  },
  lista: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: colores.grisClaro,
    width: CARD_WIDTH,
    alignSelf: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderColor: colores.borde,
    borderWidth: 1,
  },
  nombre: {
    fontSize: 20,
    fontWeight: '700',
    color: colores.texto,
    marginBottom: 4,
  },
  texto: {
    fontSize: 16,
    color: colores.texto,
    marginBottom: 2,
  },
  total: {
    fontSize: 16,
    fontWeight: '700',
    color: colores.texto,
    marginTop: 8,
  },
  totalFinal: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: colores.texto,
    marginVertical: 20,
  },
  boton: {
    width: CARD_WIDTH,
    alignSelf: 'center',
  },
});
