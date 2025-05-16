import { useNavigate } from "react-router-dom";
import CardProdutos from "../cardprodutos/CardProdutos";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";

function ListaProdutos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarProdutos() {
    try {
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
    <>
      {produtos.length === 0 && (
        <div className="text-center montserrat my-4">
          <DNA visible={true} height="200" width="200" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper mx-auto" />
        </div>
      )}
      {produtos.length > 0 && (
        <div className="container mx-auto">
          <h1 className="w-fit p-4 text-center font-semibold text-4xl my-8">Treinos Registrados</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
              {produtos.map((produto) => (
                <CardProdutos key={produto.id} produto={produto} />
              ))}
            </div>
        </div>
      )}
    </>
  );
}

export default ListaProdutos;