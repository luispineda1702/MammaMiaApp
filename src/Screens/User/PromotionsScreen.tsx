import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Usa esto si estás con Expo

export default function PromotionsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Ícono de atrás en la parte superior izquierda */}
      <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      {/* Título separado y centrado */}
      <Text style={styles.title}>Promociones</Text>

      {/* Contenido */}
      <Text style={styles.item}>🎉 2x1 en Pizza Familiar</Text>
      <Text style={styles.item}>🍕 Pizza + Gaseosa por S/ 25</Text>
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
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  }
  });