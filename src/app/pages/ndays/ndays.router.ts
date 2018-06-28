import { RouterModule, Routes } from '@angular/router';
import { MaterialArrivalComponent } from './material-arrival/material-arrival.component';
import { EventsFinishedComponent } from './events-finished/events-finished.component';
import { ProgressTrackingComponent } from './progress-tracking/progress-tracking.component';
import { SelectTypeComponent } from './select-type/select-type.component';
import { NdaysComponent } from './ndays.component';
export const NdaysRoutes: Routes = [
    {
        path: '',
        component: NdaysComponent,
        children: [
            {
                path: 'materialArrival',
                component: MaterialArrivalComponent,
            },
            {
                path: 'eventsFinished/:id',
                component: EventsFinishedComponent,
            },
            {
                path: 'progressTracking/:id',
                component: ProgressTrackingComponent,
            }
            ,
            {
                path: 'selectType/:id',
                component: SelectTypeComponent,
            }
        ]
    }
]
