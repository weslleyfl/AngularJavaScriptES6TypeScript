import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Evento } from '../models/evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-meus-eventos',
  templateUrl: './meus-eventos.component.html',
  styleUrls: ['./meus-eventos.component.css']
})
export class MeusEventosComponent implements OnInit {

  public eventos: Evento[];
  public errorMessage: string;

  constructor(public eventoService: EventoService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.spinner.show();
    this.eventoService.obterMeusEventos()
      .subscribe((eventos: Evento[]) => {
        this.spinner.hide();
        this.eventos = eventos;
      }, (error: any) => {
        this.errorMessage = error;
        this.spinner.hide();
      });

  }

}
