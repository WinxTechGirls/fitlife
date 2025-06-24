import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Treino from "../../../models/Treino";
import Nivel from "../../../models/Nivel";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function FormTreino() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [niveis, setNiveis] = useState<Nivel[]>([]);
    const [nivel, setNivel] = useState<Nivel>({ id: 0, dificuldade: '' });
    const [treino, setTreino] = useState<Treino>({} as Treino);
    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarTreinoPorId(id: string) {
        try {
            await buscar(`/treinos/${id}`, setTreino, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) handleLogout();
        }
    }

    async function buscarNivelPorId(id: string) {
        try {
            await buscar(`/niveis/${id}`, setNivel, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) handleLogout();
        }
    }

    async function buscarNiveis() {
        try {
            await buscar('/niveis', setNiveis, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) handleLogout();
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarNiveis();
        if (id !== undefined) buscarTreinoPorId(id);
    }, [id]);

    useEffect(() => {
        setTreino({
            ...treino,
            nivel: nivel,
        });
    }, [nivel]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTreino({
            ...treino,
            [e.target.name]: e.target.value,
            nivel: nivel,
            usuario: usuario,
        });
    }

    async function handleUploadFoto(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "fitlife");
        formData.append("cloud_name", "dzmzaog7x");

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dzmzaog7x/image/upload", {
                method: "POST",
                body: formData
            });
            const data = await res.json();

            setTreino({
                ...treino,
                foto: data.secure_url,
                nivel: nivel,
                usuario: usuario,
            });
        } catch (err) {
            alert("Erro ao fazer upload da imagem");
            console.error(err);
        }
    }

    function retornar() {
        navigate('/treinos');
    }

    async function gerarNovoTreino(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const config = { headers: { Authorization: token } };

        try {
            if (id !== undefined) {
                await atualizar(`/treinos`, treino, setTreino, config);
                alert('Treino atualizado com sucesso');
            } else {
                await cadastrar(`/treinos`, treino, setTreino, config);
                alert('Treino cadastrado com sucesso');
            }
        } catch (error: any) {
            if (error.toString().includes('403')) handleLogout();
            else alert('Erro ao salvar o Treino');
        }

        setIsLoading(false);
        retornar();
    }

    const carregandoNivel = nivel.dificuldade === '';

    return (
        <div className="container flex flex-col mx-auto items-center text-white montserrat ">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar treino' : 'Cadastrar Treino'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoTreino}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome">Título do Treino</label>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Título"
                        required
                        className="border-2 rounded p-2"
                        value={treino.nome}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do treino</label>
                    <textarea
                        name="descricao"
                        placeholder="Descrição"
                        required
                        className="border-2 rounded p-2 resize-y min-h-[100px]"
                        value={treino.descricao}
                        onChange={(e) => setTreino({ ...treino, descricao: e.target.value, nivel, usuario })}
                    />
                    {(treino.descricao?.length > 1000 || treino.descricao?.length < 5) && (
                        <span className="text-sm text-red-500">
                            A descrição deve ter entre 5 e 1000 caracteres.
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="foto">Foto do Treino</label>
                    <input
                        type="file"
                        accept="image/*"
                        name="foto"
                        className="file:bg-red-700 file:hover:bg-red-800 file:text-white file:px-4 file:py-2 file:rounded file:border-none"
                        onChange={handleUploadFoto}
                    />
                    {treino.foto && (
                        <img src={treino.foto} alt="Pré-visualização" className="w-full max-h-80 object-contain mt-2 rounded" />
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="duracao">Duração do treino (em segundos)</label>
                    <input
                        type="number"
                        name="duracao"
                        placeholder="Ex: 900"
                        required
                        className="border-2 rounded p-2"
                        value={treino.duracao}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p>Nível do Treino</p>
                    <select
                        name="nivel"
                        id="nivel"
                        className="bg-neutral-900 border p-2 border-slate-800 rounded"
                        onChange={(e) => buscarNivelPorId(e.currentTarget.value)}
                        required
                    >
                        <option value="" disabled selected>Selecione um Nível</option>
                        {niveis.map((nivel) => (
                            <option key={nivel.id} value={nivel.id}>{nivel.dificuldade}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="rounded disabled:bg-stone-500 bg-red-700 hover:bg-red-800
                               text-white font-semibold w-1/2 mx-auto py-2 flex justify-center"
                    disabled={carregandoNivel}
                >
                    {isLoading ? (
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />
                    ) : (
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormTreino;
