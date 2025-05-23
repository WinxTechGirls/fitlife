import { FaGithub, FaLinkedin } from 'react-icons/fa';

function SobreNos() {
  const membros = [
    {
      nome: "Nycolly Vitoria de Oliveira",
      imagem: "/devas/Nycolly.jpeg",
      github: "https://github.com/NycollyWeiss",
      linkedin: "https://www.linkedin.com/in/nycollyweiss/"
    },
    {
      nome: "Mireli Neta de Oliveira Silva Borges",
      imagem: "/devas/Mireli.jpeg",
      github: "https://github.com/mikaborges",
      linkedin: "https://www.linkedin.com/in/mireliborges/"
    },
    {
      nome: "Mariana Marie Iha",
      imagem: "/devas/Mariana.jpeg",
      github: "https://github.com/ihamari",
      linkedin: "https://www.linkedin.com/in/mariana-marie-iha/"
    },
    {
      nome: "Najla Madeira Sabino Guimarães",
      imagem: "/devas/Najla.jpeg",
      github: "https://github.com/NahGuimaraes",
      linkedin: "https://www.linkedin.com/in/najlaguimaraes/"
    },
    {
      nome: "Lays Sabryna Sousa",
      imagem: "/devas/Sabryna.jpeg",
      github: "https://github.com/SabrynaSousa",
      linkedin: "https://www.linkedin.com/in/lays-sabryna-sousa/"
    }
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 montserrat">
      <h2 className="text-3xl font-semibold text-center mb-10">Nossa Equipe</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {membros.map((membro, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 rounded-2xl shadow-md hover:shadow-lg transition space-y-4 py-10 bg-neutral-800"
          >
            {membro.imagem ? (
              <img
                className="w-32 h-32 rounded-full object-cover mb-4"
                src={membro.imagem}
                alt={membro.nome}
              />
            ) : (
              <div className="w-32 h-32 rounded-full mb-4 flex items-center justify-center">
                Sem imagem
              </div>
            )}
            <h3 className="text-lg text-center">{membro.nome}</h3>
            <div className="flex space-x-4">
              {membro.github && (
                <a href={membro.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-xl  hover:text-black transition" />
                </a>
              )}
              {membro.linkedin && (
                <a href={membro.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-xl text-blue-600 hover:text-blue-800 transition" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SobreNos;
