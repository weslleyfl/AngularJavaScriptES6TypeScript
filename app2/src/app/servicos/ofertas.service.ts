import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Oferta } from '../shared/oferta.model';

// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  // npm install -g json-server
  // json-server --watch Banco_Dados_Json.json
  public url = 'http://localhost:3000/ofertas/';

  constructor(private http: HttpClient) { }

  public getOfertas(): Promise<Oferta[]> {
    // efetuar uma requisiçao http
    return this.http.get<Oferta[]>(`${this.url}?destaque=true`).toPromise();
    // .then((response: any) => response);

  }

  public getOfertasPorCategoria(categoria: string): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(`${this.url}?categoria=${categoria}`);
  }

  public getOfertaPorId(id: any): Observable<Oferta> {
    return this.http.get<Oferta>(`${this.url}?id=${id}`)
      .pipe(
        tap((ofer: Oferta) => console.log(`tap: id=${id}`, ofer[0])),
        map((oferta: Oferta) => oferta[0]),
        catchError(this.handleError<Oferta>('Oferta', null))
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
