import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser, useClerk } from '@clerk/clerk-react'; // 🔥 Importamos useClerk
import { toast } from 'sonner'; 
import { LoaderPersonalizado } from '../components/ui/LoaderPersonalizado';
import { api } from '../config/api'; 

export const VerificarAcceso = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser(); 
  const { signOut } = useClerk(); 
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validarConBackend = async () => {
      if (!isLoaded) return;

      if (!isSignedIn) {
        navigate('/sign-in', { replace: true });
        return;
      }

      try {
        const token = await getToken();
        
        const { data } = await api.get('/auth/login', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

       

        if (data.status === 'bloqueado' || data.status === 'desactivado') {
          toast.error("Acceso Denegado", { description: "Cuenta inactiva." });
          setError("Tu cuenta ha sido desactivada. Cerrando sesión...");
          
       
          setTimeout(() => {
            signOut();
          }, 6000);
          return; 
        }

        toast.success(`¡Bienvenido de nuevo, ${user?.firstName || 'Inge'}!`, {
          description: 'Hemos sincronizado tu acceso correctamente.',
          duration: 4000,
        });
        
  
        if (data.rol === 'Admin') {
          navigate('/Admin', { replace: true });

        } else if (data.rol === 'atención al cliente') {
          const empresas = data.assignedCompanies || [];

          if (empresas === 'all' || empresas.length > 1) {
            navigate('/seleccionar-empresa', { state: { empresasAsignadas: empresas }, replace: true });
            
          } else if (empresas.length === 1) {
            localStorage.setItem('activeCompanyId', empresas[0]);

           try {
              await api.patch('/userAdmin/seleccionar-empresa', { companyId: empresas[0] });
            } catch (error) {
              console.error("Error asignando empresa por defecto:", error);
            }
            
            navigate('/dashboard', { replace: true });
            
          } else {
        
            toast.error("Sin espacios de trabajo asignados");
            setError("Tu cuenta no tiene empresas asignadas. Habla con el administrador. Cerrando sesión...");
            
            // Lo deslogueamos después de 4 segundos
            setTimeout(() => {
              signOut();
            }, 5000);
          }

        } else { 
          if (data.companyId) {
             localStorage.setItem('activeCompanyId', data.companyId);
          }
          navigate('/dashboard', { replace: true });
        }

      } catch (err: any) {
        console.error("Error validando sesión:", err);
        
        const mensajeFriendly = err.response?.data?.error || "No pudimos cargar tu perfil.";
        toast.error('Error de Sincronización', {
          description: mensajeFriendly,
          action: {
            label: 'Reintentar',
            onClick: () => window.location.reload(),
          },
        });

        setError("Hubo un problema al cargar tu perfil. Contacta a soporte o intenta recargar la página.");
        
 
        setTimeout(() => signOut(), 5000);
      }
    };

    validarConBackend();
  }, [isLoaded, isSignedIn, getToken, navigate, user, signOut]);

  return (
    <LoaderPersonalizado 
      mensaje="Preparando tu espacio de trabajo..." 
      error={error} 
      pantallaCompleta={true}
    />
  );
};