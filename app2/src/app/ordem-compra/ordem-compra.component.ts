import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../servicos/ordem-compra.service';
import { Pedido } from './../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css']
})
export class OrdemCompraComponent implements OnInit {

  // Pedido model
  public pedido: Pedido = new Pedido(0, '', '', '', '');
  public idPedidoCompra: number;

  public endereco = '';
  public numero = '';
  public complemento = '';
  public formaPagamento = '';

  // controles de validação dos campos
  public enderecoValido: boolean;
  public numeroValido: boolean;
  public complementoValido: boolean;
  public formaPagamentoValido: boolean;

  // estados primitivos dos campos (pristine)
  public enderecoEstadoPrimitivo = true;
  public numeroEstadoPrimitivo = true;
  public complementoEstadoPrimitivo = true;
  public formaPagamentoEstadoPrimitivo = true;

  // controla o estado do botao submite
  public formEstado = 'disabled';

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {

  }

  public atualizaEndereco(endereco: string): void {
    this.endereco = endereco;
    // console.log(this.endereco);
    this.enderecoEstadoPrimitivo = false;

    if (this.endereco.length > 3) {
      this.enderecoValido = true;
    } else {
      this.enderecoValido = false;
    }

    this.habilitaForm();
  }

  public atualizaNumero(numero: string): void {
    this.numero = numero;
    // console.log(this.numero);

    this.numeroEstadoPrimitivo = false;
    this.numeroValido = true;
    this.habilitaForm();
  }

  public atualizaComplemento(complemento: string): void {
    this.complemento = complemento;
    // console.log(this.complemento);

    this.complementoEstadoPrimitivo = false;

    this.habilitaForm();
  }

  public atualizaFormaPagamento(formaPagamento: string): void {
    this.formaPagamento = formaPagamento;
    // console.log(this.formaPagamento);

    this.formaPagamentoEstadoPrimitivo = false;
    this.formaPagamentoValido = true;

    this.habilitaForm();
  }


  public habilitaForm(): void {

    if (this.enderecoValido && this.numeroValido && this.formaPagamentoValido) {
      this.formEstado = '';
    } else {
      this.formEstado = 'disabled';
    }

  }

  public confirmarCompra(): void {

    this.pedido.endereco = this.endereco;
    this.pedido.numero = this.numero;
    this.pedido.complemento = this.complemento;
    this.pedido.formaPagamento = this.formaPagamento;

    this.ordemCompraService.efetivarCompra(this.pedido)
      .subscribe((idPedido: number) => {
        this.idPedidoCompra = idPedido;
      },
        (error: any) => {
          console.log('Erro capturado no CLIENTE SUBSCRIBE ', error);
        }
      );

  }


}
