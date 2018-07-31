import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CriticalEntryComponent } from './critical-entry/critical-entry.component';
import { CriticalEventComponent } from './critical-event/critical-event.component';
import { EntryComponent } from './entry.component';
import { ScheduleEntryComponent } from './schedule-entry/schedule-entry.component';
import { NonPlaningProcessComponent } from './non-planing-process/non-planing-process.component';
import { ProductionDailyProgressComponent } from './production-daily-progress/production-daily-progress.component';
import { EntryRoutes } from './entry.router';
import { TitleModule } from '../../components/title/title.module';
import { DateModule } from '../../components/date/date.module';
import { FilterModule } from '../../components/filter/filter.module';
import { LoadMoreModule } from '../../components/load-more/load-more.module';
import { LoadingModule } from '../../components/loading/loading.module';
import { SearchBoxModule } from '../../components/search-box/search-box.module';
import { MessageBoxModule } from '../../components/message-box/message-box.module';
import { DirectiveModule } from '../../directives/directives.module';
@NgModule({
    imports: [
        RouterModule.forChild(EntryRoutes),
        CommonModule,
        FormsModule,
        TitleModule,
        DateModule,
        FilterModule,
        LoadMoreModule,
        LoadingModule,
        SearchBoxModule,
        MessageBoxModule,
        DirectiveModule,
    ],
    declarations: [
        EntryComponent,
        CriticalEventComponent,
        CriticalEntryComponent,
        ScheduleEntryComponent,
        NonPlaningProcessComponent,
        ProductionDailyProgressComponent,
    ],
    exports: [RouterModule],
})
export class EntryModule { }
