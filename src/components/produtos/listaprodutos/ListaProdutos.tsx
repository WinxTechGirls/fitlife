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
        <div className="text-center my-4">
          <DNA visible={true} height="200" width="200" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper mx-auto" />
          <p className="text-lg font-bold mt-4">Não há produtos cadastrados!</p>
        </div>
      )}
      {produtos.length > 0 && (
        <div className="flex justify-center w-full my-4">
          <div className="container flex flex-col mx-2">
            <div className='container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {produtos.map((produto) => (
                <CardProdutos key={produto.id} produto={produto} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListaProdutos;