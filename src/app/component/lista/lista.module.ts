import { NgModule } from '@angular/core';
import { ListaComponent } from './lista.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports:[CommonModule],
    declarations: [ ListaComponent ],
    exports: [ ListaComponent ]
})
export class ListaModule { }