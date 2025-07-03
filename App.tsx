import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/Screens/NoUser/loginScreen';
import RegisterScreen from './src/Screens/NoUser/registerScreen';

import MenuScreen from './src/Screens/User/MenuScreen';
import PizzaDetalleScreen from './src/Screens/User/PizzaDetalleScreen';
import PromotionsScreen from './src/Screens/User/PromotionsScreen';
import CustomizePizzaScreen from './src/Screens/User/CustomizePizzaScreen';
import CarroScreen from './src/Screens/User/CarroScreen';
import PerfilScreen from './src/Screens/User/PerfilScreen';

import { CarroProvider } from './src/Components/CarroContext';
import { HistorialProvider } from './src/Components/HistorialContext'; 
import MetodoPagoScreen from './src/Screens/User/MetPago';
import HistorialScreen from './src/Screens/User/HistorialScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <HistorialProvider>
        <CarroProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Menu" component={MenuScreen} options={{headerShown: false}} />
            <Stack.Screen name="PizzaDetalle" component={PizzaDetalleScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Promotions" component={PromotionsScreen}options={{headerShown: false}} />
            <Stack.Screen name="CustomizePizza" component={CustomizePizzaScreen}options={{headerShown: false}} />
            <Stack.Screen name="Carrito" component={CarroScreen}options={{headerShown: false}}/>
            <Stack.Screen name="Perfil" component={PerfilScreen}options={{headerShown: false}}/>
            <Stack.Screen name="Pago" component={MetodoPagoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Historial" component={HistorialScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </CarroProvider>
      </HistorialProvider>
    </NavigationContainer>
  );
}