import { Link } from 'react-router-dom'
import Nivel from '../../../models/Nivel'
import { PencilSimple, TrashSimple } from '@phosphor-icons/react';
 
interface CardNiveisProps {
  nivel: Nivel
}
 
function CardNiveis({ nivel }: CardNiveisProps) {
  return (
    <div className='bg-neutral-950/70 backdrop-blur-md flex rounded-2xl justify-between p-5 lg:w-1/2'>
      <p className='p-8 text-2xl'>{nivel.dificuldade}</p>
      <div className="flex">
        <Link to={`/editarnivel/${nivel.id}`} className='w-full hover:text-emerald-600 flex items-center justify-center p-5'>
          <PencilSimple size={32} />
        </Link>
        <Link to={`/deletarnivel/${nivel.id}`} className=' hover:text-red-700 w-full flex items-center justify-center p-5'>
          <TrashSimple size={32} />
        </Link>
      </div>
    </div>
  );
}
 
export default CardNiveis