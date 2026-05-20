import { Routes, Route, Navigate } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import PublicLayout from '../layouts/public/publicLayaout';
import Home from '../pages/public/home/home';
// import SobreNosotros from '../components/public/sobreNoostros/sobreNosotros';
// import ServiciosAdministrados from '../components/public/serviciosAdministractivos/serviciosAdministrados';
// import ProyectosBlog from '../components/public/proyectos/poryecto';
// import Clientes from '../components/public/clientes/clientes';

export const AppRouter = () => {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS 
        Todo lo que esté dentro de esta ruta principal tendrá el Header y Footer 
      */}
      <Route path="/" element={<PublicLayout />}>
        
        {/* Página Principal (Home) */}
        <Route index element={<Home />} />
           {/* <Route path="/sobre-nosotros" element={< SobreNosotros/>} />
             <Route path="/servicios" element={< ServiciosAdministrados/>} />
          
             {/* <Route path="/proyectos" element={<ProyectosBlog/>} /> */}


        {/* Pantallas de Autenticación de Clerk */}
        <Route path="sign-in/*" element={
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0' }}>
            <SignIn 
              routing="path" 
              path="/sign-in" 
              signUpUrl="/sign-up" 
            />
          </div>
        } />
        
        <Route path="sign-up/*" element={
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0' }}>
            <SignUp 
              routing="path" 
              path="/sign-up" 
              signInUrl="/sign-in" 
            />
          </div>
        } />

      </Route>

      {/* REDIRECCIÓN POR DEFECTO: Si escriben una URL que no existe, los manda al Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;