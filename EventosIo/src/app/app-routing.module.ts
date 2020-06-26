import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { HomeComponent } from './home/home.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { LoginComponent } from './usuario/login/login/login.component';
import { AdicionarEventoComponent } from './eventos/adicionar-evento/adicionar-evento.component';
import { AuthService } from './eventos/services/auth.service';
import { AcessoNegadoComponent } from './shared/acesso-negado/acesso-negado.component';


const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home`
  { path: 'home', component: HomeComponent },
  { path: 'proximos-eventos', component: ListaEventosComponent },
  { path: 'inscricao', component: InscricaoComponent },
  { path: 'entrar', component: LoginComponent },
  {
    path: 'novo-evento', component: AdicionarEventoComponent,
    canActivate: [AuthService],
    data: [{ claim: { nome: 'Eventos', valor: 'Gravar' } }]
  },
  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
