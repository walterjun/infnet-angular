import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseTelas } from '../../BaseTelas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { CursoServico } from '../../Servicos/cursoServico';
import { Curso } from '../../Dominio/Curso';


const now = new Date();

@Component({
  selector: 'curso',
  templateUrl: './curso.component.html'
})
export class CursoComponent extends BaseTelas implements OnInit {

    public lista: Curso;

  constructor(modalService: NgbModal, 
              private servico: CursoServico) {
    super(modalService);
    this.modalIncluir = new Curso();
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
                                          this.mensagem = 'Curso salvo com sucesso!';
                                          this.type = 'success';
                  }, error => {
                                this.mensagem = 'Erro: ' + error;
                                this.type = 'danger';
                  });
  }

  abrirModalEditarOverride(item, CursoEditar){
    this.abrirModalEditar(item, CursoEditar);
  }

  excluir(id){
    this.servico.excluir(id).subscribe(
      result => { 
        this.listar();
        this.mensagem = 'Curso excluído com sucesso!';
        this.type = 'success';
      }, error => { 
        this.mensagem = 'Erro na exclusão do Curso';
        this.type = 'danger';
       }
    );
    this.windowsExcluir.close();
  }
}