import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Service'
import './Cadastro.css'
import { RotatingLines } from 'react-loader-spinner'

function Cadastro() {

  const navigate = useNavigate()
  
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const[confirmaSenha, setConfirmaSenha] = useState<string>("")

  const [touchedNome, setTouchedNome] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedSenha, setTouchedSenha] = useState(false);
  const [touchedConfirmarSenha, setTouchedConfirmarSenha] = useState(false);

  const [usuario, setUsuario] = useState<Usuario>({
    id: null,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

    const formularioInvalido =
      usuario.nome.trim() === '' ||
      usuario.usuario.trim() === '' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.usuario) ||
      usuario.senha.length < 8 ||
      usuario.senha !== confirmaSenha;

  
  // Verifica se o usuário já está logado
  useEffect(() => {
    if (usuario.id !== 0 && usuario.id !== null){
      retornar()
    }
  }, [usuario])

  function retornar(){
    navigate('/login')
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })

  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmaSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    if(confirmaSenha === usuario.senha && usuario.senha.length >= 8){

      setIsLoading(true)

      try{
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        alert('Usuário cadastrado com sucesso!')
      }catch(error){
        alert('Erro ao cadastrar o usuário!')
      }
    }else{
      alert('Dados do usuário inconsistentes! Verifique as informações do cadastro.')
      setUsuario({...usuario, senha: ''})
      setConfirmaSenha('')
    }

    setIsLoading(false)
  }

  async function handleUploadFoto(e: ChangeEvent<HTMLInputElement>) {
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "fitlife-users"); 
      formData.append("cloud_name", "dzmzaog7x");

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dzmzaog7x/image/upload", {
          method: "POST",
          body: formData
        });
        const data = await res.json();

        setUsuario({
          ...usuario,
          foto: data.secure_url
        });
      } catch (err) {
        alert("Erro ao fazer upload da imagem");
        console.error(err);
      }
    }
  
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center fundoCadastro">
        <form className='flex flex-col lg:col-start-2 items-center justify-center gap-4 w-full max-w-xl text-slate-100 bg-neutral-950/70 backdrop-blur-md shadow-lg rounded-xl px-6 sm:px-10 md:px-16 lg:px-24 py-8 sm:py-10 lg:py-12' 
          onSubmit={cadastrarNovoUsuario}>
          <h2 className='text-4xl'>Cadastrar</h2>
          <div className="flex flex-col w-full space-y-2.5">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-amber-50 p-2 rounded-sm"
              value={usuario.nome}
              onChange={(e) => atualizarEstado(e)}
              onBlur={() => setTouchedNome(true)}
            />
            {touchedNome && usuario.nome.trim() === '' && (
              <span className="text-sm text-red-500">O nome é obrigatório.</span>
            )}
          </div>
          <div className="flex flex-col w-full space-y-2.5">
            <label htmlFor="usuario">Email</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Email"
              className="border-2 border-amber-50 p-2 rounded-sm"
              value = {usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              onBlur={() => setTouchedEmail(true)}
            />
            {touchedEmail && usuario.usuario.trim() === '' && (
              <span className="text-sm text-red-500">O e-mail é obrigatório.</span>
            )}
            {touchedEmail && usuario.usuario.trim() !== '' &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.usuario) && (
              <span className="text-sm text-red-500">Digite um e-mail válido.</span>
            )}
          </div>
          <div className="flex flex-col w-full space-y-2.5">
            <label htmlFor="foto">Foto</label>
            <input
              type="file"
              accept="image/*"
              name="foto"
              id="foto"
              className="file:bg-red-700 file:hover:bg-red-800 file:text-white file:px-4 file:py-2 file:rounded file:border-none"
              onChange={handleUploadFoto}
            />
            {usuario.foto && (
              <img src={usuario.foto} alt="Pré-visualização" className="max-h-48 w-full object-contain mt-2 rounded" />
            )}
          </div>
          <div className="flex flex-col w-full space-y-2.5">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-amber-50 p-2 rounded-sm"
              value = {usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              onBlur={() => setTouchedSenha(true)}
            />
            {touchedSenha && usuario.senha.length > 0 && usuario.senha.length < 8 && (
              <span className="text-sm text-red-500">A senha deve ter no mínimo 8 caracteres.</span>
            )}
          </div>
          <div className="flex flex-col w-full space-y-2.5">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-amber-50 p-2 rounded-sm"
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
              onBlur={() => setTouchedConfirmarSenha(true)}
            />
            {touchedConfirmarSenha && confirmaSenha && usuario.senha !== confirmaSenha && (
              <span className="text-sm text-red-500">As senhas não coincidem.</span>
            )}
          </div>
          <div className="flex justify-around w-full gap-8">
            <button 
                type='reset'
                className='rounded text-white bg-neutral-700 
                hover:bg-neutral-800 w-1/2 py-2' 
                onClick={retornar}
			      >
              Cancelar
            </button>
            <button 
                type='submit'
                className='rounded text-white bg-red-700 hover:bg-red-800 w-1/2 py-2 flex justify-center disabled:bg-neutral-500' 
                disabled={formularioInvalido || isLoading}>
                  {isLoading ? <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  /> :
                    <span>Cadastrar</span>
                  }
              
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro
