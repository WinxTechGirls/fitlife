import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Nivel from "../../../models/Nivel";
import CardNiveis from "../cardniveis/CardNiveis";
import { buscar } from "../../../services/Service";

function ListaNiveis() {
  const navigate = useNavigate();
  const [niveis, setNiveis] = useState<Nivel[]>([])
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarNiveis() {
    try {
      await buscar('/niveis', setNiveis, { headers: { Authorization: token } })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado!')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    buscarNiveis()
  }, [niveis.length])

  return (
    <>
      <div className="bg-[url(/banner-home.jpg)] bg-cover min-h-screen flex justify-center">
       <div className="container lg:w-1/2">
          {niveis.length === 0 && (
            <DNA visible={true} height="200" width="200" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper mx-auto" />
          )}
          <div className="container flex-col justify-center space-y-5 p-5">
            <h1 className="w-fit text-center font-semibold text-4xl my-8">Níveis de Intensidade de Treino</h1>
            {niveis.map((nivel) => (
              <div key={nivel.id}>
                <CardNiveis nivel={nivel} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListaNiveis;
