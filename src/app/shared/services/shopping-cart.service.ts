import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { ShoppingCart } from '../models/shopping-cart';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private database: AngularFireDatabase) { }

  private create() {
    return this.database.list('/shopping-carts').push({
      dataCreated: new Date().getTime()
    })
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.database.object('/shopping-carts/' + cartId + '/items').remove();
  }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cardId = await this.getOrCreateCartId();
    return this.database.object('/shopping-carts/' + cardId);
  }

  private async getOrCreateCartId() {
    let cardId = localStorage.getItem('cartId');
    if (cardId) return cardId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: any) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: any) {
    this.updateItemQuantity(product, -1);
  }

  private getItem(cartId: string, productId: string) {
    return this.database.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async updateItemQuantity(product: any, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId, product.key);

    item.snapshotChanges().take(1)
      .subscribe(data => {
        const quantity = (data.payload.child('/quantity').val() || 0) + change;
        if (quantity === 0) {
          item.remove();
        } else {
          item.update({
            product: product,
            quantity: quantity
          });
        }
      });
  }


}
