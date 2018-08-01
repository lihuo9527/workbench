import { RouterModule, Routes } from '@angular/router';
import { DelayComponent } from './delay.component';
import { DeliverDelayComponent } from './deliver-delay/deliver-delay.component';
import { CriticalEventDelayComponent } from './critical-event-delay/critical-event-delay.component';
import { ProcessDelayComponent } from './process-delay/process-delay.component';
import { DelayEditComponent } from './delay-edit/delay-edit.component';
import { MaterialDelayComponent } from './material-delay/material-delay.component';
import { StartDelayComponent } from './start-delay/start-delay.component';
export const DelayRoutes: Routes = [
    {
        path: '',
        component: DelayComponent,
        children: [
            {
                path: 'deliverDelay/:id',
                component: DeliverDelayComponent
            },
            {
                path: 'criticalEventDelay/:id',
                component: CriticalEventDelayComponent
            },
            {
                path: 'processDelay/:id',
                component: ProcessDelayComponent
            },
            {
                path: 'delayEdit/:data',
                component: DelayEditComponent
            },
            {
                path: 'materialDelay/:id',
                component: MaterialDelayComponent
            },
            {
                path: 'startDelay/:id',
                component: StartDelayComponent
            },

        ]
    }
]
