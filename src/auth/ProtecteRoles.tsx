import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';


const obtenerRutaPorRol = (rol: string) => {
  switch (rol) {
    case 'admin':
      return '/admin';
    default:
      return '/';
  }
};

export const ProtectorRoles = ({ 
  children, 
  rolesPermitidos 
}: { 
  children: React.ReactNode, 
  rolesPermitidos: string[] 
}) => {
  const { user, isLoaded } = useUser();


  if (!isLoaded) return <div className="flex justify-center p-10">Verificando gafete...</div>;

 
  const rolUsuario = (user?.publicMetadata?.rol as string) || 'cliente';

 
  if (!rolesPermitidos.includes(rolUsuario)) {
  
    const rutaCorrecta = obtenerRutaPorRol(rolUsuario);
    return <Navigate to={rutaCorrecta} replace />;
  }


  return <>{children}</>;
};