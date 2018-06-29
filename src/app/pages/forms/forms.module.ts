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
import { MacroCapacityComponent } from './macro-capacity/macro-capacity.component';
import { DateModule } from '../../components/date/date.module';
import { CapacityFilterComponent } from './capacity-filter/capacity-filter.component';
import { CapacityFilterDirective } from './capacity-filter/capacity-filter.directive';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FormsRoutes),
        NgxEchartsModule,
        TitleModule,
        DateModule,

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
        MacroCapacityComponent,
        CapacityFilterComponent,
        CapacityFilterDirective,

    ],
    exports: [RouterModule],
})
export class FormsModule { }
