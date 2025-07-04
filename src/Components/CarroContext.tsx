import React, { createContext, useContext, useState, useMemo } from 'react';

export interface Producto {
  id: string | number;
  nombre: string;
  tipo: 'Promoción' | 'Normal' | 'Personalizada';
  cantidad: number;
  total: number;
  tamanio?: string;
  masa?: string;
  ingredientes?: string[];
}

interface CarroContextProps {
  carro: Producto[];
  agregarAlCarro: (producto: Omit<Producto, 'id'>) => void;
  eliminarDelCarro: (id: string | number) => void;
  limpiarCarro: () => void;
  total: number;
}

const CarroContext = createContext<CarroContextProps | undefined>(undefined);

export const CarroProvider = ({ children }: { children: React.ReactNode }) => {
  const [carro, setCarro] = useState<Producto[]>([]);

  const agregarAlCarro = (producto: Omit<Producto, 'id'>) => {
    const nuevoProducto: Producto = { ...producto, id: Date.now() };
    setCarro(prev => [...prev, nuevoProducto]);
  };

  const eliminarDelCarro = (id: string | number) => {
    setCarro(prev => prev.filter(p => p.id !== id));
  };

  const limpiarCarro = () => {
    setCarro([]);
  };

  const total = useMemo(() => {
    return carro.reduce((acc, producto) => acc + producto.total, 0);
  }, [carro]);

  return (
    <CarroContext.Provider value={{ carro, agregarAlCarro, eliminarDelCarro, limpiarCarro, total }}>
      {children}
    </CarroContext.Provider>
  );
};

export const useCarro = () => {
  const context = useContext(CarroContext);
  if (!context) {
    throw new Error('useCarro debe usarse dentro de CarroProvider');
  }
  return context;
};
