import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../../contexts/AuthContext';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    return (
        <>
            <div className="fundoLogin grid grid-cols-1 lg:grid-cols-2 
                    h-screen place-items-center">
                <form className= "flex flex-col items-center justify-center text-slate-100 gap-4 w-full max-w-lg rounded-xl bg-neutral-950/70 shadow-lg backdrop-blur-md px-6 sm:px-10 md:px-16 lg:px-24 py-8 sm:py-10 lg:py-20" 
                    onSubmit={login}>
                    <h2 className=" text-5xl pb-8">Login</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Email</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Email"
                            className="border-2 border-amber-50 rounded p-2"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-amber-50 rounded p-2"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button
                        type='submit'
                        className="rounded bg-red-700 flex justify-center
                                   hover:bg-red-800 text-white w-1/2 py-2">
                                    
                        {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                            <span>Entrar</span>
                        }
                    </button>

                    <hr className="border-slate-800 w-full" />

                    <p>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-red-500 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default Login;
