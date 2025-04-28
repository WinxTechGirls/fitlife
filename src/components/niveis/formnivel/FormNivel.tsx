import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Nivel from "../../../models/Nivel";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormNivel() {

    const navigate = useNavigate();

    const [nivel, setNivel] = useState<Nivel>({
        id: null,
        dificuldade: ''
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
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

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setNivel({
            ...nivel,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate("/niveis")
    }

    async function gerarNovoNivel(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/niveis`, nivel, setNivel, {
                    headers: { 'Authorization': token }
                })
                alert('O Nivel foi atualizado com sucesso!')
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    alert('Erro ao atualizar o nivel.')
                }

            }
        } else {
            try {
                await cadastrar(`/niveis`, nivel, setNivel, {
                    headers: { 'Authorization': token }
                })
                alert('O Nivel foi cadastrado com sucesso!')
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    alert('Erro ao cadastrar o nivel.')
                }

            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar Nivel' : 'Editar Nivel'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoNivel}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="dificuldade">Dificuldade do nivel</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui qual a dificuldade"
                        name='dificuldade'
                        className="border-2 border-slate-700 rounded p-2"
                        value={nivel.dificuldade}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-red-800
                               hover:bg-neutral-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>

                    }
                </button>
            </form>
        </div>
    );
}

export default FormNivel;