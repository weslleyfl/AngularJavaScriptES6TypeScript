import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Oferta } from '../shared/oferta.model';

// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  public url = 'http://localhost:3000/ofertas/';

  constructor(private http: HttpClient) { }

  public getOfertas(): Promise<Oferta[]> {
    // efetuar uma requisiçao http
    return this.http.get<Oferta[]>(this.url).toPromise();
      // .then((response: any) => response);

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


}
