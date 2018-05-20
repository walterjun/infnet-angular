import { Turma } from "./Turma";

export class Aluno{
    id: number;
    Nome: string;
    CPF: string;
    DT_Nascimento: Date;
    Email: string;
    Turmas: Turma[];
    Respostas;
}