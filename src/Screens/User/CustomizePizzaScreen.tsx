import { Button, SafeAreaView, StyleSheet, Text, TextInput} from 'react-native'
import React, { useState } from 'react'

export default function CustomizePizzaScreen() {
    const [ingredientes, setIngredientes] = useState<string[]>([]);
    const [nuevoIngrediente, setNuevoIngrediente] = useState('');
    const [pedido, setPedido] = useState<string[][]>([]);
  
    const MAX_INGREDIENTES = 3;
    const combinacionesInvalidas = [
      ['piña', 'pepperoni'],
      ['anchoas', 'dulce'],
    ];
  
    const agregarIngrediente = () => {
      const ing = nuevoIngrediente.trim().toLowerCase();
  
      if (!ing) {
        alert('Ingrese un ingrediente válido');
        return;
      }
  
      if (ingredientes.includes(ing)) {
        alert('Ingrediente ya agregado');
        return;
      }
  
      if (ingredientes.length >= MAX_INGREDIENTES) {
        alert(`Máximo ${MAX_INGREDIENTES} ingredientes`);
        return;
      }
  
      const tempLista = [...ingredientes, ing];
  
      const invalida = combinacionesInvalidas.some((combo) =>
        combo.every((c) => tempLista.includes(c))
      );
  
      if (invalida) {
        alert('Esa combinación de ingredientes no es válida');
        return;
      }
  
      setIngredientes(tempLista);
      setNuevoIngrediente('');
    };
  
    const guardarPizza = () => {
      if (ingredientes.length === 0) {
        alert('Agregue al menos un ingrediente');
        return;
      }
  
      const nuevaPizza = [...ingredientes];
      setPedido([...pedido, nuevaPizza]);
      setIngredientes([]);
      alert(`Pizza personalizada guardada:\n${nuevaPizza.join(', ')}`);
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Personaliza tu Pizza</Text>
  
        <TextInput
          style={styles.input}
          placeholder="Ej: champiñones, jamón"
          value={nuevoIngrediente}
          onChangeText={setNuevoIngrediente}
        />
        <Button title="Agregar Ingrediente" onPress={agregarIngrediente} />
  
        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Ingredientes actuales:</Text>
        {ingredientes.map((ing, idx) => (
          <Text key={idx}>- {ing}</Text>
        ))}
  
        <Button
          title="Guardar Pizza"
          onPress={guardarPizza}
          disabled={ingredientes.length === 0}
        />
  
        <Text style={{ marginTop: 15, fontWeight: 'bold' }}>Pedido actual:</Text>
        {pedido.map((pizza, i) => (
          <Text key={i}>
            🍕 Pizza {i + 1}: {pizza.join(', ')}
          </Text>
        ))}
      </SafeAreaView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#FFFCEB',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#D35400',
      marginBottom: 15,
    },
    input: {
      borderWidth: 1,
      borderColor: '#CCC',
      backgroundColor: '#FFF',
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
    },
    itemBox: {
      padding: 10,
      backgroundColor: '#FFF9E5',
      borderRadius: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    item: {
      fontSize: 18,
      fontWeight: '600',
    },
  });