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

    this.ofertaService.getOfertas2()
      .then((oferta: Oferta[]) => {
        this.ofertas = oferta;
        console.log('Estas sao as oferatas:', oferta);
      }).catch((err: any) => {
        console.log('nao deu erro catch', err);
      }
      );

    // this.ofertaService.getOfertas2()
    //   .then((oferta: Oferta[]) => {
    //     this.ofertas = oferta;
    //     console.log('Estas sao as oferatas:', oferta);
    //   },
    //   (rejeito: any) => {
    //     console.log('nao deu erro rejeito: ', rejeito);
    //   }
    //   ).catch((err: any) => {
    //     console.log('nao deu erro catch', err);
    //   }
    //   );

    // this.ofertaService.getOfertas3().subscribe((ofertasData: Oferta[]) => {
    //   this.ofertas = ofertasData;
    //   console.log('Estas sao as oferatas:', ofertasData);
    // }, (err: any) => {
    //   console.log('Recebi o seguinte erro : ', err);
    // });

    // this.ofertaService.getOfertas3().subscribe({
    //   next(ofertasData: Oferta[] ) {
    //     console.log('Estas sao as oferatas:', ofertasData);
    //   },
    //   error(erro: any) {
    //     console.log('Recebi o seguinte erro : ', erro);
    //   }
    // });

  }

}
