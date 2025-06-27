import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useCarro,Producto } from '../../Components/CarroContext';

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
  { id: 'champiñones', nombre: 'Champiñones', precio: 6 },
];

type Tamaño = 'Familiar' | 'Personal';

export default function CustomizePizzaScreen({ navigation }: any) {
  const { agregarAlCarro } = useCarro();

  const [pizzaSeleccionada, setPizzaSeleccionada] = useState(pizzas[0]);
  const [tamanioSeleccionado, setTamanioSeleccionado] = useState<Tamaño>('Personal');
  const [masaSeleccionada, setMasaSeleccionada] = useState(masas[0]);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState<string[]>([]);
  const [cantidad, setCantidad] = useState(1);

  const precioBase = pizzaSeleccionada.precios[tamanioSeleccionado];

  const precioIngredientes = ingredientesSeleccionados.reduce((acc, id) => {
    const ing = ingredientesDisponibles.find(i => i.id === id);
    return ing ? acc + ing.precio : acc;
  }, 0);

  const precioTotal = (precioBase + masaSeleccionada.precioExtra + precioIngredientes) * cantidad;

  const toggleIngrediente = (id: string) => {
    setIngredientesSeleccionados(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const agregarPizzaPersonalizada = () => {
    const pizzaPersonalizada: Omit<Producto, 'id'> = {
      nombre: 'Pizza personalizada',
      tipo: pizzaSeleccionada.nombre,
      tamanio: tamanioSeleccionado,
      masa: masaSeleccionada.nombre,
      cantidad,
      ingredientes: ingredientesSeleccionados
        .map(id => ingredientesDisponibles.find(i => i.id === id)?.nombre)
        .filter((n): n is string => !!n),
      total: precioTotal,
    };
    agregarAlCarro(pizzaPersonalizada);
    navigation.navigate('Carrito');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Personaliza tu Pizza</Text>

        <Text style={styles.subTitle}>Selecciona pizza:</Text>
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
              <Text style={styles.optionText}>{p.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subTitle}>Selecciona tamaño:</Text>
        <View style={styles.optionsContainer}>
          {tamanos.map(t => (
            <TouchableOpacity
              key={t}
              style={[
                styles.optionButton,
                t === tamanioSeleccionado && styles.optionSelected,
              ]}
              onPress={() => setTamanioSeleccionado(t)}
            >
              <Text style={styles.optionText}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subTitle}>Selecciona masa:</Text>
        <View style={styles.optionsContainer}>
          {masas.map(m => (
            <TouchableOpacity
              key={m.id}
              style={[
                styles.optionButton,
                m.id === masaSeleccionada.id && styles.optionSelected,
              ]}
              onPress={() => setMasaSeleccionada(m)}
            >
              <Text style={styles.optionText}>
                {m.nombre} {m.precioExtra > 0 ? `(+S/ ${m.precioExtra})` : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subTitle}>Selecciona ingredientes:</Text>
        {ingredientesDisponibles.map(item => {
          const seleccionado = ingredientesSeleccionados.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.optionButton, seleccionado && styles.optionSelected]}
              onPress={() => toggleIngrediente(item.id)}
            >
              <Text style={styles.optionText}>
                {item.nombre} (+S/ {item.precio})
              </Text>
            </TouchableOpacity>
          );
        })}

        <View style={{ marginVertical: 10 }}>
          <Text style={styles.subTitle}>Cantidad:</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              title="-"
              onPress={() => setCantidad(prev => (prev > 1 ? prev - 1 : 1))}
            />
            <Text style={{ fontSize: 18, marginHorizontal: 20 }}>{cantidad}</Text>
            <Button title="+" onPress={() => setCantidad(prev => prev + 1)} />
          </View>
        </View>

        <Text style={styles.totalPrice}>Precio total: S/ {precioTotal.toFixed(2)}</Text>

        <Button title="Agregar al pedido" onPress={agregarPizzaPersonalizada} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: {
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  subTitle: { fontSize: 18, marginTop: 12, marginBottom: 6 },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    justifyContent: 'center',
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#666',
    marginHorizontal: 6,
    marginVertical: 4,
  },
  optionSelected: {
    backgroundColor: '#4caf50',
    borderColor: '#388e3c',
  },
  optionText: {
    color: '#000',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});
