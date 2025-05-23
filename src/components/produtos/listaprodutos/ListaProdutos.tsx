import { useNavigate } from "react-router-dom";
import CardProdutos from "../cardprodutos/CardProdutos";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import { Oval } from "react-loader-spinner";

function ListaProdutos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarProdutos() {
    try {
      setIsLoading(true)
      await buscar('/produtos', setProdutos, {
        headers: {
          Authorization: token,
        },
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
      alert('Não existe treinos cadastrados')
      navigate('/');
    }
  }, [token])

  useEffect(() => {
    buscarProdutos()
  }, [produtos.length])

  return (
    <div className="container mx-auto montserrat">
      {isLoading ? (
        <div className="p-15 w-fit mx-auto">
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
        </div>
      ) : produtos.length == 0 ?(
        <p className="text-center p-15 text-5xl font-medium">
          Nenhum treino cadastrado até o momento.
        </p>
      ) : (
        <>
          <h1 className="w-fit p-4 text-center font-semibold text-4xl my-8">Treinos Registrados</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
            {produtos.map((produto) => (
              <CardProdutos key={produto.id} produto={produto} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ListaProdutos;