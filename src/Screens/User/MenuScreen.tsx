import { Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState , useEffect} from 'react'
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Usa esto si estás con Expo

export default function MenuScreen({ navigation ,route}: any) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  useEffect(() => {
    if (route.params?.usuario) {
      setNombre(route.params.usuario.nombre);
      setApellido(route.params.usuario.apellido);
    }
  }, [route.params]);

  const cerrarSesion = () => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  );
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.greeting}>Hola {nombre} {apellido}</Text>
        <View style={styles.iconGroup}>
        <TouchableOpacity onPress={() => navigation.navigate('Carrito')}>
          <FontAwesome name="shopping-cart" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={cerrarSesion}>
          <MaterialIcons name="power-settings-new" size={24} color="red" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
      <Text style={styles.title}>Menú de Pizzas</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
        <Button title="Todos" onPress={() => setFiltro(null)} />
        <Button title="Familiar" onPress={() => setFiltro('Familiar')} />
        <Button title="Individual" onPress={() => setFiltro('Individual')} />
      </View>

      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('PizzaDetalle', { pizza: item })}
            style={styles.itemBox}
          >
            <Text style={styles.item}>{item.nombre}</Text>
            <Text>Tipo: {item.tipo}</Text>
            <Text>Precio base: S/ {item.precioBase.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />

      <Button title="Ver Promociones" onPress={() => navigation.navigate('Promotions')} />
      <Button title="Personalizar Pizza" onPress={() => navigation.navigate('CustomizePizza')} />
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
    marginTop:10,
    textAlign:'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal:30
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop:15,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 8,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 16,
  },
});
  