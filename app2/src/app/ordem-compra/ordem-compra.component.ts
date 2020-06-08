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

  @ViewChild('formulario') public formulario: NgForm;
  public model: any = {};

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {

  }


  public confirmarCompra(): void {
    console.log(this.formulario);
    console.log(this.model);

    this.formulario.reset();
  }

}
