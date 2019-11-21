
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  //products: Product[];
  products: any[];
  filteredProduct: any[];
  subscription:Subscription;
  
  constructor(private productService: ProductService) {
   this.subscription= this.productService.getAll()
   .subscribe(products => {
     this.filteredProduct=this.products=products;

    });
   }
   filter(query: string){
    this.filteredProduct=(query) ?
    this.products.filter(p=> p.title.toLowerCase().includes(query.toLowerCase())) : 
    this.products;
   }

  ngOnInit() {
    
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
