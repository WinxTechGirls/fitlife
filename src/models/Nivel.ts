import Produto from "./Produto";

export default interface Nivel {
    id: number | null;
    dificuldade: string;
    produto?: Produto[] | null;
}