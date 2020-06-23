import { Component, OnInit, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Observable, fromEvent } from 'rxjs';
import { merge } from 'rxjs';

import { GenericValidator } from 'src/app/utils/generic-form-validator';
import { OrganizadorService } from 'src/app/services/organizador.service';
import { Organizador } from '../../models/organizador';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public loginForm: FormGroup;
  private organizador: Organizador;
  private genericValidator: GenericValidator;

  private validationMessages: { [key: string]: { [key: string]: string } };
  public displayMessage: { [key: string]: string } = {};
  public errors: any[] = [];
  public clicked = false;

  constructor(
    private fb: FormBuilder,
    private organizadorService: OrganizadorService,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email invalido'
      },
      password: {
        required: 'Informe a senha',
        minlength: 'A senha deve possuir no mínimo 6 caracteres'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngOnInit(): void {


    this.loginForm = this.fb.group({

      email: ['', [Validators.required, CustomValidators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });

  }

  ngAfterViewInit(): void {

    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });

  }


  public login(): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.clicked = true;
      const p = Object.assign({}, this.organizador, this.loginForm.value);

      this.organizadorService.login(p)
        .subscribe(
          (result: Organizador) => { this.onSaveComplete(result); },
          (fail: any) => { this.onError(fail); });
    }
  }


  private onSaveComplete(response: any): void {
    this.resetError();
    this.loginForm.reset();

    localStorage.setItem('eio.token', response.access_token);
    localStorage.setItem('eio.user', JSON.stringify(response.user));

    this.toastr.success('Login realizado com Sucesso!', 'Bem vindo!!!')
      .onHidden
      .subscribe(() => this.router.navigate(['/home']));

  }

  private onError(fail: any): void {
    this.resetError();
    this.errors.push(fail);
    this.clicked = false;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');

  }

  private resetError(): void {
    this.errors = [];
  }


}
