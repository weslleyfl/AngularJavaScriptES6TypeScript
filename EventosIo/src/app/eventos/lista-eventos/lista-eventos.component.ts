import { Component, OnInit } from '@angular/core';
import { SeoModel, SeoService } from 'src/app/services/seo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/evento';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {

  public eventos: Evento[];
  public errorMessage: string;

  constructor(
    private seoService: SeoService,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService
  ) {

    const seoModel: SeoModel = {
      title: 'Próximos Eventos',
      description: 'Lista dos próximos eventos técnicos no Brasil',
      robots: 'Index, Follow',
      keywords: 'eventos,workshops,encontros,congressos'
    } as SeoModel;

    seoService.setSeoData(seoModel);

  }

  ngOnInit(): void {

    this.spinner.show();
    this.eventoService.obterTodos()
      .subscribe((eventos: Evento[]) => {
        this.spinner.hide();
        this.eventos = eventos;
      }, (error: any) => {
        this.spinner.hide();
        this.errorMessage = error;
      });

  }

}
