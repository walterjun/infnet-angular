import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseTelas } from '../../BaseTelas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { BlocoServico } from '../../Servicos/blocoServico';
import { Bloco } from '../../Dominio/Bloco';
import { Modulo } from '../../Dominio/Modulo';


const now = new Date();

@Component({
  selector: 'bloco',
  templateUrl: './bloco.component.html'
})
export class BlocoComponent extends BaseTelas implements OnInit {

    public lista: Bloco;
    naoAssociados = [];
    associados = [];
    blocoAssoc;

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
    this.blocoAssoc = item;
    this.abrirModalEditar(item, TelaAssociacao);
  }

  salvarAssociacao(modc){
    var bl = new Bloco();
    bl = this.blocoAssoc;
    bl.Modulos = new Array<Modulo>();

    for(var x in modc){
      var mod = new Modulo();
      mod.id = modc[x].value;
      mod.Nome = modc[x].name;
      bl.Modulos.push(mod);
    }

    this.servico.atualizarModulosDoCurso(bl).subscribe(result => {
      this.mensagem = 'Bloco salvo com sucesso!';
      this.type = 'success';
    });
    
  }
}