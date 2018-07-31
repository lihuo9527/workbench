import { RouterModule, Routes } from '@angular/router';
import { OutComponent } from './out.component';
import { OutProcessComponent } from './out-process/out-process.component';
import { UnansweredComponent } from './unanswered/unanswered.component';
import { UnfinishedComponent } from './unfinished/unfinished.component';
import { UnansweredEntryComponent } from './unanswered-entry/unanswered-entry.component';
import { UnfinishedEntryComponent } from './unfinished-entry/unfinished-entry.component';
import { PlanEntryComponent } from './plan-entry/plan-entry.component';
import { SelectingSuppliersComponent } from './selecting-suppliers/selecting-suppliers.component';
import { OutSourcingComponent } from './out-sourcing/out-sourcing.component';
export const OutRoutes: Routes = [
    {
        path: '',
        component: OutComponent,
        children: [
            {
                path: 'outProcess/:title',
                component: OutProcessComponent,
            },
            {
                path: 'planEntry/:data',
                component: PlanEntryComponent,
            },
            {
                path: 'selectingSuppliers/:data',
                component: SelectingSuppliersComponent,
            },
            {
                path: 'outSourcing',
                component: OutSourcingComponent,
            },
            {
                path: 'unanswered/:id',
                component: UnansweredComponent,
            },
            {
                path: 'unfinished/:id',
                component: UnfinishedComponent,
            },
            {
                path: 'unansweredEntry/:data',
                component: UnansweredEntryComponent,
            },
            {
                path: 'unfinishedEntry/:data',
                component: UnfinishedEntryComponent,
            },
        ]
    }
]
