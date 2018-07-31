import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DelayComponent } from './delay.component';
import { DelayRoutes } from './delay.router';
import { DeliverDelayComponent } from './deliver-delay/deliver-delay.component';
import { CriticalEventDelayComponent } from './critical-event-delay/critical-event-delay.component';
import { ProcessDelayComponent } from './process-delay/process-delay.component';
import { EventDelayEditComponent } from './event-delay-edit/event-delay-edit.component';
import { MaterialDelayComponent } from './material-delay/material-delay.component';
import { StartDelayComponent } from './start-delay/start-delay.component';
import { FormsModule } from '@angular/forms';
import { TitleModule } from '../../components/title/title.module';
import { FilterModule } from '../../components/filter/filter.module';
import { LoadMoreModule } from '../../components/load-more/load-more.module';
import { SearchBoxModule } from '../../components/search-box/search-box.module';
import { TabsModule } from '../../components/tabs/tabs.module';
import { DirectiveModule } from '../../directives/directives.module';
@NgModule({
    imports: [
        RouterModule.forChild(DelayRoutes),
        CommonModule,
        FormsModule,
        TitleModule,
        FilterModule,
        LoadMoreModule,
        SearchBoxModule,
        TabsModule,
        DirectiveModule,
    ],
    declarations: [
        DelayComponent,
        DeliverDelayComponent,
        CriticalEventDelayComponent,
        ProcessDelayComponent,
        EventDelayEditComponent,
        MaterialDelayComponent,
        StartDelayComponent,
    ],
    exports: [RouterModule]
})
export class DelayModule { }
