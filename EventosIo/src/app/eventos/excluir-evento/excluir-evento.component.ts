import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '../models/evento';
import { EventoService } from '../services/evento.service';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'app-excluir-evento',
  templateUrl: './excluir-evento.component.html',
  styleUrls: ['./excluir-evento.component.css']
})
export class ExcluirEventoComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public sub: Subscription;
  public eventoId: string;
  public evento: Evento;

  constructor(

    private eventoService: EventoService,
    private router: Router,
    private routeAc: ActivatedRoute,
    private toastr: ToastrService) {

    this.evento = new Evento();

  }


  ngOnInit() {

    this.sub = this.routeAc.params.subscribe((param: Params) => {
      this.eventoId = param[`id`];
    });

    this.eventoService.obterMeuEvento(this.eventoId)
      .subscribe(
        (evento: Evento) => { this.evento = evento; });

  }

  public excluirEvento() {
    this.eventoService.excluirEvento(this.eventoId)
      .subscribe(
        (evento: any) => { this.onDeleteComplete(evento); },
        (error: any) => { this.onError(); }
      );
  }


  public onDeleteComplete(evento: any) {

    this.toastr.success('Evento excluido com Sucesso!', 'Good bye :D')
      .onHidden
      .subscribe(() => this.router.navigate(['/meus-eventos']));
  }

  private onError(): void {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }


}
