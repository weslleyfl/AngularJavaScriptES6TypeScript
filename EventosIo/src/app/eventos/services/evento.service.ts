import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria, Evento, Endereco } from '../models/evento';
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

  public obterEvento(id: string): Observable<Evento> {
    return this.http
      .get<Evento>(`${this.UrlServiceV1}/eventos/${id}`)
      .pipe(
        catchError(super.serviceError)
      );
  }

  public obterTodos(): Observable<Evento[]> {
    return this.http
      .get<Evento[]>(`${this.UrlServiceV1}/eventos`)
      .pipe(
        catchError(super.serviceError)
      );
  }

  public obterMeusEventos(): Observable<Evento[]> {

    return this.http
      .get<Evento[]>(`${this.UrlServiceV1}/eventos/meus-eventos`, super.httpJsonAuth())
      .pipe(
        catchError(super.serviceError)
      );

  }

  public obterMeuEvento(eventoId: string): Observable<Evento> {

    return this.http
      .get<Evento>(`${this.UrlServiceV1}/eventos/meus-eventos/${eventoId}`, super.httpJsonAuth())
      .pipe(
        map(super.extractData),
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

  public atualizarEvento(evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.UrlServiceV1}/eventos`, evento, super.httpJsonAuth())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  public excluirEvento(id: string): Observable<Evento> {
    return this.http
      .delete(`${this.UrlServiceV1}/eventos/${id}`, super.httpJsonAuth())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }


  public adicionarEndereco(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(`${this.UrlServiceV1}/endereco`, endereco, super.httpJsonAuth())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }
  public atualizarEndereco(endereco: Endereco) {
    return this.http.put<Endereco>(`${this.UrlServiceV1}/endereco`, endereco, super.httpJsonAuth())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }


}
