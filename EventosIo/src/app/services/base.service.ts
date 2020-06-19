import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export abstract class BaseService {

    // tslint:disable-next-line: no-inferrable-types
    protected UrlServiceV1 = 'https://localhost:5001/api/v1/';
    // protected UrlServiceV1 = 'https://localhost:44346/api/v1/';

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
            console.log
                (
                    `Coidgo retornado do Backend: ${error.status}, ` +
                    `Erro mensagem: ${errMsg} ` +
                    `Body was: ${JSON.stringify(error)}`
                );
        }

        console.log('Meu log Erro: ', error);
        const fail = (error.error.errors !== undefined) ? error.error.errors : error.message;
        return throwError(fail);

    }

    protected extractData(response: any) {
        return response.data || {};
    }

}

