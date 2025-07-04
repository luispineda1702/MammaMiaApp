import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { estilosGlobales, colores } from '../../styles/estilosGlobales';
import { useUsuario } from '../../Components/UsuarioContext';

interface Producto {
  id: string | number;
  nombre: string;
  cantidad: number;
  total: number;
}

interface Pedido {
  id: number;
  usuarioId: number;
  direccion: string;
  metodoPago: string;
  total: number;
  productos: Producto[];
  fecha: string;
}

export default function HistorialPedidosScreen() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const { usuario } = useUsuario();

  useEffect(() => {
    if (!usuario) return;

    axios
      .get<Pedido[]>(`http://192.168.18.116:3000/api/pedidos/usuario/${usuario.id}`)
      .then(res => setPedidos(res.data))
      .catch(err => console.error('Error al cargar pedidos:', err))
      .finally(() => setCargando(false));
  }, [usuario]);

  if (cargando) {
    return (
      <SafeAreaView style={[estilosGlobales.contenedor, styles.cargandoContainer]}>
        <ActivityIndicator size="large" color={colores.primario} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilosGlobales.contenedor}>
      <FlatList<Pedido>
        data={pedidos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }: { item: Pedido }) => {
          // Asegurar que total es number válido
          const totalPedido = typeof item.total === 'number' && !isNaN(item.total) ? item.total : 0;

          return (
            <View style={styles.card}>
              <Text style={styles.fecha}>
                Fecha: {new Date(item.fecha).toLocaleString()}
              </Text>
              <Text style={styles.texto}>Dirección: {item.direccion}</Text>
              <Text style={styles.texto}>Método de pago: {item.metodoPago}</Text>
              <Text style={styles.texto}>Total: S/ {totalPedido.toFixed(2)}</Text>
              <Text style={[styles.texto, styles.productosTitulo]}>Productos:</Text>
              {item.productos.map((prod, idx) => {
                // Asegurar total numérico válido para cada producto
                const totalProd = typeof prod.total === 'number' && !isNaN(prod.total)
                  ? prod.total
                  : Number(prod.total) || 0;

                return (
                  <Text key={idx} style={styles.producto}>
                    - {prod.nombre} x{prod.cantidad} (S/ {totalProd.toFixed(2)})
                  </Text>
                );
              })}
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.texto}>No hay pedidos para mostrar.</Text>
        }
        contentContainerStyle={pedidos.length === 0 ? styles.emptyContainer : undefined}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colores.grisClaro,
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
  },
  fecha: { fontSize: 14, color: colores.secundario, marginBottom: 6 },
  texto: { fontSize: 16, color: colores.texto, marginBottom: 4 },
  productosTitulo: { marginTop: 8, fontWeight: '700' },
  producto: { fontSize: 15, color: colores.texto, marginLeft: 10 },
  cargandoContainer: { justifyContent: 'center', flex: 1 },
  emptyContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
});
