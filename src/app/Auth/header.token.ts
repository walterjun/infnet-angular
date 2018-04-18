import { Injectable, Inject } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HeadersToken {
    header: Headers;
    options: RequestOptions;

    constructor() { }

    atualizarHeaders() {
        this.header = new Headers();
        this.header.set('Content-Type', 'application/json; charset=utf-8');

        this.options = new RequestOptions({
            headers: this.header
        });
    }

    getOptions() {
        return this.options;
    }
}