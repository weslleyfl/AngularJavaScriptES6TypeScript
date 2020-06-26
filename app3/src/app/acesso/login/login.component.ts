import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() exibirPainel: EventEmitter<string> = new EventEmitter();

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null),
    senha: new FormControl(null)
  });

  constructor(private autenticacaoService: AutenticacaoService) {
  }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(): void {

    const email = this.formulario.value.email;
    const password = this.formulario.value.senha;

    this.autenticacaoService.autenticar(email, password);
  }

}
