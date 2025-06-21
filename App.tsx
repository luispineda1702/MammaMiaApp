import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/Screens/NoUser/loginScreen';
import RegisterScreen from './src/Screens/NoUser/registerScreen';

import MenuScreen from './src/Screens/User/MenuScreen';
import PizzaDetalleScreen from './src/Screens/User/PizzaDetalleScreen';
import PromotionsScreen from './src/Screens/User/PromotionsScreen';
import CustomizePizzaScreen from './src/Screens/User/CustomizePizzaScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="PizzaDetalle" component={PizzaDetalleScreen} />
        <Stack.Screen name="Promotions" component={PromotionsScreen} />
        <Stack.Screen name="CustomizePizza" component={CustomizePizzaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}