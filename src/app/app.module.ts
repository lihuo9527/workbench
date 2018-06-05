import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AppService} from './app.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ListTitleComponent } from './components/list-title/list-title.component';
import { DeliverDelayComponent  } from './pages/delay/deliver-delay/deliver-delay.component';
import { CriticalEventDelayComponent } from './pages/delay/critical-event-delay/critical-event-delay.component';
import { TitleComponent } from './components/title/title.component';
import { ProcessDelayComponent } from './pages/delay/process-delay/process-delay.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { EventDelayEditComponent } from './pages/delay/event-delay-edit/event-delay-edit.component';
import { MaterialDelayComponent } from './pages/delay/material-delay/material-delay.component';
import { TodayComponent } from './pages/today/today.component';
import { FilterComponent } from './components/filter/filter.component';
import { DateComponent } from './components/date/date.component';
import { AllWorkComponent } from './pages/all-work/all-work.component';
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
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListTitleComponent,
    DeliverDelayComponent,
    CriticalEventDelayComponent,
    TitleComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
