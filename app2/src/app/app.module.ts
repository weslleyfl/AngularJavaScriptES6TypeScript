import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { OfertaComponent } from './oferta/oferta.component';

@NgModule({
   declarations: [
      AppComponent,
      TopoComponent,
      HomeComponent,
      RodapeComponent,
      DiversaoComponent,
      RestaurantesComponent,
      NoPageFoundComponent,
      OfertaComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule
   ],
   providers: [
      {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'}
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
