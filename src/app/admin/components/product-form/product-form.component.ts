import 'rxjs/add/operator/take';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product = {};
  id;





  constructor(
    categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,

  ) {

    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);



  }

  save(product) {
    if (this.id) { this.productService.update(this.id, product) }
    else
      this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
  delete() {
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }


}
