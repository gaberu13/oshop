import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
  shoppingCartItemCount: number;
  cart: ShoppingCart = new ShoppingCart(null);
  

  constructor(private shoppingCartService: ShoppingCartService) { }

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
