import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AlunosServico } from '../Servicos/alunosServico';
import { BaseTelas } from '../BaseTelas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { Aluno } from '../Dominio/Aluno';

const now = new Date();

@Component({
  selector: 'alunos',
  templateUrl: './alunos.component.html'
})
export class AlunosComponent extends BaseTelas implements OnInit {

    public lista: Aluno;

  constructor(modalService: NgbModal, 
              private servico: AlunosServico) {
    super(modalService);
    this.modalIncluir = new Aluno();
    this.listar();
   }

  ngOnInit() { }

  listar(){
    this.servico.listar().subscribe(
      result => { this.lista = result.json();}
    );
  }

  salvar(){
      this.servico.salvar(this.modalEdicao)
                  .subscribe(result => {
                                          this.listar();
                                          this.mensagem = 'Usuário salvo com sucesso!';
                                          this.type = 'success';
                  }, error => {
                                this.mensagem = 'Erro';
                                this.type = 'danger';
                  });
  }

  abrirModalEditarOverride(item, AlunosEditar){
    this.abrirModalEditar(item, AlunosEditar);
  }

  excluir(id){
    this.servico.excluir(id).subscribe(
      result => { 
        this.listar();
        this.mensagem = 'Usuário excluído com sucesso!';
        this.type = 'success';
      }, error => { 
        this.mensagem = 'Erro na exclusão do usuário';
        this.type = 'danger';
       }
    );
    this.windowsExcluir.close();
  }
}