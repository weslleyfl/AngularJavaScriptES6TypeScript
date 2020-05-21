import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../servicos/ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
// import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  public ofertas2: Oferta[];
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertaService: OfertasService) { }

  ngOnInit(): void {

    this.ofertas = this.subjectPesquisa
      .pipe(
        debounceTime(1000), // executa a açao switchMap pos 1 segundo
        distinctUntilChanged(), // para fazer uma pesquisa distinct
        switchMap((termo: string) => {
          console.log('Requisicao http para a API');

          if (termo.trim() === '') {
            return of<Oferta[]>([]);
          }
          return this.ofertaService.pesquisaOfertas(termo); // vai retornar um Ofertas[]
        }),
        catchError((error: any) => {
          console.log('Erro encontrado', error);
          return of<Oferta[]>([]);
        })
      )

    // quem recebe o subject
    this.ofertas.subscribe(
      (ofertas: Oferta[]) => {
        console.log('Oferas', ofertas);
        this.ofertas2 = ofertas;
      },
      (error: any) => { console.log('Erro no subscribe ', error); },
      () => console.log('Fluxo de eventos completo!')
    );

    // https://www.techiediaries.com/angular/angular-9-8-tutorial-by-example-rest-crud-apis-http-get-requests-with-httpclient/

    // this.ofertaService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>) => {
    //   console.log(res);
    //   this.products = res.body;
    // })

  }

  public pesquisarOferta(termoPesquisa: string): void {
    console.log('KeyUp acionado', termoPesquisa);
    this.subjectPesquisa.next(termoPesquisa);
  }

  public pesquisa(termoPesquisa: string): void {
    console.log(termoPesquisa);
    this.ofertas = this.ofertaService.pesquisaOfertas(termoPesquisa);

    this.ofertas.subscribe(
      (ofertas: Oferta[]) => {
        console.log('oferas', ofertas);
      },
      (error: any) => { console.log(error); },
      () => console.log('Fluxo de eventos completo!')
    );



  }


}
