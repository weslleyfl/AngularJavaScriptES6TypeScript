import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../servicos/ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta;
  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertasService) { }

  ngOnInit() {
    // console.log('parametro: ', this.route.snapshot.params[`id`]);
    // this.route.params.subscribe((parametro: any) => {
    //   console.log('parametro subscribe: ', parametro.id);
    // });

    this.ofertaService.getOfertaPorId(this.route.snapshot.params[`id`])
      .subscribe((retorno: Oferta) => {
        this.oferta = retorno;
      }, (err) => {
        console.log('Error capturado: ', err);
      });

  }



}
