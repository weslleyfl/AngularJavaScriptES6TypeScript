import { Component, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BdService } from 'src/app/services/bd.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, Observable, EMPTY, interval } from 'rxjs';
import { takeUntil, catchError, finalize } from 'rxjs/operators';



@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit, OnDestroy {

  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    imageInput: new FormControl(null, [Validators.required])
  });

  public get titulo() { return this.formulario.get('titulo'); }
  public get imageInput() { return this.formulario.get('imageInput'); }

  public email: string;
  private imagem: any;

  destroy$: Subject<null> = new Subject();
  showProgressBar = false;
  uploadProgress$: Observable<number>;
  public urlImagem: string;
  public nomeImagem: string;
  public conscluido = false;

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private bd: BdService,
    public fireAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {

    this.conscluido = false;

    this.fireAuth.onAuthStateChanged((user) => {
      this.email = user?.email;
    });
  }

  ngOnDestroy(): void {
    this.limparCampos();
    this.destroy$.next(null);
  }


  public open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false })
      .result.then((result) => {
        console.log('Ok result ', result);
        // this.publicar();
      }, (cancel) => {
        this.formulario.reset();
        this.limparCampos();
        console.log('Cancel click ', cancel);
      });
  }


  public publicar(): void {

    const publicaoModel = {
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    };

    this.bd.publicar(publicaoModel)
      .then((resposta: any) => {

        // const mediaFolderPath = 'imagem';
        const nomeImagem = resposta.key;
        const filePath = `${this.bd.mediaFolderPath}/${nomeImagem}`;

        this.uploadImage(filePath);

      },
        (erro: any) => console.log('Erro pos Publicar db ref: ', erro));

    // this.modal.close('Cancel');
  }

  public preparaImagemUpload(event: Event): any {

    const targets = event.target as HTMLInputElement;

    if (targets.files && targets.files.length) {
      this.imagem = targets.files;
      this.nomeImagem = this.imagem[0].name;
      this.formulario.controls[`imageInput`].setValue(this.nomeImagem); // <-- Set Value for Validation
    }

  }

  public uploadImage(filePath: string): void {

    this.showProgressBar = false;

    const { downloadUrl$, uploadProgress$ } = this.bd.uploadFileAndGetMetadata(
      filePath,
      this.imagem[0],
    );

    // progress aqui
    this.uploadProgress$ = uploadProgress$;

    this.uploadProgress$
      .pipe(
        finalize(() => {
          this.showProgressBar = false;
          this.conscluido = true;

          // emitir um evento do componete parent (home) - avisar o pai
          this.atualizarTimeLine.emit(this.email);

        })
      )
      .subscribe((progress) => {
        this.showProgressBar = true;
        // console.log(progress);
      });

    downloadUrl$
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.showProgressBar = false;
          this.conscluido = false;
          console.log(`${error.message} 😢`, 'Close', { duration: 4000, });
          return EMPTY;
        }),
      )
      .subscribe((downloadUrl) => {
        this.showProgressBar = false;
        this.conscluido = true;
        this.urlImagem = downloadUrl;
      });
  }

  public limparCampos() {

    this.showProgressBar = false;
    this.conscluido = false;
    this.urlImagem = '';
    this.nomeImagem = '';
  }


}
