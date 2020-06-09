import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    MenuSuperiorComponent,
    MainPrincipalComponent,
    FooterComponent,
    MenuLoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
