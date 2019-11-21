import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  bob;
  constructor(private database: AngularFireDatabase) {


  }

  create(product) {
    return this.database.list('/products').push(product);

  }
  getAll() {
    return this.database.list('/products').snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
  }

  get(productId) {
    return this.database.object('/products/' + productId).valueChanges();

  }
  update(productId, product) {
    return this.database.object('/products/' + productId).update(product);
  }
  delete(productId) {
    return this.database.object('/products/' + productId).remove();
  }
}
