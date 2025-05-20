import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { AuthProvider } from './contexts/AuthContext';
import Cadastro from './pages/cadastro/Cadastro';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Perfil from './pages/perfil/Perfil';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ListaNiveis from './components/niveis/listaniveis/ListaNiveis';
import DeletarNivel from './components/niveis/deletarnivel/DeletarNivel';
import FormProduto from './components/produtos/formproduto/FormProduto';
import DeletarProduto from './components/produtos/deletarproduto/DeletarProduto';
import FormNivel from './components/niveis/formnivel/FormNivel';
import ListaProdutos from './components/produtos/listaprodutos/ListaProdutos';
import SobreNos from './pages/sobreNos/SobreNos';

function App() {

  return (
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <div className="min-h-[80vh]">
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/niveis" element={<ListaNiveis />} />
              <Route path="/cadastrarnivel" element={<FormNivel />} />
              <Route path="/editarnivel/:id" element={<FormNivel />} />
              <Route path="/deletarnivel/:id" element={<DeletarNivel />} />
              <Route path="/produtos" element={<ListaProdutos />} />
              <Route path="/cadastrarproduto" element={<FormProduto />} />
              <Route path="/editarproduto/:id" element={<FormProduto />} />
              <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/sobrenos" element={<SobreNos />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;