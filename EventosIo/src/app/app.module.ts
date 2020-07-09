import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxSpinnerModule } from 'ngx-spinner';


// bootstraps
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';

// format cultura language
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt-BR');

// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuSuperiorComponent } from './shared/menu-superior/menu-superior.component';
import { MainPrincipalComponent } from './shared/main-principal/main-principal.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MenuLoginComponent } from './shared/menu-login/menu-login.component';
import { HomeComponent } from './home/home.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { LoginComponent } from './usuario/login/login/login.component';
import { AdicionarEventoComponent } from './eventos/adicionar-evento/adicionar-evento.component';
import { MeusEventosComponent } from './eventos/meus-eventos/meus-eventos.component';
import { EditarEventoComponent } from './eventos/editar-evento/editar-evento.component';
import { ExcluirEventoComponent } from './eventos/excluir-evento/excluir-evento.component';
import { DetalhesEventoComponent } from './eventos/detalhes-evento/detalhes-evento.component';
import { SafePipe } from './common/pipes/safe.pipe';
import { ErrorInterceptor } from './eventos/services/error-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    MenuSuperiorComponent,
    MainPrincipalComponent,
    FooterComponent,
    MenuLoginComponent,
    HomeComponent,
    ListaEventosComponent,
    MeusEventosComponent,
    PageNotFoundComponent,
    InscricaoComponent,
    LoginComponent,
    AdicionarEventoComponent,
    EditarEventoComponent,
    ExcluirEventoComponent,
    DetalhesEventoComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CustomFormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
      progressBar: true,
      closeButton: true
    }),
    MyDatePickerModule,
    NgxSpinnerModule
  ],
  providers: [
    Title,
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
