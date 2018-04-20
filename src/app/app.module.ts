import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';


import { AppComponent } from './app.component';
import { AlunosComponent } from './alunos/alunos.component';
import { MenuModule } from './component/menu/menu.module';

import { AlunosServico } from './Servicos/alunosServico';

import { ListaModule } from './component/lista/lista.module';
import { NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { ModalEditarModule } from './component/modal/modal.editar.module';
import { FormsModule } from '@angular/forms';
import { NgbDateNativeAdapter } from './Providers/NgbDateNativeAdapter';
import { HeadersToken } from './Auth/header.token';
import { HomeComponent } from './home/home.component';
import { ValidaLogin } from './Auth/validaLogin';
import { LoginComponent } from './login/login.component';
import { LoginServico } from './Servicos/loginServico';



@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'alunos', component: AlunosComponent, canActivate: [ValidaLogin] },
      { path: 'api', component: HomeComponent },
      { path: 'login', component: LoginComponent }
    ]),
    NgbModule.forRoot(),
    Angular2FontawesomeModule,
    ListaModule,
    ModalEditarModule,
    FormsModule,
    MenuModule
  ],
  providers: [
    AlunosServico, HeadersToken, ValidaLogin, LoginServico,
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return 'http://localhost:63440/';
}