import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/servicos/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css']
})
export class OndeFicaComponent implements OnInit {

  public ondeFica = '';
  constructor(private route: ActivatedRoute, private ofertaService: OfertasService) { }

  ngOnInit() {

    // const ofertaId = this.route.parent.snapshot.params[`id`];
    this.route.parent.params.subscribe((parametros: Params) => {

      this.ofertaService.getOndeFicaOfertaPorId(parametros.id)
        .subscribe((descricao: string) => {
          this.ondeFica = descricao;
        });

    });

  }
}
