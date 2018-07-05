import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/navigation/home/home.component';
import { DeliverDelayComponent } from './pages/delay/deliver-delay/deliver-delay.component';
import { CriticalEventDelayComponent } from './pages/delay/critical-event-delay/critical-event-delay.component';
import { ProcessDelayComponent } from './pages/delay/process-delay/process-delay.component';
import { EventDelayEditComponent } from './pages/delay/event-delay-edit/event-delay-edit.component';
import { MaterialDelayComponent } from './pages/delay/material-delay/material-delay.component';
import { AllWorkComponent } from './pages/navigation/all-work/all-work.component';
import { CriticalEventComponent } from './pages/entry/critical-event/critical-event.component';
import { ProductionDailyProgressComponent } from './pages/entry/production-daily-progress/production-daily-progress.component';
import { NonPlaningProcessComponent } from './pages/entry/non-planing-process/non-planing-process.component';
import { StartDelayComponent } from './pages/delay/start-delay/start-delay.component';
import { EventEntryComponent } from './pages/entry/event-entry/event-entry.component';
import { ScheduleEntryComponent } from './pages/entry/schedule-entry/schedule-entry.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { ForgotPasswordComponent } from './pages/user/forgot-password/forgot-password.component';
import { OutProcessComponent } from './pages/out/out-process/out-process.component';
import { PlanEntryComponent } from './pages/out/plan-entry/plan-entry.component';
import { SelectingSuppliersComponent } from './pages/out/selecting-suppliers/selecting-suppliers.component';
import { OutSourcingComponent } from './pages/navigation/out-sourcing/out-sourcing.component';
import { UnansweredComponent } from './pages/out/unanswered/unanswered.component';
import { UnfinishedComponent } from './pages/out/unfinished/unfinished.component';
import { UnansweredEntryComponent } from './pages/out/unanswered-entry/unanswered-entry.component';
import { UnfinishedEntryComponent } from './pages/out/unfinished-entry/unfinished-entry.component';
import { NotBindComponent } from './pages/not-bind/not-bind.component';
export const appRoutes = [
    {
        path: 'home',
        component: HomeComponent
    },
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
        path: 'eventDelayEdit/:data',
        component: EventDelayEditComponent
    },
    {
        path: 'materialDelay/:id',
        component: MaterialDelayComponent
    },
    {
        path: 'all',
        component: AllWorkComponent
    },
    {
        path: 'criticalEvent',
        component: CriticalEventComponent
    },
    {
        path: 'productionDailyProgress',
        component: ProductionDailyProgressComponent
    },
    {
        path: 'nonPlaningProcess',
        component: NonPlaningProcessComponent
    },
    {
        path: 'startDelay/:id',
        component: StartDelayComponent
    },
    {
        path: 'eventEntry/:data',
        component: EventEntryComponent
    },
    {
        path: 'scheduleEntry/:data',
        component: ScheduleEntryComponent
    },
    {
        path: 'search/:id',
        component: SearchComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
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
    {
        path: 'forms',
        loadChildren: 'app/pages/forms/forms.module#FormsModule'
    },
    {
        path: 'ndays',
        loadChildren: 'app/pages/ndays/ndays.module#NdaysModule'
    },
    {
        path: 'not-bind',
        component: NotBindComponent
    },
    {
        path: '',
        component: HomeComponent
    },

    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
    }
];