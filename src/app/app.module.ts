import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlunosComponent } from './alunos/alunos.component';
import { TurmaComponent } from './views/turma/turma.component';
import { MenuModule } from './component/menu/menu.module';
import { ModuloComponent } from './views/modulo/modulo.component';
import { BlocoComponent } from './views/bloco/bloco.component';
import { CursoComponent } from './views/curso/curso.component';
import { ProfessorComponent } from './views/professor/professor.component';
import { AssociacaoComponent } from './component/associacao/associacao.component';
import { AvaliacaoComponent } from './views/avaliacao/avaliacao.component';

import { ListaModule } from './component/lista/lista.module';
import { NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { ModalEditarModule } from './component/modal/modal.editar.module';
import { FormsModule } from '@angular/forms';
import { NgbDateNativeAdapter } from './Providers/NgbDateNativeAdapter';
import { HeadersToken } from './Auth/header.token';
import { HomeComponent } from './home/home.component';
import { ValidaLogin } from './Auth/validaLogin';

import { AlunosServico } from './Servicos/alunosServico';
import { TurmaServico } from './Servicos/turmaServico';
import { LoginServico } from './Servicos/loginServico';
import { ModuloServico } from './Servicos/moduloServico';
import { BlocoServico } from './Servicos/blocoServico';
import { CursoServico } from './Servicos/cursoServico';
import { ProfessorServico } from './Servicos/professorServico';
import { AvaliacaoServico } from './Servicos/AvaliacaoServico';



@NgModule({
  declarations: [
    AppComponent, AlunosComponent, HomeComponent, LoginComponent,
    TurmaComponent, ModuloComponent, BlocoComponent, CursoComponent, ProfessorComponent,
    AssociacaoComponent, AvaliacaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'alunos', component: AlunosComponent, canActivate: [ValidaLogin] },
      { path: 'api', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'turma', component: TurmaComponent, canActivate: [ValidaLogin] },
      { path: 'modulo', component: ModuloComponent, canActivate: [ValidaLogin] },
      { path: 'bloco', component: BlocoComponent, canActivate: [ValidaLogin] },
      { path: 'curso', component: CursoComponent, canActivate: [ValidaLogin] },
      { path: 'professor', component: ProfessorComponent, canActivate: [ValidaLogin] },
      { path: 'avaliacao', component: AvaliacaoComponent, canActivate: [ValidaLogin] }
    ]),
    NgbModule.forRoot(),
    Angular2FontawesomeModule,
    ListaModule,
    ModalEditarModule,
    FormsModule,
    MenuModule
  ],
  providers: [
    AlunosServico, HeadersToken, ValidaLogin, LoginServico, TurmaServico,
    ModuloServico, BlocoServico, CursoServico, ProfessorServico, AvaliacaoServico,
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    { provide: 'AUTH_URL', useFactory: getAuthUrl },
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return 'http://localhost:63790/';
}

export function getAuthUrl() {
  return 'http://localhost:63440/';
}