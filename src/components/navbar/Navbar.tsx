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
        componente = (<div className='w-full bg-indigo-900 text-white
        flex justify-center py-4'>

        <div className="container flex justify-between text-lg">
            <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>

            <div className='flex gap-4'>
                <Link to='/produtos' className='hover:underline'>Treinos</Link>
                <Link to='/niveis' className='hover:underline'>Niveis</Link>
                <Link to='/cadastrarnivel' className='hover:underline'>Cadastrar nível</Link>
                <Link to='/perfil' className='hover:underline'>Perfil</Link>
                <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
            </div>
        </div>
    </div>)
    }
    
    return (
        <>
            {componente}
        </>
    )
}

export default Navbar