import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseTelas } from '../../BaseTelas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { Avaliacao } from '../../Dominio/Avaliacao';
import { AvaliacaoServico } from '../../Servicos/AvaliacaoServico';

const now = new Date();

@Component({
  selector: 'avaliacao',
  templateUrl: './avaliacao.component.html'
})
export class AvaliacaoComponent extends BaseTelas implements OnInit {

    public lista: Avaliacao;
    naoAssociados = [];
    associados = [];
    avaliAssoc;

  constructor(modalService: NgbModal, 
              private servico: AvaliacaoServico) {
    super(modalService);
    this.modalIncluir = new Avaliacao();
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
                                          this.mensagem = 'Avaliação salva com sucesso!';
                                          this.type = 'success';
                  }, error => {
                                this.mensagem = 'Erro: ' + error;
                                this.type = 'danger';
                  });
  }

  abrirModalEditarOverride(item, AvaliacaoEditar){
    this.abrirModalEditar(item, AvaliacaoEditar);
  }

  excluir(id){
    this.servico.excluir(id).subscribe(
      result => { 
        this.listar();
        this.mensagem = 'Avaliação excluída com sucesso!';
        this.type = 'success';
      }, error => { 
        this.mensagem = 'Erro na exclusão da avaliação';
        this.type = 'danger';
       }
    );
    this.windowsExcluir.close();
  }

  abrirAssociacao(item, TelaAssociacao){
    this.naoAssociados = [];
    this.associados = [];

    this.servico
              .buscarModulosNaoAssociados(item.id)
              .subscribe(result => {
                var reslJson = result.json();
                for(var k in reslJson){
                this.naoAssociados.push({name: reslJson[k].Nome, value: reslJson[k].id});
              }
               });

    this.servico
              .buscarModulosAssociados(item.id)
              .subscribe(result => { var reslJson = result.json();
                for(var k in reslJson){
                this.associados.push({name: reslJson[k].Nome, value: reslJson[k].id});
              } });
    this.avaliAssoc = item;
    this.abrirModalEditar(item, TelaAssociacao);
  }

  salvarAssociacao(modc){
    
    
  }
}