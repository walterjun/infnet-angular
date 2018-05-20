import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseTelas } from '../../BaseTelas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { ProfessorServico } from '../../Servicos/professorServico';
import { Professor } from '../../Dominio/Professor';


const now = new Date();

@Component({
  selector: 'professor',
  templateUrl: './professor.component.html'
})
export class ProfessorComponent extends BaseTelas implements OnInit {

    public lista: Professor;

  constructor(modalService: NgbModal, 
              private servico: ProfessorServico) {
    super(modalService);
    this.modalIncluir = new Professor();
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
                                          this.mensagem = 'Professor salvo com sucesso!';
                                          this.type = 'success';
                  }, error => {
                                this.mensagem = 'Erro: ' + error;
                                this.type = 'danger';
                  });
  }

  abrirModalEditarOverride(item, ProfessorEditar){
    this.abrirModalEditar(item, ProfessorEditar);
  }

  excluir(id){
    this.servico.excluir(id).subscribe(
      result => { 
        this.listar();
        this.mensagem = 'Professor excluído com sucesso!';
        this.type = 'success';
      }, error => { 
        this.mensagem = 'Erro na exclusão do Professor';
        this.type = 'danger';
       }
    );
    this.windowsExcluir.close();
  }
}