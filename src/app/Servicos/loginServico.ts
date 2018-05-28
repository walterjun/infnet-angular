import { Injectable, Inject, Input } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class LoginServico {
    url: string;
    headers: Headers;
    public usuarioLogin: Login = new Login();

    constructor(private http: Http, @Inject('AUTH_URL') baseUrl: string,
                                    private router: Router)
    {
        this.url = baseUrl;

        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    }

    login(usuario: Login) {
        let body = new URLSearchParams();
        body.set('grant_type','password');
        body.set('username', usuario.login);
        body.set('password', usuario.senha);
        body.set('client_id','123456');
        body.set('client_secret','abcdef');
        return this.http.post(this.url + 'OAuth/Token', body.toString(), new RequestOptions({ headers: this.headers}) );
    }
}

class Login {
    @Input() login: string;
    @Input() senha: string;
  }