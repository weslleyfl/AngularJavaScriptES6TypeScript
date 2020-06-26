import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcessoComponent } from './acesso/acesso.component';
import { HomeComponent } from './home/home.component';
import { AutenticacaoGuardService } from './services/autenticacao-guard.service';


const routes: Routes = [
  { path: '', component: AcessoComponent },
  { path: 'home', component: HomeComponent, canActivate: [AutenticacaoGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
