import { useContext, useEffect } from "react"
import ModalProduto from "../../components/produtos/modalproduto/ModalProduto"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import ListaProdutos from "../../components/produtos/listaprodutos/ListaProdutos"

function Home() {

    const navigate = useNavigate()
    const { usuario } = useContext(AuthContext)
    
    useEffect(() => {
        if (usuario.token === "") {
            alert("Você precisa estar logado!")
            navigate("/")
        }
    }, [usuario.token])

    return (
        <>
            <div className="bg-[url(/banner-home.jpg)] w-full bg-cover flex justify-center">
                <div className="container py-30 text-white font-medium montserrat text-shadow-xs">
                    <h2 className='text-5xl my-6 text-shadow-xs'>
                        Bem-vindo, {usuario.nome}!
                    </h2>
                    <p className="text-2xl my-4">
                        Organize, personalize e acompanhe os treinos dos <br/> seus alunos de forma simples e eficiente.
                    </p>
                    <ModalProduto />
                </div>
            </div>
            <ListaProdutos/>

            
        </>
    )
}

export default Home