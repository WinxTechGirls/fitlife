import Popup from 'reactjs-popup';
import FormTreino from '../formtreino/FormTreino';
import 'reactjs-popup/dist/index.css';
import './ModalTreino.css'

function ModalTreino() {
  return (
    <>
      <Popup trigger={
        <button className='border hover:border-red-700 rounded px-4 py-2 hover:bg-red-700 hover:text-white'>
          Registrar Novo Treino
        </button>
      } modal >
        <FormTreino />
      </Popup>
    </>
  );
}

export default ModalTreino;