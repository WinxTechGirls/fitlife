import { FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'
import { ReactNode, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function Footer() {

    let data = new Date().getFullYear()
    
    const { usuario } = useContext(AuthContext)
    let componente: ReactNode

    if (usuario.token){
        componente = (<div className="flex justify-center bg-black text-white">
            <div className="container flex flex-col items-center py-4">
                <p className='text-xl font-bold font-serif text-red-800'>
                        Academia FitLife | Copyright: {data}
                    </p>
                <p className='text-lg text-red-800'>Acesse nossas redes sociais</p>
                <div className='flex gap-2'>
                <LinkedinLogo size={48} weight='bold' className='text-red-800' />
<InstagramLogo size={48} weight='bold' className='text-red-800' />
<FacebookLogo size={48} weight='bold' className='text-red-800' />
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