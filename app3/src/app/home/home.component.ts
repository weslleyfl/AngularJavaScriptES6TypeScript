import { Component, OnInit, ViewChild } from '@angular/core';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /*
  -- https://medium.com/better-programming/angular-7-share-component-data-with-other-components-1b91d6f0b93f
  @Input — property binding - If you want to pass data from the parent component to the child
  @Output and EventEmitter — event binding - You can pass data back from the child to the parent component.
  @ViewChild andAfterViewInit - we can refer to a child component and access their variables inside our parent component.
  */
  @ViewChild('publicacoes') public publicacoes: any;
  constructor(private authService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  public sair(): void {
    this.authService.logout();
  }

  public async sairAsync(): Promise<void> {
    try {
      await this.authService.logoutAsync();
    } catch (error) {
      console.log(error);
    }
  }

  // esta comunicando com o filho inclui-publicacao
  public atualizarTimeLine(email: any): void {

    this.publicacoes.atualizarTimeLine(email); // Este metodo é do filho
  }

}
