import { RouterModule ,Routes} from '@angular/router';
import { FormsComponent } from './forms.component';
import { TypeSummaryComponent } from './type-summary/type-summary.component';
import { TheMonthEffComponent } from './the-month-eff/the-month-eff.component';
import { EveryMonthEffComponent } from './every-month-eff/every-month-eff.component';
import { CustomerOutputComponent } from './customer-output/customer-output.component';
import { DailyLineEffComponent } from './daily-line-eff/daily-line-eff.component';
import { OrderCycleProductionComponent } from './order-cycle-production/order-cycle-production.component';
import { EveryMonthQtyComponent } from './every-month-qty/every-month-qty.component';
import { OrderCycleSummaryComponent } from './order-cycle-summary/order-cycle-summary.component';
import { MacroCapacityComponent } from './macro-capacity/macro-capacity.component';

export const FormsRoutes : Routes = [
    {
        path: '',
        component: FormsComponent,
        children:[
            {
                path: 'typeSummary',
                component: TypeSummaryComponent,
            },
            {
                path: 'theMonthEff',
                component: TheMonthEffComponent,
            },
            {
                path: 'everyMonthEff',
                component: EveryMonthEffComponent,
            },
            {
                path: 'customerOutput',
                component: CustomerOutputComponent,
            },
            {
                path: 'dailyLineEff',
                component: DailyLineEffComponent,
            },
            {
                path: 'orderCycleProduction',
                component: OrderCycleProductionComponent,
            },
            {
                path: 'orderCycleSummary',
                component: OrderCycleSummaryComponent,
            },
            {
                path: 'everyMonthQty',
                component: EveryMonthQtyComponent,
            },
            {
                path: 'macroCapacity',
                component: MacroCapacityComponent,
            }
        ]
    }

]
