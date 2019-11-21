
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';




@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
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

    let item=this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }


  removeFromCard(){
  this.cartService.removeFromCart(this.product);
  }



}
