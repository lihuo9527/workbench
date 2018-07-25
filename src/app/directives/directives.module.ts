import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownUpdateDirective } from '../directives/down-update/down-update.directive';
@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        DownUpdateDirective
    ],
    exports: [
        CommonModule,
        DownUpdateDirective,
    ],
})
export class DirectiveModule { }
