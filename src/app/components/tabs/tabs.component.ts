import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
    @Input() public tabs: any = [];// tabs格式： { text: "Urgency", show: false, link: "/deliverDelay" } ;
    @Output() public indexchange: EventEmitter<number> = new EventEmitter<number>();//输出一个事件返回当前tabs的index;

    constructor() { }

    ngOnInit() {
    }
    indexChange(i) {
        this.indexchange.emit(i);
    }
}
