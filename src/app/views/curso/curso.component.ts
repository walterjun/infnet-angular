import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BaseTelas } from '../../BaseTelas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { CursoServico } from '../../Servicos/cursoServico';
import { Curso } from '../../Dominio/Curso';
import { Bloco } from '../../Dominio/Bloco';


const now = new Date();

@Component({
  selector: 'curso',
  templateUrl: './curso.component.html'
})
export class CursoComponent extends BaseTelas implements OnInit {

    public lista: Curso;
    naoAssociados = [];
    associados = [];
    cursoAssoc;

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

  abrirAssociacao(item, TelaAssociacao){
    this.naoAssociados = [];
    this.associados = [];

    this.servico
              .buscarBlocosNaoAssociados(item.id)
              .subscribe(result => {
                var reslJson = result.json();
                for(var k in reslJson){
                this.naoAssociados.push({name: reslJson[k].Nome, value: reslJson[k].id});
              }
               });

    this.servico
              .buscarBlocosAssociados(item.id)
              .subscribe(result => { var reslJson = result.json();
                for(var k in reslJson){
                this.associados.push({name: reslJson[k].Nome, value: reslJson[k].id});
              } });
    this.cursoAssoc = item;
    this.abrirModalEditar(item, TelaAssociacao);
  }

  salvarAssociacao(blc){
    var cur = new Curso();
    cur = this.cursoAssoc;
    cur.Blocos = new Array<Bloco>();

    for(var x in blc){
      var bl = new Bloco();
      bl.id = blc[x].value;
      bl.Nome = blc[x].name;
      cur.Blocos.push(bl);
    }

    this.servico.atualizarBlocosDoCurso(cur).subscribe(result => {
      console.log(result);
    });
    
  }
}