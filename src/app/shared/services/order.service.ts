import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private database: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }



  async placeOrder(order) {
    let result = await this.database.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;

  }
  getOrders() {
    return this.database.list('/orders').valueChanges();
  }

  getOrdersByUser(userId) {
    return this.database.list('/orders',
      ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
  }

}
