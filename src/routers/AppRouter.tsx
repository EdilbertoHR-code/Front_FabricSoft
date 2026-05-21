import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import PublicLayout from '../layouts/public/publicLayaout';
import Home from '../pages/public/home/home';
import CasoPage from '../pages/public/casos/CasoPage';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminLeads from '../pages/admin/AdminLeads';
import AdminMetricas from '../pages/admin/AdminMetricas';
import AdminCapacidad from '../pages/admin/AdminCapacidad';
import AdminLogs from '../pages/admin/AdminLogs';
// import SobreNosotros from '../components/public/sobreNoostros/sobreNosotros';
// import ServiciosAdministrados from '../components/public/serviciosAdministractivos/serviciosAdministrados';
// import ProyectosBlog from '../components/public/proyectos/poryecto';
// import Clientes from '../components/public/clientes/clientes';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const scrollToHash = () => {
      const id = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(id);
      if (!target) return false;

      const headerOffset = 118;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
      return true;
    };

    const timers = [30, 160, 360].map((delay) =>
      window.setTimeout(scrollToHash, delay),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [pathname, hash]);

  return null;
}

export const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* RUTAS PÚBLICAS
        Todo lo que esté dentro de esta ruta principal tendrá el Header y Footer
      */}
      <Route path="/" element={<PublicLayout />}>
        
        {/* Página Principal (Home) */}
        <Route index element={<Home />} />

        {/* Casos de éxito */}
        <Route path="casos/:slug" element={<CasoPage />} />
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

      {/* RUTAS ADMIN — fuera del PublicLayout (sin header/footer público) */}
      <Route path="/admin/login"     element={<AdminLogin />} />
      <Route path="/admin"           element={<AdminDashboard />} />
      <Route path="/admin/leads"     element={<AdminLeads />} />
      <Route path="/admin/metricas"  element={<AdminMetricas />} />
      <Route path="/admin/capacidad" element={<AdminCapacidad />} />
      <Route path="/admin/logs"      element={<AdminLogs />} />

      {/* REDIRECCIÓN POR DEFECTO: Si escriben una URL que no existe, los manda al Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
};

export default AppRouter;
