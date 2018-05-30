import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
    @Input() public tabs: any = [];
    @Output() public indexchange: EventEmitter<number> = new EventEmitter<number>();

    constructor() { }

    ngOnInit() {
    }
    indexChange(i) {
        this.indexchange.emit(i);
    }
}
