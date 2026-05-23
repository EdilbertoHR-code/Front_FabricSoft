


interface LoaderProps {
  mensaje?: string;
  error?: string | null;
  pantallaCompleta?: boolean;
}

export const LoaderPersonalizado = ({ 
  mensaje = "Cargando...", 
  error = null,
  pantallaCompleta = true 
}: LoaderProps) => {
  return (
    <div className={`flex flex-col items-center justify-center ${pantallaCompleta ? 'min-h-screen' : 'h-full w-full py-10'} bg-public-bg`}>
      
     
      {!error && (
        <div className="relative w-16 h-16">
        
          <div className="absolute inset-0 border-4 border-brand-lightblue/30 rounded-full"></div>
       
          <div className="absolute inset-0 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

  
      <h2 className="mt-6 text-xl font-bold text-public-main tracking-wide text-center px-4">
        {error ? '⚠️ Error de conexión' : mensaje}
      </h2>

    
      {error && (
        <p className="mt-2 text-error text-center px-4 max-w-md">
          {error}
        </p>
      )}
    </div>
  );
};