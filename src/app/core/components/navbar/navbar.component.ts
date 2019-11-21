

import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';


import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { AppUser } from '../../../shared/models/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user$: Observable<firebase.User>
  appUser: AppUser = new AppUser;
  cart: ShoppingCart = new ShoppingCart(null);
  shoppingCartItemCount: number



  constructor(
    public auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {


  }
  logout() {
    this.auth.logout;
  }


  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    const cart$ = await this.shoppingCartService.getCart();
    cart$.snapshotChanges().subscribe(temp => {
      let data: any;
      data = temp.payload.child('/items').val();
      this.cart = new ShoppingCart(data);
      this.shoppingCartItemCount = this.cart.totalItemsCount;



    });



  }
}

