import { NgModule } from '@angular/core';
import {MatToolbarModule,MatMenuModule, MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatListModule, MatTableModule, MatPaginatorModule, MatGridListModule, MatBadgeModule} from '@angular/material';



@NgModule({
  exports:[
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatBadgeModule

  ]

  
})
export class MaterialsModule { }
