import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [

      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(-50px,0px)' // eixo x e y
        }),
        animate('0.5s 0s ease-in-out') // duração, delay e aceleração
      ])
    ]),
    trigger('animacao-painel', [

      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(50px,0px)' // eixo x e y
        }),
        animate('1.5s 0s ease-in-out', keyframes([
          style({
            offset: 0.15, opacity: 1, transform: 'translateX(0px)'
          }),
          style({
            offset: 0.86, opacity: 1, transform: 'translateX(0px)'
          }),
          style({
            offset: 0.88, opacity: 1, transform: 'translateY(-10px)' // eixo Y - desloca para cima
          }),
          style({
            offset: 0.90, opacity: 1, transform: 'translateY(10px)' // eixo Y - para baixo
          }),
          style({
            offset: 0.92, opacity: 1, transform: 'translateY(-10px)' // eixo Y
          }),
          style({
            offset: 0.94, opacity: 1, transform: 'translateY(10px)' // eixo Y
          }),
          style({
            offset: 0.96, opacity: 1, transform: 'translateY(-10px)' // eixo Y
          }),
          style({
            offset: 0.98, opacity: 1, transform: 'translateY(10px)' // eixo Y
          }),
          style({
            offset: 1, opacity: 1, transform: 'translateY(0px)' // y
          })

        ])) // duração, delay e aceleração
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner = 'criado';
  public estadoPainel = 'criado';
  public cadastro = false;

  constructor() { }

  ngOnInit() {
  }

  public exibirPainel(event: string): void {
    this.cadastro = (event === 'cadastro') ? true : false;
  }

  public inicioDaAnimacao(): void {
    console.log('Animation Started');
  }

  public fimDaAnimacao(): void {
    console.log('Animation Ended');
  }

}
