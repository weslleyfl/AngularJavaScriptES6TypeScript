import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Organizador } from '../usuario/models/organizador';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class OrganizadorService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  public registrarOrganizador(organizador: Organizador): Observable<Organizador> {

    const url = `${this.UrlServiceV1}nova-conta`;

    const response = this.http
      .post<Organizador>(url, organizador, this.httpJsonOptions)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );

    return response;
  }

}
