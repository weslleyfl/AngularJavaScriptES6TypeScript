import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MyDatePickerModule } from 'mydatepicker';


// bootstraps
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';

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

@NgModule({
  declarations: [
    AppComponent,
    MenuSuperiorComponent,
    MainPrincipalComponent,
    FooterComponent,
    MenuLoginComponent,
    HomeComponent,
    ListaEventosComponent,
    PageNotFoundComponent,
    InscricaoComponent,
    LoginComponent,
    AdicionarEventoComponent,
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
      timeOut: 5000,
      preventDuplicates: true,
      progressBar: true,
      closeButton: true
    }),
    MyDatePickerModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
