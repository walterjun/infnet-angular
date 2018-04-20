import { Injectable, Inject } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HeadersToken {
    header: Headers;
    options: RequestOptions;

    constructor() {
        this.header = new Headers();
        this.header.set('Content-Type', 'application/x-www-form-urlencoded');

        // let body = new URLSearchParams();
        // this.header.set('grant_type','password');
        // this.header.set('username', 'usuario.login');
        // this.header.set('password', 'usuario.senha');
        // this.header.set('client_id','123456');
        // this.header.set('client_secret','abcdef');

        this.options = new RequestOptions({
            headers: this.header
        });
     }

    getOptions() {
        return this.options;
    }
}