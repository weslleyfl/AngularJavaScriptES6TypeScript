import { Component, OnInit } from '@angular/core';
import { SeoService, SeoModel } from './../services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private seoModel: SeoModel = new SeoModel();
  constructor(private seoService: SeoService) {

    this.seoModel.title = 'Seja Bem vindo';
    this.seoModel.robots = 'Index,Follow';

    this.seoService.setSeoData(this.seoModel);
  }

  ngOnInit(): void {
  }

}
