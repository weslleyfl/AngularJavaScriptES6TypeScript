import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Pedido } from './../shared/pedido.model';
import { URL_API } from '../constantes/app.api';
import { ErrorHandler } from '../util/error-handler';

// pode ser uma constante
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        charset: 'utf-8'
    })
};

@Injectable({
    providedIn: 'root'
})
export class OrdemCompraService {

    private errorHandler: ErrorHandler = new ErrorHandler();

    constructor(private http: HttpClient) {

    }

    public efetivarCompra(pedido: Pedido): Observable<number> {
        // console.log('chegamos aqui ', pedido);

        // JSON.stringify(pedido)
        return this.http.post<Pedido>(`${URL_API}/pedidos`, pedido, httpOptions)
            .pipe(
                map((resposta: Pedido) => {
                    return resposta.id;
                }),
                catchError(this.errorHandler.handleError)
            );

    }


}
