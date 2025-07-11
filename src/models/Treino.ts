import Nivel from './Nivel';
import Usuario from './Usuario';

export default interface Treino {
  id: number;
  nome: string;
  descricao: string;
  foto?: string;
  duracao: number;
  nivel: Nivel | null;
  usuario: Usuario | null;
}