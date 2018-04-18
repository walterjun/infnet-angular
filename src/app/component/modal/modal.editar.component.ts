import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal-editar',
  templateUrl: './modal.editar.component.html'
})
export class ModalEditarComponent {
  @Output() AcaoFechar = new EventEmitter();
  @Output() AcaoSalvar = new EventEmitter();

  @Input() Titulo = "Titulo";

  constructor() { }

  FecharModal(){
    this.AcaoFechar.emit();
  }

  salvar(){
    this.AcaoSalvar.emit();
    this.FecharModal();
  }
}