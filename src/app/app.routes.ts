import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/navigation/home/home.component';
import { DeliverDelayComponent } from './pages/delay/deliver-delay/deliver-delay.component';
import { CriticalEventDelayComponent } from './pages/delay/critical-event-delay/critical-event-delay.component';
import { ProcessDelayComponent } from './pages/delay/process-delay/process-delay.component';
import { EventDelayEditComponent } from './pages/delay/event-delay-edit/event-delay-edit.component';
import { MaterialDelayComponent } from './pages/delay/material-delay/material-delay.component';
import { TodayComponent } from './pages/today/today.component';
import { AllWorkComponent } from './pages/navigation/all-work/all-work.component';
import { CriticalEventComponent } from './pages/entry/critical-event/critical-event.component';
import { ProductionDailyProgressComponent } from './pages/entry/production-daily-progress/production-daily-progress.component';
import { NonPlaningProcessComponent } from './pages/entry/non-planing-process/non-planing-process.component';
import { SevenDayComponent } from './pages/seven-day/seven-day.component';
import { StartDelayComponent } from './pages/delay/start-delay/start-delay.component';
import { EventEntryComponent } from './pages/entry/event-entry/event-entry.component';
import { ScheduleEntryComponent } from './pages/entry/schedule-entry/schedule-entry.component';
import { SearchComponent } from './pages/search/search.component';
import { JoListComponent } from './pages/produce/jo-list/jo-list.component';
import { JoTabsComponent } from './pages/produce/jo-tabs/jo-tabs.component';
import { ResultComparisonComponent } from './pages/produce/result-comparison/result-comparison.component';
import { ScheduleListComponent } from './pages/produce/schedule-list/schedule-list.component';
import { ScheduleReportFormsComponent } from './pages/produce/schedule-report-forms/schedule-report-forms.component';
import { DetailAnalysisListComponent } from './pages/produce/detail-analysis-list/detail-analysis-list.component';
import { DetailAnalysisComponent } from './pages/produce/detail-analysis/detail-analysis.component';
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
        path: 'eventDalayEdit/:data',
        component: EventDelayEditComponent
    },
    {
        path: 'materialDalay/:id',
        component: MaterialDelayComponent
    },
    {
        path: 'today/:id',
        component: TodayComponent
    },
    {
        path: 'all/:id',
        component: AllWorkComponent
    },
    {
        path: 'criticalEvent/:id',
        component: CriticalEventComponent
    },
    {
        path: 'productionDailyProgress/:id',
        component: ProductionDailyProgressComponent
    },
    {
        path: 'NonPlaningProcessComponent/:id',
        component: NonPlaningProcessComponent
    },
    {
        path: 'sevenDay/:id',
        component: SevenDayComponent
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
        path: 'joList/:data',
        component: JoListComponent
    },
    {
        path: 'joTabs/:data',
        component: JoTabsComponent
    },
    {
        path: 'resultComparison',
        component: ResultComparisonComponent
    },
    {
        path: 'scheduleList',
        component: ScheduleListComponent
    },
    {
        path: 'scheduleReportForms',
        component: ScheduleReportFormsComponent
    },
    {
        path: 'detailAnalysisList/:data',
        component: DetailAnalysisListComponent
    },
    {
        path: 'detailAnalysis/:data',
        component: DetailAnalysisComponent
    },
    {
        path: 'echarts',
        // component: EchartsComponent
        loadChildren: './components/echarts/echarts.module#EchartsModule'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    // {
    // 	path:'scheduleEntry',
    // 	loadChildren: 'app/schedule-entry/schedule-entry.module#ScheduleEntryModule'
    // },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'outProcess/:data',
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
        path: 'unanswered',
        component: UnansweredComponent,
    },
    {
        path: 'unfinished',
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
        path: '',
        component: HomeComponent
    },

    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
    }
];