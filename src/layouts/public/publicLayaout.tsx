import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../pages/public/header/headerPublic';
import Footer from '../../pages/public/footer/footerPublic';

const HOME_ONLY = ['/'];

export default function PublicLayout() {
  const { pathname } = useLocation();
  const showFooter = HOME_ONLY.includes(pathname);

  return (
    <div className="relative min-h-screen bg-fabric-base text-fabric-text font-sans selection:bg-fabric-gold selection:text-black">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 bg-grid-pattern mask-radial-faded" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-col w-full">
          <Outlet />
        </main>
        {showFooter && <Footer />}
      </div>
    </div>
  );
}