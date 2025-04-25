
function Home() {
    return (
        <>
            <div className="bg-black justify-center">
                <div className='container grid grid-cols-2 text-white'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold font-serif  text-red-800'>
                            ACADEMIA < br />
                            <span className="ml-10 text-red-800">FITLIFE</span>
                        </h2>

                       
                    </div>

                    <div className="flex justify-center ">
                        <img
                            src="https://images.pexels.com/photos/4753996/pexels-photo-4753996.jpeg"
                            alt="Imagem Página Home"
                            className='w-2/4'
                        />
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <p className="text-justify font-serif" style={{ lineHeight: '1.9', maxWidth: '600px', margin: '200px 20px 0 30px' }}>
                A FITLIFE é mais do que uma academia, é um espaço prazeroso dedicado ao condicionamento físico 
                e à saúde de seus alunos. A FITLIFE acredita na importância de melhorar a qualidade de vida, 
                tanto no aspecto físico quanto emocional. Para isso, oferece um ambiente amplo e 
                cuidadosamente projetado, com instalações de alta tecnologia.

                Você encontrará diferenciais exclusivos, como uma área de musculação completa, salas de Squash, 
                natação em ambientes inspirados no magnífico aquário de Okinawa, além de espaços 
                dedicados ao atletismo, lutas e CrossFit. A diversidade de atividades garante que todos 
                encontrem algo que se adapte ao seu estilo de vida. <br />A FITLIFE se torna parte do estilo de vida dos alunos, que se tornam frequentadores <br />constantes devido ao atendimento personalizado, à excelência técnica e ao compromisso com a conquista de resultados. <br /> Junte-se a nós e venha fazer parte dessa experiência
            </p>
    
            <div style={{ marginLeft: '20px' }}>
            <video autoPlay loop muted>
            <source src="src/assets/video/4367573-hd_1920_1080_30fps.mp4" />
            </video>
            </div>
            
            </div>
            
        </>
    )
}

export default Home