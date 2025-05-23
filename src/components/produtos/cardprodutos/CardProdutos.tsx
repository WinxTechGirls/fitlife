import { Link } from 'react-router-dom'
import Produto from '../../../models/Produto'
import { Barbell } from '@phosphor-icons/react';

interface CardProdutosProps {
    produto: Produto
}

function CardProduto({ produto }: CardProdutosProps) {
    return (
        <div className="montserrat bg-neutral-950/70 backdrop-blur-md rounded-2xl grid grid-cols-1 lg:grid-cols-2 p-5 gap-5">
            <img
                src={produto.foto || 'https://st2.depositphotos.com/4410397/7376/v/450/depositphotos_73768149-stock-illustration-dumbbell-icon.jpg'}
                className='object-cover rounded-sm lg:w-120 lg:h-full md:h-full'
                alt={produto.nome} />

            <div className='text-white flex-col space-y-4'>
                <h2 className='text-lg font-bold uppercase'>{produto.nome}</h2> 
                    <div className='flex-col space-y-2'> 
                        <div className='flex items-center gap-2'><span>Nível: {produto.nivel.dificuldade}</span>{produto.nivel.dificuldade.toLowerCase() === 'iniciante' && (
                        <p className='flex items-center'>
                            <Barbell size={20} className='text-red-600' />
                        </p>
                            )}
                            {produto.nivel.dificuldade.toLowerCase() === 'intermediário' && (
                            <p className='flex gap-2 items-center text-red-600'>
                                <Barbell size={20}/>
                                <Barbell size={20}/>
                            </p>
                            )}
                            {produto.nivel.dificuldade.toLowerCase() === 'avançado' && (
                            <p className='flex gap-2 items-center text-red-600'>
                                <Barbell size={20}/>
                                <Barbell size={20}/>
                                <Barbell size={20}/>
                            </p>
                            )}
                            {produto.nivel.dificuldade.toLowerCase() === 'especialista' && (
                            <p className='flex gap-2 items-center text-red-600'>
                                <Barbell size={20}/>
                                <Barbell size={20}/>
                                <Barbell size={20}/>
                                <Barbell size={20}/>
                            </p>
                            )}
                        </div>
                        <p>{produto?.descricao}</p>
                    </div>
                    <div>
                        <h4 className='font-medium'>Duração:</h4>
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


                <h3>Treino criado por:</h3>
                <div className="flex items-center gap-3">
                    <img
                        src={produto.usuario?.foto || 'https://www.svgrepo.com/show/192244/man-user.svg'}
                        className='h-10 w-10 rounded-full'
                        alt={produto.usuario?.nome} />
                    <h3 className='text-lg font-medium text-center'>
                        {produto.usuario?.nome}
                    </h3>
                </div>

                <div className="flex">
                    <Link to={`/editarproduto/${produto.id}`}
                        className='w-1/2 text-white bg-cyan-950 hover:bg-gray-800 
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
