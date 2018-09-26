import { Turma } from "./Turma";
import { Modulo } from "./Modulo";
import { Professor } from "./Professor";
import { Avaliacao } from "./Avaliacao";

export class ModuloTurma{
    id: number;
    Turma: Turma;
    Modulo: Modulo;
    Professor: Professor;
    Avaliacao: Avaliacao;
}