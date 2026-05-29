import { lazy, Suspense } from 'react';
import S01Hero from './s01-hero';
import S02bPuente from './s02b-puente';
import RescueCounter from './s02-optimizador';
import S03TcoCalculator from './s03-tco-calculator';
import S04TcoWaitlist from './s04-tco-waitlist';
import SectionNavigator from '../../../components/SectionNavigator';
import ChatIa from '../chat/chatIa';
import ViewportLoader from '../../../components/ViewportLoader';

// Carga perezosa (lazy) de las secciones por debajo del pliegue
const S05AnalisisFallas = lazy(() => import('./s05-analisis-fallas'));
const S06Doctrina = lazy(() => import('./s06-doctrina'));
const S06bFixedPrice = lazy(() => import('./s06b-fixed-price'));
const S07Casos = lazy(() => import('./s07-casos'));
const S07bRescueAssessment = lazy(() => import('./s07b-rescue-assessment'));
const S08Industrias = lazy(() => import('./s08-industrias'));
const S09FabricOS = lazy(() => import('./s09-fabric-os'));
const S10Lifecycle = lazy(() => import('./s10-lifecycle'));
const S11OfficeHours = lazy(() => import('./s11-office-hours'));
const S12Referencias = lazy(() => import('./s12-referencias'));
const S12bCriterios = lazy(() => import('./s12b-criterios'));
const S13Transparencia = lazy(() => import('./s13-transparencia'));
const S14Investigacion = lazy(() => import('./s14-investigacion'));
const S15Founder = lazy(() => import('./s15-founder'));

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <SectionNavigator />
      <S01Hero />
    
      <S02bPuente />
      <S03TcoCalculator />
      <S04TcoWaitlist />
      <ChatIa />

      <Suspense fallback={<div className="min-h-[600px]" />}>
        <ViewportLoader height={600}>
          <S05AnalisisFallas />
        </ViewportLoader>
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px]" />}>
        <ViewportLoader height={600}>
          <S06Doctrina />
        </ViewportLoader>
      </Suspense>
     
      <Suspense fallback={<div className="min-h-[500px]" />}>
        <ViewportLoader height={500}>
          <S06bFixedPrice />
        </ViewportLoader>
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[700px]" />}>
        <ViewportLoader height={700}>
          <S07Casos />
        </ViewportLoader>
      </Suspense>

      <RescueCounter />

      <Suspense fallback={<div className="min-h-[700px]" />}>
        <ViewportLoader height={700}>
          <S07bRescueAssessment />
        </ViewportLoader>
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px]" />}>
        <ViewportLoader height={600}>
          <S08Industrias />
        </ViewportLoader>
      </Suspense>

      <Suspense fallback={<div className="min-h-[800px]" />}>
        <ViewportLoader height={800}>
          <S09FabricOS />
        </ViewportLoader>
      </Suspense>

      <Suspense fallback={<div className="min-h-[700px]" />}>
        <ViewportLoader height={700}>
          <S10Lifecycle />
        </ViewportLoader>
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px]" />}>
        <ViewportLoader height={600}>
          <S11OfficeHours />
        </ViewportLoader>
      </Suspense>

      <Suspense fallback={<div className="min-h-[500px]" />}>
        <ViewportLoader height={500}>
          <S12Referencias />
        </ViewportLoader>
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px]" />}>
        <ViewportLoader height={600}>
          <S12bCriterios />
        </ViewportLoader>
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px]" />}>
        <ViewportLoader height={600}>
          <S13Transparencia />
        </ViewportLoader>
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px]" />}>
        <ViewportLoader height={600}>
          <S14Investigacion />
        </ViewportLoader>
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px]" />}>
        <ViewportLoader height={600}>
          <S15Founder />
        </ViewportLoader>
      </Suspense>
    </div>
  );
}
