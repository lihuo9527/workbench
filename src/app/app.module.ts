import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/navigation/home/home.component';
import { ListTitleComponent } from './components/list-title/list-title.component';
import { DeliverDelayComponent } from './pages/delay/deliver-delay/deliver-delay.component';
import { CriticalEventDelayComponent } from './pages/delay/critical-event-delay/critical-event-delay.component';
import { ProcessDelayComponent } from './pages/delay/process-delay/process-delay.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { EventDelayEditComponent } from './pages/delay/event-delay-edit/event-delay-edit.component';
import { MaterialDelayComponent } from './pages/delay/material-delay/material-delay.component';
import { AllWorkComponent } from './pages/navigation/all-work/all-work.component';
import { CriticalEventComponent } from './pages/entry/critical-event/critical-event.component';
import { ProductionDailyProgressComponent } from './pages/entry/production-daily-progress/production-daily-progress.component';
import { LoadMoreModule } from './components/load-more/load-more.module';
import { NonPlaningProcessComponent } from './pages/entry/non-planing-process/non-planing-process.component';
import { StartDelayComponent } from './pages/delay/start-delay/start-delay.component';
import { EventEntryComponent } from './pages/entry/event-entry/event-entry.component';
import { ScheduleEntryComponent } from './pages/entry/schedule-entry/schedule-entry.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { ForgotPasswordComponent } from './pages/user/forgot-password/forgot-password.component';
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
import { NotBindComponent } from './pages/not-bind/not-bind.component';
import { TitleModule } from './components/title/title.module';
import { FilterModule } from './components/filter/filter.module';
import { DateModule } from './components/date/date.module';
import { AppRoutingModule } from './/app-routing.module';
import { SearchBoxModule } from './components/search-box/search-box.module';
import { MessageBoxModule } from './components/message-box/message-box.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UndefinedModule } from './components/undefined/undefined.module';
import { DownUpdateDirective } from './directives/down-update/down-update.directive';



// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// 使用TranslateHttpLoader加载项目的本地语言json配置文件
// function createTranslateLoader(http: HttpClient) {
//     return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ListTitleComponent,
        DeliverDelayComponent,
        CriticalEventDelayComponent,
        ProcessDelayComponent,
        TabsComponent,
        EventDelayEditComponent,
        MaterialDelayComponent,
        AllWorkComponent,
        CriticalEventComponent,
        ProductionDailyProgressComponent,
        NonPlaningProcessComponent,
        StartDelayComponent,
        EventEntryComponent,
        ScheduleEntryComponent,
        SearchComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        LoadingComponent,
        OutProcessComponent,
        PlanEntryComponent,
        SelectingSuppliersComponent,
        OutSourcingComponent,
        UnansweredComponent,
        UnfinishedComponent,
        UnansweredEntryComponent,
        UnfinishedEntryComponent,
        DownUpdateDirective,
        NotBindComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        TitleModule,
        SearchBoxModule,
        FilterModule,
        DateModule,
        MessageBoxModule,
        LoadMoreModule,
        UndefinedModule,
        // TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: (createTranslateLoader),
        //         deps: [ HttpClient ]
        //     }
        // }),
    ],
    providers: [AppService, CookieService],
    bootstrap: [AppComponent],
})
export class AppModule { }
