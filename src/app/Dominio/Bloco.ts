import { Modulo } from "./Modulo";
import { Curso } from "./Curso";

export class Bloco{
    id: number;
    Nome: string;
    Curso: Curso;
    Modulos: Modulo[];
}