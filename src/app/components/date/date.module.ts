import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateComponent } from './date.component';
import { MessageBoxModule } from '../../components/message-box/message-box.module';


@NgModule({
    imports: [
        CommonModule,
        MessageBoxModule,
    ],
    declarations: [
        DateComponent
    ],
    exports: [
        DateComponent,

    ]
})
export class DateModule { }
