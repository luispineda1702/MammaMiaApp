import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="PizzaDetalle" component={PizzaDetalleScreen} />
        <Stack.Screen name="Promotions" component={PromotionsScreen} />
        <Stack.Screen name="CustomizePizza" component={CustomizePizzaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ------------------------------ Login
function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    if (email && password) navigation.navigate('Menu');
    else alert('Ingrese sus datos');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Ingresar" onPress={login} />
      <Button title="¿No tienes cuenta? Regístrate" onPress={() => navigation.navigate('Register')} />
    </SafeAreaView>
  );
}

// ------------------------------ Registro
function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Registrarse" onPress={() => navigation.navigate('Login')} />
    </SafeAreaView>
  );
}

// ------------------------------ Menú con filtro y precio
function MenuScreen({ navigation }: any) {
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

// ------------------------------ Detalle con precio dinámico
function PizzaDetalleScreen({ route }: any) {
  const { pizza } = route.params;
  const [cantidad, setCantidad] = useState(1);
  const precioFinal = pizza.precioBase * cantidad;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{pizza.nombre}</Text>
      <Text>Tipo: {pizza.tipo}</Text>
      <Text>Precio unitario: S/ {pizza.precioBase}</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Cantidad"
        value={cantidad.toString()}
        onChangeText={(value) => setCantidad(parseInt(value) || 1)}
      />
      <Text style={styles.title}>Total: S/ {precioFinal.toFixed(2)}</Text>
      <Button title="Agregar al pedido" onPress={() => alert('Agregado')} />
    </SafeAreaView>
  );
}

// ------------------------------ Promociones
function PromotionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Promociones</Text>
      <Text style={styles.item}>🎉 2x1 en Pizza Familiar</Text>
      <Text style={styles.item}>🍕 Pizza + Gaseosa por S/ 25</Text>
    </SafeAreaView>
  );
}

// ------------------------------ Personalizar con restricciones y guardado
function CustomizePizzaScreen() {
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

// ------------------------------ Estilos
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
