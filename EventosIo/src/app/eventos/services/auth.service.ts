// https://www.positronx.io/full-angular-7-firebase-authentication-system/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  public token: string;
  public user: any;

  constructor(private router: Router) { }
  canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    this.token = localStorage.getItem('eio.token');
    this.user = JSON.parse(localStorage.getItem('eio.user'));

    if (!this.token) {
      this.router.navigate(['/entrar']);
    }

    let claim: any = routeAc.data[0];

    if (claim !== undefined) {

      claim = routeAc.data[0][`claim`];

      if (claim) {

        if (!this.user.claims) {
          this.router.navigate(['/acesso-negado']);
        }

        const userClaims = this.user.claims.some((x: any) => x.type === claim.nome && x.value === claim.valor);
        if (!userClaims) {
          this.router.navigate(['/acesso-negado']);
        }
      }
    }

    // console.log(claim);
    return true;

  }
}
