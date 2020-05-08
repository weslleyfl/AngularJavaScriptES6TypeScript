import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../servicos/ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public ofertas: Oferta[];

  constructor(private ofertaService: OfertasService) { }

  ngOnInit(): void {
    // this.ofertas = this.ofertaService.getOfertas();
    // console.log(this.ofertas);

    this.ofertaService.getOfertas()
      .then((oferta: Oferta[]) => {
        this.ofertas = oferta;
      }).catch((err: any) => {
        console.log('Erro capturado :', err);
      }
      );

  }

}
