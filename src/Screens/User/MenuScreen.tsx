import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { estilosGlobales, colores } from '../../styles/estilosGlobales';
import { useUsuario } from '../../Components/UsuarioContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

export default function MenuScreen({ navigation }: any) {
  const { usuario } = useUsuario();

  const nombre = usuario?.nombre || '';
  const apellido = usuario?.apellido || '';

  const cerrarSesion = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

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

  // Componente para header (saludo + filtros)
  const ListHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hola {nombre} {apellido}
        </Text>
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.iconButton}>
            <FontAwesome name="user-circle" size={34} color={colores.texto} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Carrito')} style={styles.iconButton}>
            <FontAwesome name="shopping-cart" size={34} color={colores.texto} />
          </TouchableOpacity>
          <TouchableOpacity onPress={cerrarSesion} style={styles.iconButton}>
            <MaterialIcons name="power-settings-new" size={34} color={colores.primario} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filtroBotones}>
        <TouchableOpacity
          style={[styles.filtroBoton, filtro === null && styles.filtroSeleccionado]}
          onPress={() => setFiltro(null)}
        >
          <Text style={[styles.filtroTexto, filtro === null && styles.textoSeleccionado]}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filtroBoton, filtro === 'Familiar' && styles.filtroSeleccionado]}
          onPress={() => setFiltro('Familiar')}
        >
          <Text style={[styles.filtroTexto, filtro === 'Familiar' && styles.textoSeleccionado]}>Familiar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filtroBoton, filtro === 'Individual' && styles.filtroSeleccionado]}
          onPress={() => setFiltro('Individual')}
        >
          <Text style={[styles.filtroTexto, filtro === 'Individual' && styles.textoSeleccionado]}>Individual</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  // Componente para footer (botones)
  const ListFooter = () => (
    <View style={styles.botonesInferiores}>
      <TouchableOpacity
        style={[estilosGlobales.boton, { width: '45%' }]}
        onPress={() => navigation.navigate('Promotions')}
      >
        <Text style={estilosGlobales.textoBoton}>Ver Promociones</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[estilosGlobales.boton, { width: '45%' }]}
        onPress={() => navigation.navigate('CustomizePizza')}
      >
        <Text style={estilosGlobales.textoBoton}>Personalizar Pizza</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={estilosGlobales.contenedor}>
      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, alignItems: 'center' }}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('PizzaDetalle', { pizza: item })}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>{item.nombre}</Text>
            <Text style={styles.cardText}>Tipo: {item.tipo}</Text>
            <Text style={styles.cardText}>Precio base: S/ {item.precioBase.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 15, // para no chocar con barra status
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: colores.texto,
    flex: 1,
  },
  iconGroup: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 20,
  },
  filtroBotones: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
  },
  filtroBoton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colores.primario,
    backgroundColor: colores.fondo,
  },
  filtroSeleccionado: {
    backgroundColor: colores.primario,
  },
  filtroTexto: {
    color: colores.primario,
    fontWeight: '600',
  },
  textoSeleccionado: {
    color: colores.fondo,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colores.grisClaro,
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colores.texto,
    marginBottom: 6,
  },
  cardText: {
    fontSize: 16,
    color: colores.texto,
  },
  botonesInferiores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: CARD_WIDTH,
    marginTop: 20,
  },
});
