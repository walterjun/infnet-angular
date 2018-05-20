import { Component, OnInit, Inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Http } from '@angular/http';
import { HeadersToken } from '../Auth/header.token';
import { Router } from '@angular/router';
import { LoginServico } from '../Servicos/loginServico';
import { Login } from '../Dominio/login';

const now = new Date();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

    url: string;
    headers: Headers;
    usuario: Login = new Login();

    public type: string = '';
    public mensagem: string;

    constructor(private http: Http, @Inject('AUTH_URL') baseUrl: string,
                                    private headerToken: HeadersToken,
                                    private router: Router,
                                    private loginServico: LoginServico)
    {
        this.url = baseUrl;
        
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json; charset=utf-8');
    }

    logar() {
        this.loginServico.login(this.usuario)
          .subscribe(response => {
            let user = response.json();
            localStorage.setItem('token', user);
            this.router.navigate(['/']);
          }, error => {
            this.type = 'danger';
            this.mensagem = error.json().mensagem;
          });
      }
    
      public closeAlert() {
        this.mensagem = '';
        this.type = '';
      }
}