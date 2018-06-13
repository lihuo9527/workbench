import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TitleComponent
  ],
  exports:[  
    CommonModule,
    TitleComponent, 
  ]
})
export class TitleModule { }
