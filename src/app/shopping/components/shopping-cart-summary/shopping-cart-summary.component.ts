

import { Component, OnInit, Input } from '@angular/core';

import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';




@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit  {

  shoppingCartItemCount: number;
  cart: ShoppingCart = new ShoppingCart(null);

  constructor(private shoppingCartService:ShoppingCartService) { }

  async ngOnInit() {

    const cart$ = await this.shoppingCartService.getCart();
    cart$.snapshotChanges().subscribe( temp => {
      let data: any;    
      data = temp.payload.child('/items').val();
      this.cart = new ShoppingCart(data);
      this.shoppingCartItemCount = this.cart.totalItemsCount;
      
      
      
    });
  }
  clearCart(){
    this.shoppingCartService.clearCart();
  }

}
