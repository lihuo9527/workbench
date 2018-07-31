import { RouterModule, Routes } from '@angular/router';
import { CriticalEntryComponent } from './critical-entry/critical-entry.component';
import { CriticalEventComponent } from './critical-event/critical-event.component';
import { EntryComponent } from './entry.component';
import { ScheduleEntryComponent } from './schedule-entry/schedule-entry.component';
import { NonPlaningProcessComponent } from './non-planing-process/non-planing-process.component';
import { ProductionDailyProgressComponent } from './production-daily-progress/production-daily-progress.component';
export const EntryRoutes: Routes = [
    {
        path: '',
        component: EntryComponent,
        children: [
            {
                path: 'criticalEntry/:data',
                component: CriticalEntryComponent
            },
            {
                path: 'criticalEvent',
                component: CriticalEventComponent,
            },
            {
                path: 'scheduleEntry/:data',
                component: ScheduleEntryComponent
            },
            {
                path: 'nonPlaningProcess',
                component: NonPlaningProcessComponent
            },
            {
                path: 'productionDailyProgress',
                component: ProductionDailyProgressComponent
            },

        ]
    }
]
