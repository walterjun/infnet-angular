import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { HeadersToken } from '../Auth/header.token';

@Injectable()
export class AlunosServico {
    url: string;

    constructor(private http: Http,
                 @Inject('BASE_URL') baseUrl: string, 
                 private header: HeadersToken) {
        this.url = baseUrl + 'api/aluno';
    }

    listar() {
        return this.http.get(this.url);
    }

    salvar(aluno){
        if(aluno.id){
            return this.http.put(this.url, aluno);
        }else{
            return this.http.post(this.url, aluno, this.header.getOptions());
        }
    }

    excluir(id){
        return this.http.delete(this.url + '?id=' + id, this.header.getOptions());
    }
}