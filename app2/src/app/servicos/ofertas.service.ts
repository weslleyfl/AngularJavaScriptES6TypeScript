import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Oferta } from '../shared/oferta.model';
import { URL_API, URL_API_COMO_USAR, URL_API_ONDE_FICA } from '../constantes/app.api';

// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  // npm install -g json-server
  // json-server --watch Banco_Dados_Json.json

  constructor(private http: HttpClient) { }

  public getOfertas(): Promise<Oferta[]> {
    // efetuar uma requisiçao http
    return this.http.get<Oferta[]>(`${URL_API}?destaque=true`).toPromise();
    // .then((response: any) => response);

  }

  public getOfertasPorCategoria(categoria: string): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(`${URL_API}?categoria=${categoria}`);
  }

  public getOfertaPorId(id: number): Observable<Oferta> {
    return this.http.get<Oferta>(`${URL_API}?id=${id}`)
      .pipe(
        tap((ofer: Oferta) => console.log(`tap: id=${id}`, ofer[0])),
        map((oferta: Oferta) => oferta[0]),
        catchError(this.handleError<Oferta>('Oferta', null))
      );
  }

  public getComoUsarOfertaPorId(id: number): Observable<string> {
    return this.http.get<string>(`${URL_API_COMO_USAR}?id=${id}`)
      .pipe(
        map((resposta: any) => resposta[0].descricao)
      );
  }

  public getOndeFicaOfertaPorId(id: number): Observable<string> {
    return this.http.get<string>(`${URL_API_ONDE_FICA}?id=${id}`)
      .pipe(
        map((resposta: any) => resposta[0].descricao)
      );
  }

  // public getOfertas3(): Observable<Oferta[]> {
  //   return new Observable((observer) => {
  //     setTimeout(() => {

  //       const erro = false;
  //       if (erro) {
  //         observer.next(this.ofertas);
  //       } else {
  //         observer.error({ mensagem: 'Este e Erro ao gerar a logica Observable', codigo: 404 });
  //       }
  //       // observer.complete();
  //     }, 5000);
  //   });
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
