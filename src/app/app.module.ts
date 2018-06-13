import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './pages/navigation/home/home.component';
import { ListTitleComponent } from './components/list-title/list-title.component';
import { DeliverDelayComponent } from './pages/delay/deliver-delay/deliver-delay.component';
import { CriticalEventDelayComponent } from './pages/delay/critical-event-delay/critical-event-delay.component';
import { TitleModule } from './components/title/title.module';
import { ProcessDelayComponent } from './pages/delay/process-delay/process-delay.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { EventDelayEditComponent } from './pages/delay/event-delay-edit/event-delay-edit.component';
import { MaterialDelayComponent } from './pages/delay/material-delay/material-delay.component';
import { TodayComponent } from './pages/today/today.component';
import { FilterComponent } from './components/filter/filter.component';
import { DateComponent } from './components/date/date.component';
import { AllWorkComponent } from './pages/navigation/all-work/all-work.component';
import { CriticalEventComponent } from './pages/entry/critical-event/critical-event.component';
import { ProductionDailyProgressComponent } from './pages/entry/production-daily-progress/production-daily-progress.component';
import { LoadMoreComponent } from './components/load-more/load-more.component';
import { NonPlaningProcessComponent } from './pages/entry/non-planing-process/non-planing-process.component';
import { SevenDayComponent } from './pages/seven-day/seven-day.component';
import { StartDelayComponent } from './pages/delay/start-delay/start-delay.component';
import { ProcessEntryComponent } from './pages/entry/process-entry/process-entry.component';
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
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { ForgotPasswordComponent } from './pages/user/forgot-password/forgot-password.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { CookieService } from 'ngx-cookie-service';
import { LoadingComponent } from './components/loading/loading.component';
import { OutProcessComponent } from './pages/out/out-process/out-process.component';
import { PlanEntryComponent } from './pages/out/plan-entry/plan-entry.component';
import { SelectingSuppliersComponent } from './pages/out/selecting-suppliers/selecting-suppliers.component';
import { OutSourcingComponent } from './pages/navigation/out-sourcing/out-sourcing.component';
import { UnansweredComponent } from './pages/out/unanswered/unanswered.component';
import { UnfinishedComponent } from './pages/out/unfinished/unfinished.component';
import { UnansweredEntryComponent } from './pages/out/unanswered-entry/unanswered-entry.component';
import { UnfinishedEntryComponent } from './pages/out/unfinished-entry/unfinished-entry.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ListTitleComponent,
        DeliverDelayComponent,
        CriticalEventDelayComponent,
        ProcessDelayComponent,
        SearchBoxComponent,
        TabsComponent,
        EventDelayEditComponent,
        MaterialDelayComponent,
        TodayComponent,
        FilterComponent,
        DateComponent,
        AllWorkComponent,
        CriticalEventComponent,
        ProductionDailyProgressComponent,
        LoadMoreComponent,
        NonPlaningProcessComponent,
        SevenDayComponent,
        StartDelayComponent,
        ProcessEntryComponent,
        EventEntryComponent,
        ScheduleEntryComponent,
        SearchComponent,
        JoListComponent,
        JoTabsComponent,
        ResultComparisonComponent,
        ScheduleListComponent,
        ScheduleReportFormsComponent,
        DetailAnalysisListComponent,
        DetailAnalysisComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        MessageBoxComponent,
        LoadingComponent,
        OutProcessComponent,
        PlanEntryComponent,
        SelectingSuppliersComponent,
        OutSourcingComponent,
        UnansweredComponent,
        UnfinishedComponent,
        UnansweredEntryComponent,
        UnfinishedEntryComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        TitleModule,

    ],
    providers: [AppService, CookieService],
    bootstrap: [AppComponent],
})
export class AppModule { }
