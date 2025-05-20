import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"
import { buscar } from "../../services/Service"
import Produto from "../../models/Produto"
import CardProduto from "../../components/produtos/cardprodutos/CardProdutos"

function Perfil() {
	const navigate = useNavigate()

	const { usuario } = useContext(AuthContext)
	const [produtos, setProdutos] = useState<Produto[]>([])

	useEffect(() => {
		if (usuario.token === "") {
			alert("Você precisa estar logado")
			navigate("/")
		}
	}, [usuario.token])

	useEffect(() => {
		async function buscarProdutos() {
			try {
				await buscar("/produtos", setProdutos, {
					headers: { Authorization: usuario.token }
				})
			} catch (error) {
				console.error("Erro ao buscar produtos:", error)
			}
		}

		if (usuario.id !== undefined) {
			buscarProdutos()
		}
	}, [usuario.id])

	const produtosDoUsuario = produtos.filter(prod => prod.usuario?.id === usuario.id)

	return (
		<div className="container justify-center mx-auto montserrat">
			<div className="bg-[url(bg-niveis.jpg)] bg-cover mx-auto my-4 rounded-2xl overflow-hidden p-5">
				<div className="w-fit mx-auto my-10 text-lg bg-neutral-950/70 backdrop-blur-md rounded-2xl p-15 flex-col space-y-5">
					<img
						className="rounded-full w-56 mx-auto border-8 border-white relative z-10"
						src={usuario?.foto || 'https://www.svgrepo.com/show/192244/man-user.svg'}
						alt={`Foto de perfil de ${usuario.nome}`}
					/>
					<p>Nome: {usuario.nome} </p>
					<p>Email: {usuario.usuario}</p>
				</div>
			</div>

			<h2 className="text-3xl mt-8 mb-4">Treinos Criados por Você</h2>

			{produtosDoUsuario.length === 0 ? (
				<p className="text-lg text-center text-white mb-8">Você ainda não cadastrou nenhum treino.</p>
			) : (
				<div className="w-full lg:w-2/3 space-y-5 mb-12">
					{produtosDoUsuario.map(prod => (
						<CardProduto key={prod.id} produto={prod} />
					))}
				</div>
			)}

		</div>
	)
}

export default Perfil
