import Parte1Home from '../home/parte1.home'; 
import Parte2Home from '../home/Parte2.home'; 
import Parte3Home from '../home/parte3.home'
import Parte4Home from '../home/parte4.home'
import Parte5Home from './parte5.home';
import Parte6Home from './parte6.home';
import SectionNavigator from '../../../components/SectionNavigator';
import ChatIa from '../chat/chatIa';

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <SectionNavigator />
   
      <Parte1Home />
         
      <Parte2Home />
      <Parte3Home />
      <Parte4Home />
      < ChatIa />
        <Parte5Home />
        <Parte6Home />
      
      
    </div>
  );
}