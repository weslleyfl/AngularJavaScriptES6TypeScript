import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, Subscription } from 'rxjs';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { GenericValidator } from 'src/app/utils/generic-form-validator';
import { IMyOptions, IMyDateModel } from 'mydatepicker';

import { Evento, Endereco, Categoria } from '../models/evento';
import { EventoService } from '../services/evento.service';
import { DateUtils } from 'src/app/utils/date-utils';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-adicionar-evento',
  templateUrl: './adicionar-evento.component.html',
  styleUrls: ['./adicionar-evento.component.css']
})
export class AdicionarEventoComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  public myDatePickerOptions = DateUtils.getMyDatePickerOptions();

  public errors: any[] = [];
  public eventoForm: FormGroup;
  public evento: Evento;
  public categorias: Categoria[];
  public gratuito: boolean;
  public online: boolean;

  public displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      dataInicio: {
        required: 'Informe a data de início'
      },
      dataFim: {
        required: 'Informe a data de encerramento'
      },
      categoriaId: {
        required: 'Informe a categoria'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.evento = new Evento();
    this.evento.endereco = new Endereco();

    this.eventoService.obterCategorias()
      .subscribe((cat: Categoria[]) => this.categorias = cat, (error: any) => this.errors.push(error));

  }

  ngOnInit() {

    this.eventoForm = this.fb.group({
      nome: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(150)]],
      categoriaId: ['', Validators.required],
      descricaoCurta: '',
      descricaoLonga: '',
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      gratuito: '',
      valor: '0',
      online: '',
      nomeEmpresa: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: '',
    });


  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.eventoForm);
    });
  }

  public adicionarEvento(): void {

    if (this.eventoForm.dirty && this.eventoForm.valid) {

      const user = this.eventoService.obterUsuario();
      const p = Object.assign({}, this.evento, this.eventoForm.value);

      p.organizadorId = user.id;

      p.valor = CurrencyUtils.ToDecimal(p.valor);

      p.dataInicio =  DateUtils.getMyDatePickerDate(p.dataInicio);
      p.dataFim =  DateUtils.getMyDatePickerDate(p.dataFim);
      p.endereco.logradouro = p.logradouro;
      p.endereco.numero = p.numero;
      p.endereco.complemento = p.complemento;
      p.endereco.bairro = p.bairro;
      p.endereco.cep = p.cep;
      p.endereco.cidade = p.cidade;
      p.endereco.estado = p.estado;


      this.eventoService.registrarEvento(p)
        .subscribe(
          (result: Evento) => { this.onSaveComplete(result); },
          (error: any) => { this.onError(error); }
        );

    }

  }


  private onSaveComplete(response: any): void {
    this.resetError();
    this.eventoForm.reset();

    this.toastr.success('Evento Registrado com Sucesso!', 'Oba :D')
      .onHidden
      .subscribe(() => this.router.navigate(['/meus-eventos']));
  }

  private onError(fail: any): void {
    this.resetError();

    this.errors = fail;
    this.toastr.error('Ocorreu um erro no processamento', 'Ops! :(');
  }

  private resetError(): void {
    this.errors = [];
  }



}
