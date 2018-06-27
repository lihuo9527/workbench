import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NdaysComponent } from './ndays.component';
import { TitleModule } from '../../components/title/title.module';
import { MaterialArrivalComponent } from './material-arrival/material-arrival.component';
import { EventsFinishedComponent } from './events-finished/events-finished.component';
import { ProgressTrackingComponent } from './progress-tracking/progress-tracking.component';
import { NdaysRoutes } from './ndays.router';
import { SearchBoxModule } from '../../components/search-box/search-box.module';
import { FilterModule } from '../../components/filter/filter.module';
import { SelectTypeComponent } from './select-type/select-type.component';
import { LoadMoreModule } from '../../components/load-more/load-more.module';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(NdaysRoutes),
        TitleModule,
        SearchBoxModule,
        FilterModule,
        FormsModule,
        LoadMoreModule,
    ],
    declarations: [
        NdaysComponent,
        MaterialArrivalComponent,
        EventsFinishedComponent,
        ProgressTrackingComponent,
        SelectTypeComponent
    ],
    exports: [RouterModule],
})
export class NdaysModule { }
