import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseTelas } from '../../BaseTelas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { ModuloServico } from '../../Servicos/moduloServico';
import { Modulo } from '../../Dominio/Modulo';


const now = new Date();

@Component({
  selector: 'modulo',
  templateUrl: './modulo.component.html'
})
export class ModuloComponent extends BaseTelas implements OnInit {

    public lista: Modulo;

  constructor(modalService: NgbModal, 
              private servico: ModuloServico) {
    super(modalService);
    this.modalIncluir = new Modulo();
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
                                          this.mensagem = 'Módulo salvo com sucesso!';
                                          this.type = 'success';
                  }, error => {
                                this.mensagem = 'Erro: ' + error;
                                this.type = 'danger';
                  });
  }

  abrirModalEditarOverride(item, ModuloEditar){
    this.abrirModalEditar(item, ModuloEditar);
  }

  excluir(id){
    this.servico.excluir(id).subscribe(
      result => { 
        this.listar();
        this.mensagem = 'Módulo excluído com sucesso!';
        this.type = 'success';
      }, error => { 
        this.mensagem = 'Erro na exclusão do Módulo';
        this.type = 'danger';
       }
    );
    this.windowsExcluir.close();
  }
}