import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/servicos/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css']
})
export class ComoUsarComponent implements OnInit {

  public comoUsar = '';
  constructor(private route: ActivatedRoute, private ofertaService: OfertasService) { }

  ngOnInit() {

    const ofertaId = this.route.parent.snapshot.params[`id`];

    this.ofertaService.getComoUsarOfertaPorId(ofertaId)
      .subscribe((descricao: string) => {
        this.comoUsar = descricao;
      });
  }

}
