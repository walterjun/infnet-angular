import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { HeadersToken } from '../Auth/header.token';

@Injectable()
export class AvaliacaoServico {
    url: string;

    constructor(private http: Http,
                 @Inject('BASE_URL') baseUrl: string, 
                 private header: HeadersToken) {
        this.url = baseUrl + 'api/Avaliacao';
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

    buscarModulosAssociados(idBloco) {
        return this.http.get(this.url + '/BuscarModulosPorBloco?idBloco=' + idBloco);
    }

    buscarModulosNaoAssociados(idBloco) {
        return this.http.get(this.url + '/BuscarModulosNaoAssociadosBloco?idBloco=' + idBloco);
    }

    atualizarModulosDoCurso(bloco){
        return this.http.put(this.url + '/atualizarModulosDoBloco', bloco);
    }
}