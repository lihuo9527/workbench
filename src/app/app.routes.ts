import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DeliverDelayComponent } from './pages/delay/deliver-delay/deliver-delay.component';
import { CriticalEventDelayComponent } from './pages/delay/critical-event-delay/critical-event-delay.component';
import { ProcessDelayComponent } from './pages/delay/process-delay/process-delay.component';
import { EventDelayEditComponent } from './pages/delay/event-delay-edit/event-delay-edit.component';
import { MaterialDelayComponent } from './pages/delay/material-delay/material-delay.component';
import { TodayComponent } from './pages/today/today.component';
import { AllWorkComponent } from './pages/all-work/all-work.component';
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
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
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
        path:'echarts',
        // component: EchartsComponent
		loadChildren: './components/echarts/echarts.module#EchartsModule'
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'register',
        component: RegisterComponent
	},
	// {
	// 	path:'scheduleEntry',
	// 	loadChildren: 'app/schedule-entry/schedule-entry.module#ScheduleEntryModule'
    // },
    {
        path: '',
        component:LoginComponent
    },
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: 'login'
	}
];