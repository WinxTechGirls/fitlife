import { Link } from 'react-router-dom'
import Produto from '../../../models/Produto'
import { Barbell } from '@phosphor-icons/react';

interface CardProdutosProps {
    produto: Produto
}

function CardProduto({ produto }: CardProdutosProps) {
    return (
        <div className="bg-gray-800 min-h-screen flex items-center justify-center p-4">
            <div className='border-slate-900 border 
                flex flex-col rounded overflow-hidden justify-between bg-black text-white max-w-md w-full'>

                <div>
                    <div className="flex w-full bg-black py-2 px-4 items-center gap-4">
                        <img
                            src={produto.usuario?.foto || 'https://www.svgrepo.com/show/192244/man-user.svg'}
                            className='h-12 w-12 rounded-full'
                            alt={produto.usuario?.nome} />
                        <h3 className='text-lg font-bold text-center uppercase'>
                            {produto.usuario?.nome}
                        </h3>
                    </div>

                    <div className='p-4'>
                        <h2 className='text-lg font-bold uppercase'>{produto.nome}</h2>
                        <p className='flex gap-2 items-center'>Nível: {produto.nivel.dificuldade}{produto.nivel.dificuldade.toLowerCase() === 'iniciante' && (
                        <p className='flex gap-2 items-center'>
                            <Barbell size={18} className='text-red-400' />
                        </p>
                            )}
                            {produto.nivel.dificuldade.toLowerCase() === 'intermediário' && (
                            <p className='flex gap-2 items-center'>
                                <Barbell size={18} className='text-red-400' />
                                <Barbell size={18} className='text-red-400' />
                            </p>
                            )}
                            {produto.nivel.dificuldade.toLowerCase() === 'avançado' && (
                            <p className='flex gap-2 items-center'>
                                <Barbell size={18} className='text-red-400' />
                                <Barbell size={18} className='text-red-400' />
                                <Barbell size={18} className='text-red-400' />
                            </p>
                            )}
                            {produto.nivel.dificuldade.toLowerCase() === 'especialista' && (
                            <p className='flex gap-2 items-center'>
                                <Barbell size={18} className='text-red-400' />
                                <Barbell size={18} className='text-red-400' />
                                <Barbell size={18} className='text-red-400' />
                                <Barbell size={18} className='text-red-400' />
                            </p>
                            )}
                        </p>

                        <p>{produto?.descricao}</p>
                    </div>
                    <div className='p-4'>
                    <img
                            src={produto.foto || 'https://st2.depositphotos.com/4410397/7376/v/450/depositphotos_73768149-stock-illustration-dumbbell-icon.jpg'}
                            className='rounded-2xl'
                            alt={produto.nome} />
                    </div>
                    <div className='p-4'>
                        <h4 className='text-lg font-semibold uppercase'>Duração</h4>
                        <p>
                        {(() => {
                                const total = produto.duracao;
                                const h = Math.floor(total / 3600);
                                const m = Math.floor((total % 3600) / 60);
                                const s = total % 60;
                                return `${h}h ${m}min ${s}s`;
                            })()}
                        </p>
                    </div>
                </div>

                <div className="flex">
                    <Link to={`/editarproduto/${produto.id}`}
                        className='w-1/2 text-white bg-black hover:bg-gray-800 
                        flex items-center justify-center py-2'>
                        <button>Editar</button>
                    </Link>
                    <Link to={`/deletarproduto/${produto.id}`}
                        className='text-white bg-red-800 
                        hover:bg-red-900 w-1/2 flex items-center justify-center'>
                        <button>Deletar</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CardProduto
