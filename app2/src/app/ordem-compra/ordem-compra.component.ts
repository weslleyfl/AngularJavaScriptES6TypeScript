import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pedido } from '../shared/pedido.model';
import { OrdemCompraService } from '../servicos/ordem-compra.service';


@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css']
})
export class OrdemCompraComponent implements OnInit {

  // recuperando a variavel de formulario #
  @ViewChild('formulario') public formulario: NgForm;
  // public model: any = {};
  public model = new Pedido(0, '', '', '', '');
  public idPedidoCompra: number;

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {

  }

  public confirmarCompra(form): void {
    console.log(form.value);
    // console.log(this.formulario);
    // console.log(this.model);

    // const pedido = new Pedido(
    //   0,
    //   form.value.endereco,
    //   form.value.numero,
    //   form.value.complemento,
    //   form.value.formaPagamento
    // );

    // console.log('pedido ', pedido);

    this.ordemCompraService.efetivarCompra(this.model)
      .subscribe((idPedido: number) => {
        console.log('Pedido cadastrado com sucesso! Id do Pedido', idPedido);
        this.idPedidoCompra = idPedido;
      },
      (error: any) => console.log('Erro encontrado!', error));


  }

}
