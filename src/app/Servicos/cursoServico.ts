import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { HeadersToken } from '../Auth/header.token';

@Injectable()
export class CursoServico {
    url: string;

    constructor(private http: Http,
                 @Inject('BASE_URL') baseUrl: string, 
                 private header: HeadersToken) {
        this.url = baseUrl + 'api/curso';
    }

    listar() {
        return this.http.get(this.url);
    }

    salvar(obj){
        if(obj.id){
            return this.http.put(this.url, obj);
        }else{
            return this.http.post(this.url, obj, this.header.getOptions());
        }
    }

    excluir(id){
        return this.http.delete(this.url + '?id=' + id, this.header.getOptions());
    }

    buscarBlocosAssociados(idCurso) {
        return this.http.get(this.url + '/BuscarBlocosPorCurso?idCurso=' + idCurso);
    }

    buscarBlocosNaoAssociados(idCurso) {
        return this.http.get(this.url + '/BuscarBlocosNaoAssociadosCurso?idCurso=' + idCurso);
    }

    atualizarBlocosDoCurso(curso){
        console.log(curso);
        return this.http.put(this.url + '/atualizarBlocosDoCurso', curso);
    }
}