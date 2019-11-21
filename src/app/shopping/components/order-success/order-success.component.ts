import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  bobove: Observable<any>;
  constructor(private database: AngularFireDatabase) {
    
   }

  ngOnInit() {
    this.bobove=this.database.list('/bob').valueChanges();
    console.log(this.bobove)
  }

}
