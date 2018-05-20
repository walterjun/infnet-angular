import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseTelas } from '../../BaseTelas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { TurmaServico } from '../../Servicos/turmaServico';
import { Turma } from '../../Dominio/Turma';


const now = new Date();

@Component({
  selector: 'turma',
  templateUrl: './turma.component.html'
})
export class TurmaComponent extends BaseTelas implements OnInit {

    public lista: Turma;

  constructor(modalService: NgbModal, 
              private servico: TurmaServico) {
    super(modalService);
    this.modalIncluir = new Turma();
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
                                          this.mensagem = 'Turma salva com sucesso!';
                                          this.type = 'success';
                  }, error => {
                                this.mensagem = 'Erro: ' + error;
                                this.type = 'danger';
                  });
  }

  abrirModalEditarOverride(item, TurmaEditar){
    this.abrirModalEditar(item, TurmaEditar);
  }

  excluir(id){
    this.servico.excluir(id).subscribe(
      result => { 
        this.listar();
        this.mensagem = 'Turma excluída com sucesso!';
        this.type = 'success';
      }, error => { 
        this.mensagem = 'Erro na exclusão da turma';
        this.type = 'danger';
       }
    );
    this.windowsExcluir.close();
  }
}