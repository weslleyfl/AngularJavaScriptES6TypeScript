import { Component, OnInit, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { Observable, fromEvent } from 'rxjs';
import { merge } from 'rxjs';

import { Organizador } from '../models/organizador';
import { GenericValidator } from 'src/app/utils/generic-form-validator';
import { OrganizadorService } from 'src/app/services/organizador.service';


@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.css']
})
export class InscricaoComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public inscricaoForm: FormGroup;
  private organizador: Organizador;
  private genericValidator: GenericValidator;

  private validationMessages: { [key: string]: { [key: string]: string } };
  public displayMessage: { [key: string]: string } = {};
  public errors: any[] = [];

  // get property to make easy to access the form controls on the HTML form
  public get formControls() {
    return this.inscricaoForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private organizadorService: OrganizadorService) {

    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      cpf: {
        required: 'Informe o CPF',
        rangeLength: 'CPF deve conter 11 caracteres'
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email invalido'
      },
      senha: {
        required: 'Informe a senha',
        minlength: 'A senha deve possuir no mínimo 6 caracteres'
      },
      senhaConfirmacao: {
        required: 'Informe a senha novamente',
        minlength: 'A senha deve possuir no mínimo 6 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngOnInit(): void {

    const senhaControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
    const senhaConfirmacaoControl = new FormControl('', [Validators.required, Validators.minLength(6),
    CustomValidators.equalTo(senhaControl)]);

    this.inscricaoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cpf: ['', [Validators.required, CustomValidators.rangeLength([11, 11])]],
      email: ['', [Validators.required, CustomValidators.email]],
      senha: senhaControl,
      senhaConfirmacao: senhaConfirmacaoControl
    });

  }

  ngAfterViewInit(): void {

    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.inscricaoForm);
    });

  }

  public adicionarOrganizador(): void {

    this.displayMessage = this.genericValidator.processMessages(this.inscricaoForm);

    if (this.inscricaoForm.dirty && this.inscricaoForm.valid) {

      const org = Object.assign({}, this.organizador, this.inscricaoForm.value);

      this.organizadorService.registrarOrganizador(org)
        .subscribe(
          (result: Organizador) => { this.onSaveComplete(result); },
          (error: any) => { this.onError(error); }
        );

    }

  }

  private onSaveComplete(response: Organizador): void {
    this.errors = [];
    this.inscricaoForm.reset();
  }

  private onError(fail: any) {
    this.errors = fail.error.errors;
  }



}


