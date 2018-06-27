import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBoxComponent } from './search-box.component';
@NgModule({
  imports: [
    CommonModule,   
    FormsModule 
  ],
  declarations: [
    SearchBoxComponent
  ],
  exports:[  
    SearchBoxComponent, 
  ]
})
export class SearchBoxModule { }
