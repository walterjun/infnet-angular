import { TopicoAvaliacao } from "./TopicoAvaliacao";
import { Resposta } from "./Resposta";
import { Avaliacao } from "./Avaliacao";

export class Questao{
    id: number;
    Pergunta: string;
    TopicoAvaliacao: TopicoAvaliacao;
    Respostas: Resposta[];
    Avaliacoes: Avaliacao[];
}