import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import Nivel from "../../../models/Nivel"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"

function DeletarNivel() {
  const navigate = useNavigate()
  const [nivel, setNivel] = useState<Nivel>({} as Nivel)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token
  const { id } = useParams<{ id: string }>()
  
  async function buscarPorId(id: string) {
    try {
      await buscar(`/niveis/${id}`, setNivel, { headers: { 'Authorization': token } })
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
  
  async function deletarNivel() {
    setIsLoading(true)
    try {
      await deletar(`/niveis/${id}`, { headers: { 'Authorization': token } })
      alert('Nível apagado com sucesso')
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      } else {
        alert('Erro ao deletar o nível.')
      }
    }
    setIsLoading(false)
    retornar()
  }
  
  function retornar() {
    navigate("/niveis")
  }
  
  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl bg-red-800 text-center my-4'>Deletar nível</h1>
      <p className='text-center font-semibold mb-4'> Você tem certeza de que deseja apagar o nível a seguir?</p>
      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-re-600 text-white font-bold text-2xl'> Nível </header>
        <p className='p-8 text-3xl bg-slate-200 h-full'>{nivel.dificuldade}</p>
        <div className="flex">
          <button className='text-slate-100 bg-red-800 hover:bg-red-600 w-full py-2' onClick={retornar}> Não </button>
          <button className='w-full text-slate-100 bg-green-400 flex items-center justify-center' onClick={deletarNivel}>
            {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : <span>Sim</span> }
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarNivel