import { AlunosServico } from "./Servicos/alunosServico";

export abstract class BaseServico {
    servico;

    listar(){
        this.servico.listar();
    }
}