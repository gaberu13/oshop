


import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../../../shared/models/shopping-cart';



@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart: ShoppingCart;
  cartSubscription: Subscription;




  constructor(
    private shoppingCartService: ShoppingCartService,
  ) { }


  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.valueChanges().subscribe(cart => this.cart = cart);

  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();

  }
}

