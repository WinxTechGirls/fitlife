import Treino from "./Treino";

export default interface Nivel {
    id: number | null;
    dificuldade: string;
    treino?: Treino[] | null;
}