import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'listaComponent',
    templateUrl: './lista.component.html'
})
export class ListaComponent
{
    @Input() listaObjetos : any;
 }