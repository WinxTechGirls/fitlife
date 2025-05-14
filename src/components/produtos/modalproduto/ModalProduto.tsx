import Popup from 'reactjs-popup';
import FormProduto from '../formproduto/FormProduto';
import 'reactjs-popup/dist/index.css';
import './ModalProduto.css'

function ModalProduto() {
  return (
    <>
      <Popup trigger={
        <button className='border hover:border-red-700 rounded px-4 py-2 hover:bg-red-700 hover:text-white'>
          Registrar Novo Treino
        </button>
      } modal >
        <FormProduto />
      </Popup>
    </>
  );
}

export default ModalProduto;