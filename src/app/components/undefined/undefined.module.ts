import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UndefinedComponent } from './undefined.component';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        UndefinedComponent
    ],
    exports: [
        CommonModule,
        UndefinedComponent,
    ]
})
export class UndefinedModule { }
