import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oferta } from '../shared/oferta.model';


@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  public ofertas: Array<Oferta> = [
    {
      id: 1,
      categoria: 'restaurante',
      titulo: 'Super Burger WFL',
      descricaoOferta: 'Rodízio de Mini-hambúrger com opção de entrada.',
      anunciante: 'Original Burger',
      valor: 29.90,
      destaque: true,
      imagens: [
        { url: '/assets/ofertas/1/img1.jpg' },
        { url: '/assets/ofertas/1/img2.jpg' },
        { url: '/assets/ofertas/1/img3.jpg' },
        { url: '/assets/ofertas/1/img4.jpg' }
      ]
    },
    {
      id: 2,
      categoria: 'restaurante',
      titulo: 'Cozinha Mexicana',
      descricaoOferta: 'Almoço ou Jantar com Rodízio Mexicano delicioso.',
      anunciante: 'Mexicana',
      valor: 32.90,
      destaque: true,
      imagens: [
        { url: '/assets/ofertas/2/img1.jpg' },
        { url: '/assets/ofertas/2/img2.jpg' },
        { url: '/assets/ofertas/2/img3.jpg' },
        { url: '/assets/ofertas/2/img4.jpg' }
      ]

    },
    {
      id: 4,
      categoria: 'diversao',
      titulo: 'Estância das águas',
      descricaoOferta: 'Diversão garantida com piscinas, trilhas e muito mais.',
      anunciante: 'Estância das águas',
      valor: 31.90,
      destaque: true,
      imagens: [
        { url: '/assets/ofertas/3/img1.jpg' },
        { url: '/assets/ofertas/3/img2.jpg' },
        { url: '/assets/ofertas/3/img3.jpg' },
        { url: '/assets/ofertas/3/img4.jpg' },
        { url: '/assets/ofertas/3/img5.jpg' },
        { url: '/assets/ofertas/3/img6.jpg' }
      ]
    }
  ];

  constructor() { }

  public getOfertas(): Array<Oferta> {
    return this.ofertas;
  }

  public getOfertas2(): Promise<Oferta[]> {

    return new Promise((resolve, reject) => {
      // aqui fica uma logica com processamento assincrono que demore tempo
      const erro = true;
      if (erro) {
        setTimeout(() => {
          resolve(this.ofertas);
        }, 3000);

      } else {
        reject({ mensagem: 'Erro ao gerar a logica', codigo: 404 });
      }
    }).then((ofertas: Oferta[]) => {
      // Fazer mais logicas aqui, pois é aqui que ele vai ser envaido para o assinante
      return ofertas;
    }).then((ofertas: Oferta[]) => {
      return new Promise((resolve2, reject2) => {
        setTimeout(() => {
          resolve2(ofertas);
        }, 3000);
      });
    }).then((ofertas: Oferta[]) => {
      // Fazer mais logicas aqui, pois é aqui que ele vai ser envaido para o assinante
      console.log('Terceiro Then - Pos 3 segundos');
      return ofertas;
    });

  }
  
  public getOfertas3(): Observable<Oferta[]> {
    return new Observable((observer) => {
      setTimeout(() => {

        const erro = false;
        if (erro) {
          observer.next(this.ofertas);
        } else {
          observer.error({ mensagem: 'Este e Erro ao gerar a logica Observable', codigo: 404 });
        }
        // observer.complete();
      }, 5000);
    });
  }


}
