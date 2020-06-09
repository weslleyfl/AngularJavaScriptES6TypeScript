import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { OrdemCompraService } from '../servicos/ordem-compra.service';
import { Pedido } from './../shared/pedido.model';



@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css']
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number;
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


  constructor(private ordemCompraService: OrdemCompraService, private fb: FormBuilder) { }

  ngOnInit() {

  }

  public confirmarCompra(): void {
    // TODO: Use EventEmitter with form value
    console.warn(this.formulario.value);
    const pedido = new Pedido(
      0,
      this.formulario.value.number,
      this.formulario.value.endereco,
      this.formulario.value.complemento,
      this.formulario.value.formaPagamento
    );

    this.ordemCompraService.efetivarCompra(pedido)
        .subscribe((idPedido: number) => {
          console.log('Numero pedido', idPedido);
          this.idPedidoCompra = idPedido;
        }, (error: any) => console.log('Erro Encontrado ', error));

  }
}
