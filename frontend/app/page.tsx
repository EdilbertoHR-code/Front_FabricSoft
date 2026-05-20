import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SiteInteractions from "@/components/interactions/site-interactions";

import S07Casos from "@/components/sections/s07-casos";
import S08Industrias from "@/components/sections/s08-industrias";
import S09FabricOS from "@/components/sections/s09-fabric-os";
import S10Lifecycle from "@/components/sections/s10-lifecycle";
import S11OfficeHours from "@/components/sections/s11-office-hours";
import S12Referencias from "@/components/sections/s12-referencias";
import CriteriosEvaluacion from "@/components/sections/criterios-evaluacion";
import S13Transparencia from "@/components/sections/s13-transparencia";
import S14Investigacion from "@/components/sections/s14-investigacion";
import S15Founder from "@/components/sections/s15-founder";

export default function Home() {
  return (
    <>
      <Header />
      
      {/* Spacer to push content past the fixed header */}
      <main className="flex-1 pt-20">
        <S07Casos />
        <S08Industrias />
        <S09FabricOS />
        <S10Lifecycle />
        <S11OfficeHours />
        <S12Referencias />
        <CriteriosEvaluacion />
        <S13Transparencia />
        <S14Investigacion />
        <S15Founder />
      </main>

      <Footer />
      <SiteInteractions />
    </>
  );
}
