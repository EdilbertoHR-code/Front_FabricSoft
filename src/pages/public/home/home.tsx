import Parte1Home from '../home/parte1.home';
import Parte2Home from '../home/Parte2.home';
import Parte3Home from '../home/parte3.home';
import Parte4Home from '../home/parte4.home';
import S07Casos from '../home/s07-casos';
import S08Industrias from '../home/s08-industrias';
import S09FabricOS from '../home/s09-fabric-os';
import S10Lifecycle from '../home/s10-lifecycle';
import S11OfficeHours from '../home/s11-office-hours';
import S12Referencias from '../home/s12-referencias';
import CriteriosEvaluacion from '../home/criterios-evaluacion';
import S13Transparencia from '../home/s13-transparencia';
import S14Investigacion from '../home/s14-investigacion';
import S15Founder from '../home/s15-founder';

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* S01-S06: Hero, TCO, Mapa Global, Rescue, Doctrina — Edilberto */}
      <Parte1Home />
      <Parte2Home />
      <Parte3Home />
      <Parte4Home />

      {/* S07-S15: Casos, Industrias, OS, Lifecycle, Office Hours, Referencias, Criterios, Transparencia, Investigación, Founder */}
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
    </div>
  );
}