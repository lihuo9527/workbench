import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { DateModule } from '../../components/date/date.module';
@NgModule({
  imports: [
    CommonModule,
    DateModule
  ],
  declarations: [
    FilterComponent
  ],
  exports:[  
    FilterComponent, 
  ]
})
export class FilterModule { }
