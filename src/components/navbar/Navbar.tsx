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
        componente = (<div className='w-full bg-black text-white
        flex justify-center py-4'>

        <div className="container flex justify-between text-lg">
            <Link to='/home' className="text-2xl font-bold font-serif text-red-800">FitLife</Link>

            <div className='flex gap-4'>
                <Link to='/produtos' className='hover:underline font-bold font-serif text-red-800'>Treinos</Link>
                <Link to='/niveis' className='hover:underline font-bold font-serif text-red-800'>Niveis</Link>
                <Link to='/cadastrarnivel' className='hover:underline font-bold font-serif text-red-800'>Cadastrar nível</Link>
                <Link to='/perfil' className='hover:underline font-bold font-serif text-red-800'>Perfil</Link>
                <Link to='' onClick={logout} className='hover:underline font-bold font-serif text-red-800'>Sair</Link>
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