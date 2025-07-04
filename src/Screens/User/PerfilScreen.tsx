import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useUsuario } from '../../Components/UsuarioContext';
import { estilosGlobales, colores } from '../../styles/estilosGlobales';
import { FontAwesome } from '@expo/vector-icons';

export default function PerfilScreen({ navigation }: any) {
  const { usuario } = useUsuario();

  return (
    <SafeAreaView style={estilosGlobales.contenedor}>
      <View style={styles.container}>
        <Text style={styles.bienvenida}>Bienvenido, {usuario?.nombre} 👋</Text>

        <TouchableOpacity
          style={[estilosGlobales.boton, styles.boton]}
          onPress={() => navigation.navigate('Historial')}
        >
          <FontAwesome name="history" size={20} color="white" style={styles.icono} />
          <Text style={estilosGlobales.textoBoton}>Ver Historial de Pedidos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  bienvenida: {
    fontSize: 24,
    fontWeight: '700',
    color: colores.texto,
    marginBottom: 30,
  },
  boton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  icono: {
    marginRight: 10,
  },
});
