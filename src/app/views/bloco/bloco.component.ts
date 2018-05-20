import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseTelas } from '../../BaseTelas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { BlocoServico } from '../../Servicos/blocoServico';
import { Bloco } from '../../Dominio/Bloco';


const now = new Date();

@Component({
  selector: 'bloco',
  templateUrl: './bloco.component.html'
})
export class BlocoComponent extends BaseTelas implements OnInit {

    public lista: Bloco;

  constructor(modalService: NgbModal, 
              private servico: BlocoServico) {
    super(modalService);
    this.modalIncluir = new Bloco();
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
                                          this.mensagem = 'Bloco salvo com sucesso!';
                                          this.type = 'success';
                  }, error => {
                                this.mensagem = 'Erro: ' + error;
                                this.type = 'danger';
                  });
  }

  abrirModalEditarOverride(item, BlocoEditar){
    this.abrirModalEditar(item, BlocoEditar);
  }

  excluir(id){
    this.servico.excluir(id).subscribe(
      result => { 
        this.listar();
        this.mensagem = 'Bloco excluído com sucesso!';
        this.type = 'success';
      }, error => { 
        this.mensagem = 'Erro na exclusão do Bloco';
        this.type = 'danger';
       }
    );
    this.windowsExcluir.close();
  }
}