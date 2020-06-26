import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria, Evento } from '../models/evento';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventoService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public obterUsuario(): any {
    return JSON.parse(localStorage.getItem('eio.user'));
  }

  public obterCategorias(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(`${this.UrlServiceV1}/eventos/categorias`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(super.serviceError)
      );
  }

  public registrarEvento(evento: Evento): Observable<Evento> {
    evento.id = undefined;
    const resposta = this.http.post<Evento>(`${this.UrlServiceV1}/eventos`, evento, super.httpJsonAuth())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );

    return resposta;

  }


}
