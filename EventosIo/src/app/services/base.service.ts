import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export abstract class BaseService {

    // tslint:disable-next-line: no-inferrable-types
    protected UrlServiceV1: string = 'http://localhost:8287/api/v1/';

    protected httpJsonOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor() { }


    protected serviceHandlerError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {

            errMsg = `${error.status} - ${error.statusText || ''}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(error);
        return throwError(error);
    }

    protected serviceError(error: HttpErrorResponse | Response | any) {

        let errMsg: string;

        if (error instanceof Response) {
            errMsg = `${error.status} - ${error.statusText || ''}`;
        } else if (error.error instanceof ErrorEvent) {
            errMsg = `Um erro encontrado: ${error.error.message} `;
        } else {
            errMsg = error.message ? error.message : error.toString();
            console.error(
                `Backend returned code ${error.status}, ` +
                `Erro mensagem ${errMsg} ` +
                `body was: ${error.error}`);
        }

        return throwError(
            `Algo ruím aconteceu; ${errMsg} - Por favor, tente novamente mais tarde. ${error.error}`);
    }

    protected extractData(response: any) {
        return response.data || {};
    }

}

