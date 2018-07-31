import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutComponent } from './out.component';
import { RouterModule } from '@angular/router';
import { OutRoutes } from './out.router';
import { FormsModule } from '@angular/forms';
import { TitleModule } from '../../components/title/title.module';
import { DateModule } from '../../components/date/date.module';
import { FilterModule } from '../../components/filter/filter.module';
import { LoadMoreModule } from '../../components/load-more/load-more.module';
import { LoadingModule } from '../../components/loading/loading.module';
import { SearchBoxModule } from '../../components/search-box/search-box.module';
import { MessageBoxModule } from '../../components/message-box/message-box.module';
import { DirectiveModule } from '../../directives/directives.module';
import { OutSourcingComponent } from './out-sourcing/out-sourcing.component';
import { OutProcessComponent } from './out-process/out-process.component';
import { UnansweredComponent } from './unanswered/unanswered.component';
import { UnfinishedComponent } from './unfinished/unfinished.component';
import { UnansweredEntryComponent } from './unanswered-entry/unanswered-entry.component';
import { UnfinishedEntryComponent } from './unfinished-entry/unfinished-entry.component';
import { PlanEntryComponent } from './plan-entry/plan-entry.component';
import { SelectingSuppliersComponent } from './selecting-suppliers/selecting-suppliers.component';
@NgModule({
    imports: [
        RouterModule.forChild(OutRoutes),
        CommonModule,
        DirectiveModule,
        MessageBoxModule,
        SearchBoxModule,
        LoadingModule,
        LoadMoreModule,
        FilterModule,
        DateModule,
        TitleModule,
        FormsModule,
    ],
    declarations: [
        OutComponent,
        UnansweredComponent,
        UnfinishedComponent,
        UnansweredEntryComponent,
        UnfinishedEntryComponent,
        OutProcessComponent,
        PlanEntryComponent,
        OutSourcingComponent,
        SelectingSuppliersComponent,
    ],

    exports: [RouterModule]
})
export class OutModule { }
