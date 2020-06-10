import { Component, OnInit } from '@angular/core';
import { SeoModel, SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {

  constructor(private seoService: SeoService) {

    const seoModel: SeoModel = {
      title: 'Próximos Eventos',
      description: 'Lista dos próximos eventos técnicos no Brasil',
      robots: 'Index, Follow',
      keywords: 'eventos,workshops,encontros,congressos'
    } as SeoModel;

    seoService.setSeoData(seoModel);

  }

  ngOnInit(): void {
  }

}
