import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {appRoutes} from './app.routes';
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes,{ useHash: true })]
})

export class AppRoutingModule { 

  
}
