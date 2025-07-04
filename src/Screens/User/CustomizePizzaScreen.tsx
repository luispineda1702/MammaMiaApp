import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useCarro, Producto } from '../../Components/CarroContext';
import { useUsuario } from '../../Components/UsuarioContext';
import { estilosGlobales, colores } from '../../styles/estilosGlobales';

const CARD_WIDTH = Dimensions.get('screen').width * 0.9;

const pizzas = [
  { id: 'clasica', nombre: 'Clásica', precios: { Familiar: 30, Personal: 20 } },
  { id: 'pepperoni', nombre: 'Pepperoni', precios: { Familiar: 30, Personal: 20 } },
  { id: 'vegetariana', nombre: 'Vegetariana', precios: { Familiar: 30, Personal: 20 } },
  { id: 'mixta', nombre: 'Mixta', precios: { Familiar: 30, Personal: 20 } },
];

const tamanos: ('Familiar' | 'Personal')[] = ['Familiar', 'Personal'];

const masas = [
  { id: 'normal', nombre: 'Normal', precioExtra: 0 },
  { id: 'gruesa', nombre: 'Gruesa', precioExtra: 5 },
  { id: 'integral', nombre: 'Integral', precioExtra: 7 },
];

const ingredientesDisponibles = [
  { id: 'queso_extra', nombre: 'Queso Extra', precio: 5 },
  { id: 'jamon', nombre: 'Jamón', precio: 7 },
  { id: 'tocino', nombre: 'Tocino', precio: 8 },
  { id: 'aceitunas', nombre: 'Aceitunas', precio: 4 },
  { id: 'champinones', nombre: 'Champiñones', precio: 6 },
];

type Tamaño = 'Familiar' | 'Personal';

export default function CustomizePizzaScreen({ navigation }: any) {
  const { agregarAlCarro } = useCarro();
  const { usuario } = useUsuario();

  const [pizzaSeleccionada, setPizzaSeleccionada] = useState(pizzas[0]);
  const [tamanioSeleccionado, setTamanioSeleccionado] = useState<Tamaño>('Personal');
  const [masaSeleccionada, setMasaSeleccionada] = useState(masas[0]);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState<string[]>([]);
  const [cantidad, setCantidad] = useState(1);

  const precioBase = pizzaSeleccionada.precios[tamanioSeleccionado];
  const precioIngredientes = ingredientesSeleccionados.reduce((acc, id) => {
    const found = ingredientesDisponibles.find(i => i.id === id);
    return found ? acc + found.precio : acc;
  }, 0);
  const precioTotal = (precioBase + masaSeleccionada.precioExtra + precioIngredientes) * cantidad;

  const toggleIngrediente = (id: string) => {
    setIngredientesSeleccionados(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const agregarPizzaPersonalizada = () => {
    if (!usuario) {
      alert('Debes iniciar sesión para hacer un pedido.');
      return;
    }

    const pizzaPersonalizada: Omit<Producto, 'id'> = {
      nombre: 'Pizza personalizada',
      tipo: 'Personalizada',
      tamanio: tamanioSeleccionado,
      masa: masaSeleccionada.nombre,
      cantidad,
      ingredientes: ingredientesSeleccionados
        .map(id => ingredientesDisponibles.find(i => i.id === id)?.nombre)
        .filter(Boolean) as string[],
      total: precioTotal,
    };

    agregarAlCarro(pizzaPersonalizada);
    navigation.navigate('Carrito');
  };

  return (
    <SafeAreaView style={[estilosGlobales.contenedor, styles.container]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color={colores.primario} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personaliza tu Pizza</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Selecciona pizza:</Text>
        <View style={styles.optionsContainer}>
          {pizzas.map(p => (
            <TouchableOpacity
              key={p.id}
              style={[
                styles.optionButton,
                p.id === pizzaSeleccionada.id && styles.optionSelected,
              ]}
              onPress={() => setPizzaSeleccionada(p)}
            >
              <Text style={[styles.optionText, p.id === pizzaSeleccionada.id && { color: colores.fondo, fontWeight: '700' }]}>
                {p.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Selecciona tamaño:</Text>
        <View style={styles.optionsContainer}>
          {tamanos.map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.optionButton, t === tamanioSeleccionado && styles.optionSelected]}
              onPress={() => setTamanioSeleccionado(t)}
            >
              <Text style={[styles.optionText, t === tamanioSeleccionado && { color: colores.fondo, fontWeight: '700' }]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Selecciona masa:</Text>
        <View style={styles.optionsContainer}>
          {masas.map(m => (
            <TouchableOpacity
              key={m.id}
              style={[styles.optionButton, m.id === masaSeleccionada.id && styles.optionSelected]}
              onPress={() => setMasaSeleccionada(m)}
            >
              <Text style={[styles.optionText, m.id === masaSeleccionada.id && { color: colores.fondo, fontWeight: '700' }]}>
                {m.nombre}{m.precioExtra > 0 ? ` (+S/ ${m.precioExtra})` : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Selecciona ingredientes:</Text>
        {ingredientesDisponibles.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.optionButton, ingredientesSeleccionados.includes(item.id) && styles.optionSelected]}
            onPress={() => toggleIngrediente(item.id)}
          >
            <Text style={[styles.optionText, ingredientesSeleccionados.includes(item.id) && { color: colores.fondo, fontWeight: '700' }]}>
              {item.nombre} (+S/ {item.precio})
            </Text>
          </TouchableOpacity>
        ))}

        <View style={styles.cantidadContainer}>
          <Text style={styles.sectionTitle}>Cantidad:</Text>
          <View style={styles.cantidadButtons}>
            <TouchableOpacity
              style={[estilosGlobales.boton, styles.cantidadBtn]}
              onPress={() => setCantidad(prev => (prev > 1 ? prev - 1 : 1))}
            >
              <Text style={estilosGlobales.textoBoton}>‑</Text>
            </TouchableOpacity>
            <Text style={styles.cantidadTexto}>{cantidad}</Text>
            <TouchableOpacity
              style={[estilosGlobales.boton, styles.cantidadBtn]}
              onPress={() => setCantidad(prev => prev + 1)}
            >
              <Text style={estilosGlobales.textoBoton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.totalPrice}>Precio total: S/ {precioTotal.toFixed(2)}</Text>

        <TouchableOpacity style={[estilosGlobales.boton, styles.agregarBtn]} onPress={agregarPizzaPersonalizada}>
          <Text style={estilosGlobales.textoBoton}>Agregar al pedido</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colores.fondo,
  },
  header: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colores.texto,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 8,
    color: colores.texto,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 12,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colores.primario,
    margin: 4,
    backgroundColor: colores.fondo,
  },
  optionSelected: {
    backgroundColor: colores.primario,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colores.texto,
  },
  cantidadContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  cantidadButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  cantidadBtn: {
    width: 50,
    height: 40,
    borderRadius: 8,
    marginHorizontal: 12,
    backgroundColor: colores.primario,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cantidadTexto: {
    fontSize: 20,
    fontWeight: '700',
    color: colores.texto,
    minWidth: 40,
    textAlign: 'center',
    lineHeight: 40,
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
    color: colores.texto,
  },
  agregarBtn: {
    alignSelf: 'center',
    width: CARD_WIDTH,
  },
});
