import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useCarro } from '../../Components/CarroContext';
import { estilosGlobales, colores } from '../../styles/estilosGlobales';

interface Promocion {
  id: number;
  titulo: string;
  descripcion: string;
  precio: string;
}

export default function PromotionsScreen({ navigation }: any) {
  const [promos, setPromos] = useState<Promocion[]>([]);
  const [cargando, setCargando] = useState(true);
  const { agregarAlCarro } = useCarro();

  useEffect(() => {
    axios
      .get('http://192.168.18.116:3000/api/promociones')
      .then(res => setPromos(res.data))
      .catch(err => console.error('Error al obtener promociones:', err))
      .finally(() => setCargando(false));
  }, []);

  const agregarPromo = (promo: Promocion) => {
    agregarAlCarro({
      nombre: promo.titulo,
      tipo: 'Promoción',
      cantidad: 1,
      total: parseFloat(promo.precio),
    });
    navigation.navigate('Carrito');
  };

  if (cargando) {
    return (
      <SafeAreaView style={estilosGlobales.contenedor}>
        <ActivityIndicator size="large" color={colores.primario} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilosGlobales.contenedor}>
      <Text style={estilosGlobales.titulo}>Promociones</Text>
      <FlatList
        data={promos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
            <Text style={styles.precio}>S/ {parseFloat(item.precio).toFixed(2)}</Text>
            <TouchableOpacity style={estilosGlobales.boton} onPress={() => agregarPromo(item)}>
              <Text style={estilosGlobales.textoBoton}>Agregar al carrito</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>No hay promociones disponibles</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colores.grisClaro,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colores.texto,
    marginBottom: 5,
  },
  descripcion: {
    fontSize: 16,
    color: colores.texto,
    marginBottom: 8,
  },
  precio: {
    fontSize: 18,
    fontWeight: '600',
    color: colores.primario,
    marginBottom: 10,
  },
});
