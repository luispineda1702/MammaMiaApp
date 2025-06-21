import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'

export default function PromotionsScreen() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Promociones</Text>
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