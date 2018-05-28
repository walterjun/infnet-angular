import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'associacaoComponent',
    templateUrl: './associacao.component.html',
    styleUrls: ['./associacao.component.css']
})
export class AssociacaoComponent {
    @ViewChild('select') selectElRef;
    @Output() start: EventEmitter<any> = new EventEmitter();
    @Output() AcaoFechar = new EventEmitter();
    @Output() AcaoSalvar = new EventEmitter();
    @Input() naoAssociados;
    @Input() associados;

    valoresDaEsquerda = [];
    valoresDaDireita = [];

    constructor() { console.clear(); }

    ngAfterViewInit() {
        //this.updateSelectList();
    }
    updateSelectList() {
        this.start.emit(null);
    }
    selecaoEsquerda(options) {
        this.valoresDaEsquerda = Array.apply(null, options)
            .filter(option => option.selected)
            .map(option => option.value);
            console.log(this.valoresDaEsquerda);
    }

    selecaoDireita(options) {
        this.valoresDaDireita = Array.apply(null, options)
            .filter(option => option.selected)
            .map(option => option.value)
    }

    associar() {
        for(var i = this.naoAssociados.length - 1; i >= 0; i--) {
            if(Array.apply(null, this.valoresDaEsquerda).includes(String(this.naoAssociados[i].value))) {
                this.associados.push(this.naoAssociados[i]);
                this.naoAssociados.splice(i, 1);
            }
        }
    }

    desassociar() {
        for(var i = this.associados.length - 1; i >= 0; i--) {
            if(Array.apply(null, this.valoresDaDireita).includes(String(this.associados[i].value))) {
                this.naoAssociados.push(this.associados[i]);
                this.associados.splice(i, 1);
            }
        }
    }

    FecharModal() {
        this.AcaoFechar.emit();
    }

    salvarAssociacao() {
        this.AcaoSalvar.emit(this.associados);
        this.FecharModal();
    }
}