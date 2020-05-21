import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../servicos/ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable, interval, Subscribable, Subscriber, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta;
  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertasService) { }
  ngOnDestroy(): void {
  }

  ngOnInit() {

    this.ofertaService.getOfertaPorId(this.route.snapshot.params[`id`])
      .subscribe((retorno: Oferta) => {
        this.oferta = retorno;
      }, (err) => {
        console.log('Error capturado: ', err);
      });

  }



}
