import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    // animation triggers go here

    trigger('banner', [

      state('escondido', style({ // camelCase ou ''
        opacity: 0

      })),
      state('visivel', style({
        opacity: 1

      })),
      transition('escondido => visivel', [
        animate('1s ease-in')
      ]),
      transition('visivel => escondido', [
        animate('1s ease-in')
      ]),

    ]),

  ]
})
export class BannerComponent implements OnInit {

  public estado = 'escondido';
  public imagens: Imagem[] = [
    { estado: 'visivel', url: '/assets/banner-acesso/img_1.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_2.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_3.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_4.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_5.png' }
  ];

  constructor() { }

  ngOnInit() {

    setTimeout(() => { this.logicaRotacao(); }, 3000);

  }

  public logicaRotacao(): void {

    // mantem o index da proxima imagem
    let idx: number;

    // oculatr
    for (let index = 0; index <= 4; index++) {

      if (this.imagens[index].estado === 'visivel') {
        this.imagens[index].estado = 'escondido';
        idx = (index === 4) ? 0 : index + 1;
        break;
      }

    }

    // exibir imagem
    this.imagens[idx].estado = 'visivel';

    // chamada recursiva
    setTimeout(() => { this.logicaRotacao(); }, 3000);

  }

}

