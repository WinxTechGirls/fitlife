import { ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const { handleLogout, usuario } = useContext(AuthContext)

    function logout() {

        handleLogout()
        alert('O Usuário foi desconectado com sucesso!')
        navigate('/')
    }

    let componente: ReactNode

    if (usuario.token != ''){
        componente = (
        <div className='w-full text-white bg-red-800 flex justify-center py-4 montserrat'>

            <div className="container flex flex-col lg:flex-row lg:justify-between">
                <Link to='/home' className="text-2xl flex justify-center lg:justify-start">
                <img src="/Logo-Fitlife-branco.png" className="max-h-10"/>
                </Link>

                <div className='flex flex-col lg:flex-row gap-8 items-center'>
                    <Link to='/treinos' className='hover:underline'>Treinos</Link>
                    <Link to='/niveis' className='hover:underline'>Niveis</Link>
                    <Link to='/cadastrartreino' className='hover:underline'>Cadastrar treino</Link>
                    <Link to='/cadastrarnivel' className='hover:underline'>Cadastrar nível</Link>
                    <Link to='/perfil' className='hover:underline'>Perfil</Link>
                    <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                </div>
            </div>
        </div>
        )
    }
    
    return (
        <>
            {componente}
        </>
    )
}

export default Navbar