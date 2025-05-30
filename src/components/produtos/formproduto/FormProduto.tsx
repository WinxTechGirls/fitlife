import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produto";
import Nivel from "../../../models/Nivel";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function FormProduto() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [niveis, setNiveis] = useState<Nivel[]>([])

    const [nivel, setNivel] = useState<Nivel>({ id: 0, dificuldade: '', })
    const [produto, setProduto] = useState<Produto>({} as Produto)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarProdutoPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    async function buscarNivelPorId(id: string) {
        try {
            await buscar(`/niveis/${id}`, setNivel, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    async function buscarNiveis() {
        try {
            await buscar('/niveis', setNiveis, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarNiveis()

        if (id !== undefined) {
            buscarProdutoPorId(id)
        }
    }, [id])

    useEffect(() => {
        setProduto({
            ...produto,
            nivel: nivel,
        })
    }, [nivel])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            nivel: nivel,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/produtos');
    }

    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/produtos`, produto, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                });

                alert('Treino atualizado com sucesso')

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout()
                } else {
                    alert('Erro ao atualizar o Treino')
                }
            }

        } else {
            try {
                await cadastrar(`/produtos`, produto, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                })

                alert('Treino cadastrado com sucesso');

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout()
                } else {
                    alert('Erro ao cadastrar o Produto');
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoNivel = nivel.dificuldade === '';

    return (
        <div className="container flex flex-col mx-auto items-center text-white montserrat ">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar treino' : 'Cadastrar Treino'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoProduto}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Título do Treino</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        name="nome"
                        required
                        className="border-2 rounded p-2"
                        value={produto.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descricao do treino</label>
                    <textarea
                        placeholder="Descrição"
                        name="descricao"
                        required
                        className="border-2 rounded p-2 resize-y min-h-[100px]"
                        value={produto.descricao}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setProduto({
                            ...produto,
                            descricao: e.target.value,
                            nivel: nivel,
                            usuario: usuario,
                            })
                        }
                    />
                     {(produto.descricao?.length > 1000 || produto.descricao?.length < 5) && (
                        <span className="text-sm text-red-500">
                            A descrição deve ter entre 5 e 1000 caracteres.
                        </span>
                        )}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="foto">Foto</label>
                    <input
                        type="text"
                        placeholder="URL foto"
                        name="foto"
                        className="border-2 rounded p-2"
                        value={produto.foto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="duracao">Duração do treino</label>
                    <input
                        type="duracao"
                        placeholder="duracao em segundos"
                        name="duracao"
                        required
                        className="border-2 rounded p-2"
                        value={produto.duracao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Nivel do Treino</p>
                    <select name="nivel" id="nivel" className='bg-neutral-900 border p-2 border-slate-800 rounded'
                        onChange={(e) => buscarNivelPorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione um Produto</option>

                        {niveis.map((nivel) => (
                            <>
                                <option value={nivel.id!} >{nivel.dificuldade}</option>
                            </>
                        ))}

                    </select>
                </div>
                <button
                    type='submit'
                    className='rounded disabled:bg-stone-500 bg-red-700 hover:bg-red-800
                               text-white font-semibold w-1/2 mx-auto py-2 flex justify-center'
                    disabled={carregandoNivel}
                >
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormProduto;