import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';

import PublicLayout from '../layouts/public/publicLayaout';
import { ProtectorRoles } from '../auth/ProtecteRoles';
import { PublicRouteProtector } from '../auth/PublicProtecte';

// Páginas Públicas
const Home = lazy(() => import('../pages/public/home/home'));
const CasoPage = lazy(() => import('../pages/public/casos/CasoPage'));
const AplicarPage = lazy(() => import('../pages/public/aplicar/AplicarPage'));
const TransparenciaPage = lazy(() => import('../pages/public/transparencia/TransparenciaPage'));
const RechazadosPage = lazy(() => import('../pages/public/rechazados/RechazadosPage'));
const AuditTrailPage = lazy(() => import('../pages/public/casos/AuditTrailPage'));
const PostMortemPage = lazy(() => import('../pages/public/postmortem/PostMortemPage'));
const RoundtablePage = lazy(() => import('../pages/public/roundtable/RoundtablePage'));
const ModelosPage = lazy(() => import('../pages/public/modelos/ModelosPage'));

// Páginas Legales
const TerminosPage = lazy(() => import('../pages/public/legal/TerminosPage'));
const PrivacidadPage = lazy(() => import('../pages/public/legal/PrivacidadPage'));
const DoctrinaNoAlineacionPage = lazy(() => import('../pages/public/legal/DoctrinaNoAlineacionPage'));


import { VerificarAcceso } from '../auth/VerificarAcceso';

// Páginas de Herramientas
const MigrationRoadmapPage = lazy(() => import('../pages/public/herramientas/MigrationRoadmapPage'));
const ReadinessScorePage = lazy(() => import('../pages/public/herramientas/ReadinessScorePage'));
const RFPTemplatePage = lazy(() => import('../pages/public/herramientas/RFPTemplatePage'));
const BenchmarkIndexPage = lazy(() => import('../pages/public/herramientas/BenchmarkIndexPage'));

// Páginas de Investigación
const ResearchLettersPage = lazy(() => import('../pages/public/investigacion/ResearchLettersPage'));
const PaperPage = lazy(() => import('../pages/public/investigacion/PaperPage'));

// Páginas de Administración
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminLeads = lazy(() => import('../pages/admin/AdminLeads'));
const AdminMetricas = lazy(() => import('../pages/admin/AdminMetricas'));
const AdminCapacidad = lazy(() => import('../pages/admin/AdminCapacidad'));
const AdminOfficeHours = lazy(() => import('../pages/admin/AdminOfficeHours'));
const AdminLogs = lazy(() => import('../pages/admin/AdminLogs'));
const AdminPapers = lazy(() => import('../pages/admin/AdminPapers'));
const AdminNda = lazy(() => import('../pages/admin/AdminNda'));
const AdminReferencias    = lazy(() => import('../pages/admin/AdminReferencias'));
const AdminTransparencia     = lazy(() => import('../pages/admin/AdminTransparencia'));
const AdminResearchLetters   = lazy(() => import('../pages/admin/AdminResearchLetters'));

// =========================================================================
// UTILIDADES Y COMPONENTES GLOBALES
// =========================================================================

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


const GlobalLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] font-sans">
    <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-[#2A2A2A]" />
      <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#C9A96E]" />
    </div>
    <p className="text-[10px] font-mono font-bold text-[#C9A96E] uppercase tracking-[0.3em] animate-pulse">
      Iniciando Terminal...
    </p>
  </div>
);

// =========================================================================
// ENRUTADOR PRINCIPAL
// =========================================================================

export const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      {/* El Suspense envuelve las rutas lazy para mostrar el Loader mientras se descargan */}
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          
          {/* =================================================================
              RUTAS PÚBLICAS (Dentro del Layout Público) 
              ================================================================= */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />

            <Route path="/verificar-acceso" element={<VerificarAcceso />} />
     
            
            {/* Casos y Engagements */}
            <Route path="casos/:slug" element={<CasoPage />} />
            <Route path="casos/:slug/audit-trail" element={<AuditTrailPage />} />
            <Route path="aplicar" element={<AplicarPage />} />
            <Route path="rechazados" element={<RechazadosPage />} />
            <Route path="post-mortem" element={<PostMortemPage />} />
            <Route path="roundtable" element={<RoundtablePage />} />
            <Route path="modelos" element={<ModelosPage />} />
            <Route path="transparencia" element={<TransparenciaPage />} />

            {/* Legal */}
            <Route path="terminos" element={<TerminosPage />} />
            <Route path="privacidad" element={<PrivacidadPage />} />
            <Route path="doctrina/no-alineacion" element={<DoctrinaNoAlineacionPage />} />

            {/* Herramientas (El Generador ya es Modal en el Home, pero dejamos las demás) */}
            <Route path="roadmap" element={<MigrationRoadmapPage />} />
            <Route path="readiness" element={<ReadinessScorePage />} />
            <Route path="rfp-template" element={<RFPTemplatePage />} />
            <Route path="benchmark" element={<BenchmarkIndexPage />} />

            {/* Investigación */}
            <Route path="research-letters" element={<ResearchLettersPage />} />
            <Route path="investigacion/paper/:num" element={<PaperPage />} />
          </Route>

          {/* =================================================================
              RUTAS DE AUTENTICACIÓN (CLERK) - URLs Personalizadas
              ================================================================= */}
          <Route 
            path="/acceso/*" 
            element={
              <PublicRouteProtector>
                <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10" />
                  <div className="pointer-events-none absolute -top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 bg-[#C9A96E] opacity-[0.03] blur-[120px]" />
                  <div className="relative z-10">
                    <SignIn routing="path" path="/acceso" signUpUrl="/crear-cuenta" />
                  </div>
                </div>
              </PublicRouteProtector>
            } 
          />

          <Route 
            path="/crear-cuenta/*" 
            element={
              <PublicRouteProtector>
                <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10" />
                  <div className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 bg-[#C9A96E] opacity-[0.03] blur-[120px]" />
                  <div className="relative z-10">
                    <SignUp routing="path" path="/crear-cuenta" signInUrl="/acceso" />
                  </div>
                </div>
              </PublicRouteProtector>
            } 
          />

          {/* =================================================================
              RUTAS DE ADMINISTRACIÓN
              ================================================================= */}
          <Route path="/admin/login" element={<Navigate to="/acceso" replace />} />

          <Route 
            path="/admin/*" 
            element={
              <ProtectorRoles rolesPermitidos={['Admin']}>
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="leads" element={<AdminLeads />} />
                  <Route path="nda" element={<AdminNda />} />
                  <Route path="referencias"    element={<AdminReferencias />} />
                  <Route path="transparencia"    element={<AdminTransparencia />} />
                  <Route path="research-letters" element={<AdminResearchLetters />} />
                  <Route path="metricas" element={<AdminMetricas />} />
                  <Route path="capacidad" element={<AdminCapacidad />} />
                  <Route path="office-hours" element={<AdminOfficeHours />} />
                  <Route path="papers" element={<AdminPapers />} />
                  <Route path="logs" element={<AdminLogs />} />
                </Routes>
              </ProtectorRoles>
            } 
          />

          {/* REDIRECCIÓN POR DEFECTO (404 a Home) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRouter;
