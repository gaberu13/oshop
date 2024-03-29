


import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Order } from '../../../shared/models/oreder';
import { ShoppingCart } from '../../../shared/models/shopping-cart';




@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  shipping={}
  userSubscription: Subscription;
  @Input('cart')cart: ShoppingCart;
  userId: string
  constructor(
    private orederService:OrderService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user=> this.userId =user.uid)
  }


  async placeOrder(){
    let order = new Order( this.userId,this.shipping,this.cart)  
  let result = await this.orederService.placeOrder(order);
 
   this.router.navigate(['/order-success', result.key]);

}
ngOnDestroy(){
  this.userSubscription.unsubscribe();
}

}
