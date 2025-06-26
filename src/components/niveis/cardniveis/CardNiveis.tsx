import { Link } from 'react-router-dom'
import Nivel from '../../../models/Nivel'
import { PencilSimple, TrashSimple } from '@phosphor-icons/react';
 
interface CardNiveisProps {
  nivel: Nivel
}
 
function CardNiveis({ nivel }: CardNiveisProps) {
  return (
    <div className='bg-neutral-950/70 backdrop-blur-md flex flex-wrap justify-between items-center rounded-2xl p-5 gap-4 min-w-0'>
      <p className='text-lg sm:text-xl md:text-2xl px-3'>{nivel.dificuldade}</p>
      <div className="flex gap-2">
        <Link to={`/editarnivel/${nivel.id}`} className='hover:text-emerald-600 flex items-center justify-center'>
          <PencilSimple size={24} />
        </Link>
        <Link to={`/deletarnivel/${nivel.id}`} className='hover:text-red-700 flex items-center justify-center'>
          <TrashSimple size={24} />
        </Link>
      </div>
    </div>
  );
}
 
export default CardNiveis