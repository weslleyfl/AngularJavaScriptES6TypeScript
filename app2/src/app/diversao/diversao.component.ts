import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../servicos/ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css']
})
export class DiversaoComponent implements OnInit {

  public ofertas: Oferta[];

  constructor(private ofertaService: OfertasService) { }

  ngOnInit() {
    this.getOfertaCategoriaDiversao();
  }

  public getOfertaCategoriaDiversao() {
    this.ofertaService.getOfertasPorCategoria('diversao').subscribe((diversoes: Oferta[]) => {
      this.ofertas = diversoes;
    }, (err) => {
      console.log('Erro detectado: ', err);
    });
  }

}
