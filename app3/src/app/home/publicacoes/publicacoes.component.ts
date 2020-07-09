import { Component, OnInit } from '@angular/core';
import { BdService } from 'src/app/services/bd.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  // child
  public publicacoes: any;

  constructor(private bd: BdService, private fireAuth: AngularFireAuth) { }

  ngOnInit(): void {

    this.fireAuth.onAuthStateChanged((user) => {
      this.atualizarTimeLine(user.email);
    });

  }

  public atualizarTimeLine(emailUser: string): void {
 
    this.bd.consultarPublicacoes(emailUser)
      .then((publicacoes: any) => {
        this.publicacoes = publicacoes;
        // console.log(this.publicacoes);

      });
  }

}
