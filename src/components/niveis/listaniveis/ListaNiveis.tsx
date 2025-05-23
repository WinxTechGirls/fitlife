import { useContext, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Nivel from "../../../models/Nivel";
import CardNiveis from "../cardniveis/CardNiveis";
import { buscar } from "../../../services/Service";

function ListaNiveis() {
  const navigate = useNavigate();
  const [niveis, setNiveis] = useState<Nivel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarNiveis() {
    setIsLoading(true)
    try {
      await buscar('/niveis', setNiveis, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado!')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    buscarNiveis()
  }, [])

  return (
    <div className="bg-[url(/bg-niveis.jpg)] bg-cover min-h-screen flex montserrat">
      <div className="container mx-auto">
        {isLoading ? (
          <div className="w-fit m-auto p-15">
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#d00c0c"
              secondaryColor="#a71c1c"
              ariaLabel="oval-loading"
            />
          </div>
        ) : niveis.length === 0 ? (
          <p className="text-center p-15 text-5xl font-medium">
            Nenhum nível cadastrado até o momento.
          </p>
        ) : (
          <div className="container flex-col space-y-5 p-5">
            {niveis.map((nivel) => (
              <div className="lg:w-1/2">
                <h1 className="w-fit text-center font-semibold text-4xl my-8">Níveis de Intensidade de Treino</h1>
                <div key={nivel.id}>
                  <CardNiveis nivel={nivel} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ListaNiveis;
