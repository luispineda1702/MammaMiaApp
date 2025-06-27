import React from 'react';
import { SafeAreaView, Text, Button, StyleSheet } from 'react-native';

export default function PerfilScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      {/* Aquí puedes mostrar más info del usuario */}

      <Button
        title="Ver Historial de Pedidos"
        onPress={() => navigation.navigate('Historial')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 20 },
});
