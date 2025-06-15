import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import Treino from "../../../models/Treino"
import { buscar, deletar } from "../../../services/Service"
import { Oval, RotatingLines } from "react-loader-spinner"
import { Barbell } from "@phosphor-icons/react"

function DeletarTreino() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [treino, setTreino] = useState<Treino>({} as Treino)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/treinos/${id}`, setTreino, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarTreino() {
        setIsLoading(true)

        try {
            await deletar(`/treinos/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Treino apagada com sucesso')

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }else {
                alert('Erro ao deletar o Treino.')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/treinos")
    }
    
    if (!treino || !treino.nivel) {
        return (
             <div className="flex items-center w-fit mx-auto p-15">
                <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#d00c0c"
                    secondaryColor ="#a71c1c"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    />
                <p className="text-white text-center px-5">Carregando treino...</p>
            </div>
        );
    }
    return (
        <div className='container w-2/3 mx-auto montserrat text-white p-15'>
            <h1 className='text-4xl text-center my-4'>Deletar Treino</h1>

            <div className="montserrat bg-neutral-950/70 backdrop-blur-md rounded-2xl grid grid-cols-1 lg:grid-cols-2 p-5 gap-5">
                <img
                    src={treino.foto || 'https://st2.depositphotos.com/4410397/7376/v/450/depositphotos_73768149-stock-illustration-dumbbell-icon.jpg'}
                    className='object-cover rounded-sm lg:w-120 lg:h-full md:h-full'
                    alt={treino.nome} />

                <div className='text-white flex-col space-y-4'>
                    <h2 className='text-lg font-bold uppercase'>{treino.nome}</h2> 
                        <div className='flex-col space-y-2'> 
                            <div className='flex items-center gap-2'><span>Nível: {treino.nivel.dificuldade}</span>{treino.nivel.dificuldade.toLowerCase() === 'iniciante' && (
                            <p className='flex items-center'>
                                <Barbell size={20} className='text-red-600' />
                            </p>
                                )}
                                {treino.nivel.dificuldade.toLowerCase() === 'intermediário' && (
                                <p className='flex gap-2 items-center text-red-600'>
                                    <Barbell size={20}/>
                                    <Barbell size={20}/>
                                </p>
                                )}
                                {treino.nivel.dificuldade.toLowerCase() === 'avançado' && (
                                <p className='flex gap-2 items-center text-red-600'>
                                    <Barbell size={20}/>
                                    <Barbell size={20}/>
                                    <Barbell size={20}/>
                                </p>
                                )}
                                {treino.nivel.dificuldade.toLowerCase() === 'especialista' && (
                                <p className='flex gap-2 items-center text-red-600'>
                                    <Barbell size={20}/>
                                    <Barbell size={20}/>
                                    <Barbell size={20}/>
                                    <Barbell size={20}/>
                                </p>
                                )}
                            </div>
                            <p>{treino?.descricao}</p>
                        </div>
                        <div>
                            <h4 className='font-medium'>Duração:</h4>
                            <p>
                            {(() => {
                                    const total = treino.duracao;
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
                            src={treino.usuario?.foto || 'https://www.svgrepo.com/show/192244/man-user.svg'}
                            className='h-10 w-10 rounded-full'
                            alt={treino.usuario?.nome} />
                        <h3 className='text-lg font-medium text-center'>
                            {treino.usuario?.nome}
                        </h3>
                    </div>
                </div>
            </div>
            
            <p className='text-center text-3xl font-semibold my-7'>
                    Você tem certeza de que deseja apagar o treino acima?
            </p>
            <div className="flex justify-center space-x-3.5">
                <button 
                    className='border border-red-600 hover:bg-red-600 w-fit py-3 px-5 rounded-sm'
                    onClick={retornar}>
                    Não
                </button>
                <button 
                    className='border border-green-600 
                    hover:bg-green-600 w-fit py-3 px-5 rounded-sm'
                    onClick={deletarTreino}>
                    
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>Sim</span>
                    }
                </button>
            </div>
        </div>
    )
}

export default DeletarTreino