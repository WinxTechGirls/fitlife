import { ReactNode, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { ImGithub } from 'react-icons/im'
import { Link } from 'react-router-dom'

function Footer() {

    let data = new Date().getFullYear()
    
    const { usuario } = useContext(AuthContext)
    let componente: ReactNode

    if (usuario.token){
        componente = (
        <div className="flex justify-center  text-red-700 montserrat bg-neutral-950">
            <div className="container flex flex-col items-center py-4">
                <p className='text-xl font-bold'>
                        FitLife | Copyright: {data}
                    </p>
                <p className='text-lg'>Explore mais de nossos projetos:</p>
                <a href='https://github.com/orgs/WinxTechGirls/repositories'
                target="_blank"
                className='flex gap-2 items-center'>
                    <ImGithub size={32} className='' />
                    <p>WinxTechGirls</p>
                </a>
                <div className="mt-4">
                    <Link
                    to="/sobrenos"
                    className="hover:underline text-sm font-semibold text-white"
                    >
                    Sobre as Desenvolvedoras
                    </Link>
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

export default Footer