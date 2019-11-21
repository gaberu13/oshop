import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';


@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
@Input('product') product: any;
@Input('show-actions') showActions = true;
@Input('shopping-cart') shoppingCart:ShoppingCart;
  constructor(private cartService:ShoppingCartService) { 
   
  }

  addToCard(){
    this.cartService.addToCart(this.product);
  }
  getQuantity(){
    if(!this.shoppingCart){return 0;}
    let item=this.shoppingCart.itemsMap[this.product.key];
    return item ? item.quantity : 0;
  }


  removeFromCard(){
  this.cartService.removeFromCart(this.product);
  }



}
