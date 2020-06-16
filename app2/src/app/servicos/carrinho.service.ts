import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../shared/item-carrinho.model';
import { Oferta } from '../shared/oferta.model';


@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  public itens: ItemCarrinho[] = [];
  constructor() { }

  public exibirItens(): ItemCarrinho[] {
    return this.itens;
  }

  public incluirItem(oferta: Oferta): void {
    const itemCarrinho: ItemCarrinho = new ItemCarrinho(
      oferta.id,
      oferta.imagens[0],
      oferta.titulo,
      oferta.descricaoOferta,
      oferta.valor,
      1
    );

    // é uma referencia o carrinho
    const itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade += 1;
    } else {
      this.itens.push(itemCarrinho);
    }

  }

  public totalCarrinhoCompra(): number {
    let total = 0;

    this.itens.map((item: ItemCarrinho) => {
      total = total + (item.quantidade * item.valor);
    });

    return total;
  }

  public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
    // referencia
    const itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

    // se nao for undefined
    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade += 1;
    }
  }

  public removerQuantidade(itemCarrinho: ItemCarrinho): void {
    // referencia
    const itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

    // se nao for undefined
    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade -= 1;

      if (itemCarrinhoEncontrado.quantidade === 0) {
        this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado, 0), 1);
      }

    }
  }

  public limparCarrinho(): void {
    this.itens = [];
  }

}
