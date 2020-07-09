import { Injectable } from '@angular/core';

// import * as firebase from 'firebase/app';
// require('firebase/auth');
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

import { Usuario } from '../acesso/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  public tokenId: string;

  constructor(
    public fireAuth: AngularFireAuth,
    private firebase: AngularFireDatabase,
    private router: Router
  ) { }


  public get isLoggedIn(): boolean {
    if (this.tokenId === undefined && localStorage.getItem('idTokenApp3') != null) {
      this.tokenId = localStorage.getItem('idTokenApp3');
    }

    if (this.tokenId === undefined) {
      this.router.navigate(['/']);
    }

    return (this.tokenId !== undefined);
  }


  // https://www.fabricadecodigo.com/crud-firebase-angular/ --- exemplo
  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    // console.log('chegamos serviço ', usuario);

    return this.fireAuth.createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {

        // remover a senha do objetco usuario
        delete usuario.senha;

        // btoa() convertento para base 64 -atob() descripografa - salvando no NÓ (path) unico do usuario
        // firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
        //   .set(usuario);

        this.firebase.database.ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario)
          .then((res) => { console.log('Retorno: ', res); },
            (err) => console.log('Erro pos Criacao db ref: ', err));
      })
      .catch((error: any) => {
        console.log('Erro lançado ', error);
      });

  }

  // https://www.positronx.io/full-angular-7-firebase-authentication-system/
  public autenticar(email: string, password: string): void {

    this.fireAuth.signInWithEmailAndPassword(email, password).then((result) => {

      result.user.getIdToken().then((token: string) => {
        // console.log('token', token);
        this.tokenId = token;
        localStorage.setItem('idTokenApp3', token);
        this.router.navigate(['/home']);
      }).catch((error) => {
        console.log('Erro log Token: ', error.message);
      });

    }).catch((error) => {
      console.log('Erro log EmailAndPassword: ', error.message);
    });

  }

  public logout(): void {

    this.fireAuth.signOut()
      .then(() => {
        localStorage.removeItem('idTokenApp3');
        this.tokenId = undefined;
        this.router.navigate(['/login']);
      }).catch((err: any) => {
        console.log('Erro log logout: ', err);
      });

  }

  public async logoutAsync() {
    try {
      await this.fireAuth.signOut();
      localStorage.removeItem('idTokenApp3');
      this.tokenId = undefined;
      this.router.navigate(['/login']);

    } catch (error) {
      console.log('Erro log logout: ', error.message);
    }
  }


}
