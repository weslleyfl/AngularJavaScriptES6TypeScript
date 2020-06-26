import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from '../usuario.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() exibirPainel: EventEmitter<string> = new EventEmitter();

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(''),
    nomeCompleto: new FormControl(''),
    nomeUsuario: new FormControl(''),
    senha: new FormControl('')
  });

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {

    const usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nomeCompleto,
      this.formulario.value.nomeUsuario,
      this.formulario.value.senha
    );

    this.autenticacaoService.cadastrarUsuario(usuario)
      .then(() => {
        this.formulario.reset();
        this.exibirPainelLogin();
      });

  }

}
