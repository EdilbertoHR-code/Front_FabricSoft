import Parte1Home from '../home/parte1.home'; 
import Parte2Home from '../home/Parte2.home'; 
import Parte3Home from '../home/parte3.home'
import Parte4Home from '../home/parte4.home'

export default function Home() {
  return (
    <div className="w-full flex flex-col">
   
      <Parte1Home />
         
      <Parte2Home />
      <Parte3Home />
      <Parte4Home />
      
      
    </div>
  );
}