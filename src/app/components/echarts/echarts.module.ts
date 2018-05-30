import { NgModule } from '@angular/core';
import { EchartsComponent } from './echarts.component';
import { Router,RouterModule } from "@angular/router";
import { NgxEchartsModule} from 'ngx-echarts';
@NgModule({
    declarations: [
        EchartsComponent
    ],
    imports: [
        RouterModule.forChild([
            {
              path: '',
              component: EchartsComponent,

            }
          ]),
          NgxEchartsModule
    ],
    exports:[RouterModule],
  })
  export class EchartsModule { }