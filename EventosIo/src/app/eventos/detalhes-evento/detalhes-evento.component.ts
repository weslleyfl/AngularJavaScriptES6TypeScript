import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { Evento } from '../models/evento';
import { EventoService } from '../services/evento.service';


@Component({
  selector: 'app-detalhes-evento',
  templateUrl: './detalhes-evento.component.html',
  styleUrls: ['./detalhes-evento.component.css']
})
export class DetalhesEventoComponent implements OnInit {

  public sub: Subscription;
  public eventoId: string;
  public evento: Evento;
  public enderecoMap: string;
  public dataIsVisible = false;

  constructor(
    private eventoService: EventoService,
    private routeAc: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.routeAc.params.subscribe((param: Params) => {
      this.eventoId = param[`id`];
    });

    this.eventoService.obterEvento(this.eventoId)
      .subscribe(
        (evento: Evento) => {
          this.evento = evento;
          if (!this.evento.online) {
            this.enderecoMap = 'https://www.google.com/maps/embed/v1/place?q='
              + this.evento.endereco.logradouro + ', ' + this.evento.endereco.numero + ' - '
              + this.evento.endereco.bairro + ', ' + this.evento.endereco.cidade + ' - '
              + this.evento.endereco.estado + '&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE';
          }
          this.dataIsVisible = true;
        });

  }

}
