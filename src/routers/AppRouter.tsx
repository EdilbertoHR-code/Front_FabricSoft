import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import PublicLayout from '../layouts/public/publicLayaout';
import Home from '../pages/public/home/home';
import CasoPage from '../pages/public/casos/CasoPage';
import AplicarPage from '../pages/public/aplicar/AplicarPage';
import TransparenciaPage from '../pages/public/transparencia/TransparenciaPage';
import GeneratorPage from '../pages/public/doctrina/GeneratorPage';
import RechazadosPage from '../pages/public/rechazados/RechazadosPage';
import AuditTrailPage from '../pages/public/casos/AuditTrailPage';
import PostMortemPage from '../pages/public/postmortem/PostMortemPage';
import RoundtablePage from '../pages/public/roundtable/RoundtablePage';
import TerminosPage from '../pages/public/legal/TerminosPage';
import PrivacidadPage from '../pages/public/legal/PrivacidadPage';
import DoctrinaNoAlineacionPage from '../pages/public/legal/DoctrinaNoAlineacionPage';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminLeads from '../pages/admin/AdminLeads';
import AdminMetricas from '../pages/admin/AdminMetricas';
import AdminCapacidad from '../pages/admin/AdminCapacidad';
import AdminOfficeHours from '../pages/admin/AdminOfficeHours';
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

      const headerOffset = 16;
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

        {/* Aplicar / Wait List */}
        <Route path="aplicar" element={<AplicarPage />} />

        {/* Transparencia */}
        <Route path="transparencia" element={<TransparenciaPage />} />

        {/* Doctrine Generator */}
        <Route path="doctrina/generator" element={<GeneratorPage />} />

        {/* Doctrina de no alineación */}
        <Route path="doctrina/no-alineacion" element={<DoctrinaNoAlineacionPage />} />

        {/* Proyectos evaluados / rechazados */}
        <Route path="rechazados" element={<RechazadosPage />} />

        {/* Audit Trail por caso */}
        <Route path="casos/:slug/audit-trail" element={<AuditTrailPage />} />

        {/* Post-Mortem Privado */}
        <Route path="post-mortem" element={<PostMortemPage />} />

        {/* Confidential Roundtable */}
        <Route path="roundtable" element={<RoundtablePage />} />

        {/* Legal */}
        <Route path="terminos" element={<TerminosPage />} />
        <Route path="privacidad" element={<PrivacidadPage />} />
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
      <Route path="/admin/login"         element={<AdminLogin />} />
      <Route path="/admin"             element={<AdminDashboard />} />
      <Route path="/admin/leads"       element={<AdminLeads />} />
      <Route path="/admin/metricas"    element={<AdminMetricas />} />
      <Route path="/admin/capacidad"   element={<AdminCapacidad />} />
      <Route path="/admin/office-hours" element={<AdminOfficeHours />} />
      <Route path="/admin/logs"        element={<AdminLogs />} />

      {/* REDIRECCIÓN POR DEFECTO: Si escriben una URL que no existe, los manda al Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
};

export default AppRouter;
