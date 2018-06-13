import { NgModule } from '@angular/core';
import { FormsRoutes } from './forms.router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TypeSummaryComponent } from './type-summary/type-summary.component';
import { TheMonthEffComponent } from './the-month-eff/the-month-eff.component';
import { EveryMonthEffComponent } from './every-month-eff/every-month-eff.component';
import { CustomerOutputComponent } from './customer-output/customer-output.component';
import { DailyLineEffComponent } from './daily-line-eff/daily-line-eff.component';
import { OrderCycleProductionComponent } from './order-cycle-production/order-cycle-production.component';
import { OrderCycleSummaryComponent } from './order-cycle-summary/order-cycle-summary.component';
import { EveryMonthQtyComponent } from './every-month-qty/every-month-qty.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsComponent } from './forms.component';
import { TitleModule } from '../../components/title/title.module';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FormsRoutes),
        NgxEchartsModule,
        TitleModule,

    ],
    declarations: [
        FormsComponent,
        TypeSummaryComponent,
        TheMonthEffComponent,
        EveryMonthEffComponent,
        CustomerOutputComponent,
        DailyLineEffComponent,
        OrderCycleSummaryComponent,
        OrderCycleProductionComponent,
        EveryMonthQtyComponent,
        FormsComponent,

    ],
    exports: [RouterModule],
})
export class FormsModule { }
