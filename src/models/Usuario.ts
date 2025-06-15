import Treino from "./Treino";

export default interface Usuario {
  id?: number | null;
  nome: string;
  usuario: string;
  foto: string;
  senha: string;
  treino?: Treino[] | null;
}