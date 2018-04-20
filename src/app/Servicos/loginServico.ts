import { Injectable, Inject, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { HeadersToken } from '../Auth/header.token';

@Injectable()
export class LoginServico {
    url: string;
    headers: Headers;
    public usuarioLogin: Login = new Login();

    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string,
                                    private headerToken: HeadersToken,
                                    private router: Router)
    {
        this.url = baseUrl;

        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json; charset=utf-8');
    }

    login(usuario: Login) {
        let body = new URLSearchParams();
        body.set('grant_type','password');
        body.set('username', usuario.login);
        body.set('password', usuario.senha);
        body.set('client_id','123456');
        body.set('client_secret','abcdef');
        return this.http.post(this.url + 'OAuth/Token', body.toString(), this.headerToken.getOptions());
    }
}

class Login {
    @Input() login: string;
    @Input() senha: string;
  }