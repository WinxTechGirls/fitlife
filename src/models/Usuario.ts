import Produto from "./Produto";

export default interface Usuario {
  id?: number | null;
  nome: string;
  usuario: string;
  foto: string;
  senha: string;
  produto?: Produto[] | null;
}