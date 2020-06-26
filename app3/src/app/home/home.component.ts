import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

}
