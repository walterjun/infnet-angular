import { Aluno } from "./Aluno";
import { Avaliacao } from "./Avaliacao";
import { Questao } from "./Questao";

export class Resposta{
    id: number;
    resposta: string;
    Aluno: Aluno;
    Avaliacao: Avaliacao;
    Questao: Questao;
}