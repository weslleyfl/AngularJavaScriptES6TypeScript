import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { OrdemCompraService } from '../servicos/ordem-compra.service';
import { Pedido } from './../shared/pedido.model';
import { CarrinhoService } from '../servicos/carrinho.service';
import { ItemCarrinho } from '../shared/item-carrinho.model';


@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css']
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number;
  public itensCarrinho: ItemCarrinho[] = [];

  // public formulario = new FormGroup({
  //   endereco: new FormControl(''),
  //   numero: new FormControl(''),
  //   complemento: new FormControl(''),
  //   formaPagamento: new FormControl('')
  // });

  // The FormBuilder service has three methods: control(), group(), and array().
  public formulario = this.fb.group({
    endereco: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
    numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20), Validators.pattern('^[0-9]*$')]],
    complemento: [''],
    formaPagamento: ['', Validators.required]
  });


  constructor(
    private ordemCompraService: OrdemCompraService,
    private fb: FormBuilder,
    public carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
    console.log(this.itensCarrinho);
  }

  public confirmarCompra(): void {
    // TODO: Use EventEmitter with form value
    // console.warn(this.formulario.value);

    if (!this.verficarItensNoCarrinho()) {
      alert('Voce nao selecionou nenhum item');
      return;
    }

    const pedido = new Pedido(
      0,
      this.formulario.value.number,
      this.formulario.value.endereco,
      this.formulario.value.complemento,
      this.formulario.value.formaPagamento,
      this.carrinhoService.exibirItens()
    );

    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe((idPedido: number) => {
        this.carrinhoService.limparCarrinho();
        this.idPedidoCompra = idPedido;
      }, (error: any) => console.log('Erro Encontrado ', error));

  }

  public adicionar(item: ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item);
  }

  public remover(item: ItemCarrinho): void {
    this.carrinhoService.removerQuantidade(item);
  }

  public verficarItensNoCarrinho(): boolean {
    return (this.carrinhoService.exibirItens().length > 0);
  }
}
