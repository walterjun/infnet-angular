import { Questao } from "./Questao";
import { Resposta } from "./Resposta";
import { ModuloTurma } from "./ModuloTurma";


export class Avaliacao{
    id: number;
    descricao: string;
    Objetivo: string;
    DataInicio: Date;
    DataFim: Date;
    Questoes: Questao[];
    Respostas: Resposta[];
    ModuloTumas: ModuloTurma[];
}