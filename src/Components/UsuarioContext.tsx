import React, { createContext, useContext, useState } from 'react';

type Usuario = {
  nombre: string;
  apellido: string;
  // otros datos si quieres
};

const UsuarioContext = createContext<{
  usuario: Usuario | null;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
} | null>(null);

export const UsuarioProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) throw new Error('useUsuario debe usarse dentro de UsuarioProvider');
  return context;
};
