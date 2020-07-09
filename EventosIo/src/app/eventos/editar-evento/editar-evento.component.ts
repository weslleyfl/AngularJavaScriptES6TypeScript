import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable, fromEvent, Subscription } from 'rxjs';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { IMyOptions } from 'mydatepicker';

import { Evento, Endereco, Categoria } from '../models/evento';
import { EventoService } from '../services/evento.service';

import { DateUtils } from 'src/app/utils/date-utils';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { GenericValidator } from 'src/app/utils/generic-form-validator';


@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  public myDatePickerOptions = DateUtils.getMyDatePickerOptions();

  public errors: any[] = [];
  public errorsEndereco: any[] = [];
  public eventoForm: FormGroup;
  public enderecoForm: FormGroup;
  public evento: Evento;
  public endereco: Endereco;
  public categorias: Categoria[];
  public eventoId: string;
  public gratuito: boolean;
  public online: boolean;
  public sub: Subscription;
  public modalVisible: boolean;
  public displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    private router: Router,
    private routeAc: ActivatedRoute,
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
    this.modalVisible = false;
  }

  ngOnInit() {

    this.eventoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      categoriaId: ['', Validators.required],
      descricaoCurta: '',
      descricaoLonga: '',
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      gratuito: '',
      valor: '0',
      online: '',
      nomeEmpresa: ''
    });

    this.enderecoForm = this.fb.group({
      logradouro: ['', [Validators.required]],
      numero: ['', Validators.required],
      complemento: '',
      bairro: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });

    this.sub = this.routeAc.params.subscribe((params: Params) => {
      this.eventoId = params[`id`];
      this.obterEvento(this.eventoId);
    });

    this.eventoService.obterCategorias()
      .subscribe(
        (cat: Categoria[]) => this.categorias = cat,
        (error: any[]) => this.errors = error
      );

  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.eventoForm);
    });
  }

  public obterEvento(id: string): void {
    this.eventoService.obterMeuEvento(id)
      .subscribe(
        evento => this.preencherFormEvento(evento)
        );
  }

  public preencherFormEvento(evento: Evento): void {
    this.evento = evento;

    const valorBrl = CurrencyUtils.ToPrice(this.evento.valor);

    this.eventoForm.patchValue({
      nome: this.evento.nome,
      categoriaId: this.evento.categoriaId,
      descricaoCurta: this.evento.descricaoCurta,
      descricaoLonga: this.evento.descricaoLonga,
      dataInicio: DateUtils.setMyDatePickerDate(this.evento.dataInicio),
      dataFim: DateUtils.setMyDatePickerDate(this.evento.dataFim),
      gratuito: this.evento.gratuito,
      valor: valorBrl,
      online: this.evento.online,
      nomeEmpresa: this.evento.nomeEmpresa,
    });

    if (this.evento.endereco) {
      this.enderecoForm.patchValue({
        logradouro: this.evento.endereco.logradouro,
        numero: this.evento.endereco.numero,
        complemento: this.evento.endereco.complemento,
        bairro: this.evento.endereco.bairro,
        cep: this.evento.endereco.cep,
        cidade: this.evento.endereco.cidade,
        estado: this.evento.endereco.estado
      });
    }
  }

  public editarEvento() {

    if (this.eventoForm.dirty && this.eventoForm.valid) {

      const p = Object.assign({}, this.evento, this.eventoForm.value); // tipo auto mapper
      const user = this.eventoService.obterUsuario();

      p.organizadorId = user.id;
      p.dataInicio = DateUtils.getMyDatePickerDate(p.dataInicio);
      p.dataFim = DateUtils.getMyDatePickerDate(p.dataFim);
      p.valor = CurrencyUtils.ToDecimal(p.valor);

      this.eventoService.atualizarEvento(p)
        .subscribe(
          (result: any) => { this.onSaveComplete(result); },
          (fail: any) => { this.onError(fail); });
    }
  }

  public atualizarEndereco() {

    if (this.enderecoForm.dirty && this.enderecoForm.valid) {
      const enderecoInput = Object.assign({}, this.endereco, this.enderecoForm.value);
      enderecoInput.eventoId = this.eventoId;

      if (this.evento.endereco) {
        enderecoInput.id = this.evento.endereco.id;
        this.eventoService.atualizarEndereco(enderecoInput)
          .subscribe(
            (result: any) => { this.onEnderecoSaveComplete(); },
            (fail: any) => { this.onErrorEndereco(fail); });
      }
      else {
        this.eventoService.adicionarEndereco(enderecoInput)
          .subscribe(
            (result: any) => { this.onEnderecoSaveComplete(); },
            (fail: any) => { this.onErrorEndereco(fail); });
      }
    }
  }


  private onSaveComplete(response: any): void {
    this.resetError();
    this.eventoForm.reset();

    this.toastr.success('Evento Atualizado com Sucesso!', 'Oba :D')
      .onHidden
      .subscribe(() => this.router.navigate(['/meus-eventos']));
  }

  public onEnderecoSaveComplete(): void {
    this.hideModal();

    this.toastr.success('Endereco Atualizado', 'Oba :D');
    this.obterEvento(this.eventoId);
  }


  private onError(fail: any): void {
    this.resetError();
    this.errors = fail;
    this.toastr.error('Ocorreu um erro no processamento', 'Ops! :(');
  }

  public onErrorEndereco(fail: any) {
    this.toastr.error('Ocorreu um erro no processamento do Endereço', 'Ops! :(');
    // this.errorsEndereco = fail.error.errors;
    this.errorsEndereco = fail;
  }

  private resetError(): void {
    this.errors = [];
  }

  public showModal(): void {
    this.modalVisible = true;
  }

  public hideModal(): void {
    this.modalVisible = false;
  }



}
