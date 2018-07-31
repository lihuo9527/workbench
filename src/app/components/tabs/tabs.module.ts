import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    TabsComponent
  ],
  exports:[  
    TabsComponent, 
  ]
})
export class TabsModule { }
