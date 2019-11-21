import { Product } from './../../../shared/models/product';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy  {

  products: any;
  filteredProduct: any[] = [];
  category;
  cart: any;
  subscription:Subscription

  constructor(productService:ProductService,route:ActivatedRoute,private shoppingCart:ShoppingCartService) {
    
   

    productService.getAll().switchMap(products => {
      this.products=products;
      return route.queryParamMap;
    })
      .subscribe(parms=>{
        this.category=parms.get('category');
  
        this.filteredProduct = (this.category) ?
        this.products.filter(p=> p.category === this.category) :
        this.products;
      });
    

    
    
   }

   async ngOnInit(){
     this.subscription=(await this.shoppingCart.getCart()).valueChanges().subscribe(cart=>{
        this.cart=cart;
     })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  

}
