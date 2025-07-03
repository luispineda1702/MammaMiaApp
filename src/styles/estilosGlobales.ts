// src/styles/estilosGlobales.ts
import { StyleSheet } from 'react-native';

export const colores = {
  fondo: '#FFFFFF',
  primario: '#D32F2F',
  secundario: '#FFC107',
  texto: '#212121',
  grisClaro: '#F5F5F5',
  borde: '#BDBDBD',
};

export const estilosGlobales = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colores.primario,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  boton: {
    backgroundColor: colores.primario,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
