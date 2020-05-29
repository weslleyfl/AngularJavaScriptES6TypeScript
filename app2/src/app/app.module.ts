import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
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
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';

// pipies
import { DescricaoReduzidaPipe } from './util/descricao-reduzida.pipe';

// format cultura language
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { OrdemCompraSucessoComponent } from './ordem-compra-sucesso/ordem-compra-sucesso.component';


registerLocaleData(localePt, 'pt-BR');

@NgModule({
   declarations: [
      AppComponent,
      TopoComponent,
      HomeComponent,
      RodapeComponent,
      DiversaoComponent,
      RestaurantesComponent,
      NoPageFoundComponent,
      OfertaComponent,
      OndeFicaComponent,
      ComoUsarComponent,
      DescricaoReduzidaPipe,
      OrdemCompraComponent,
      OrdemCompraSucessoComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule
   ],
   providers: [
      { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
      { provide: LOCALE_ID, useValue: 'pt-BR' }
   ],
   bootstrap: [
      AppComponent
   ],
   exports: []
})
export class AppModule { }
