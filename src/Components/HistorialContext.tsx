import React, { createContext, useContext, useState, ReactNode } from 'react';

type Producto = {
  nombre: string;
  cantidad: number;
  precio: number;
};

type Pedido = {
  id: number;
  fecha: string;
  productos: Producto[];
  total: number;
  metodoPago: string;
};

type HistorialContextType = {
  historial: Pedido[];
  agregarPedido: (pedido: Pedido) => void;
};

const HistorialContext = createContext<HistorialContextType | undefined>(undefined);

export const HistorialProvider = ({ children }: { children: ReactNode }) => {
  const [historial, setHistorial] = useState<Pedido[]>([]);

  const agregarPedido = (pedido: Pedido) => {
    setHistorial(prev => [...prev, pedido]);
  };

  return (
    <HistorialContext.Provider value={{ historial, agregarPedido }}>
      {children}
    </HistorialContext.Provider>
  );
};

export const useHistorial = () => {
  const context = useContext(HistorialContext);
  if (!context) {
    throw new Error('useHistorial must be used within HistorialProvider');
  }
  return context;
};
