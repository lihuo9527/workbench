import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
    @Output() public getstate: EventEmitter<any> = new EventEmitter<any>();
    constructor() { }
    public placeholder;
    public Language;
    public filter;
    public show: boolean;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        if (this.Language == "cn") {
            this.filter = "筛选";
            this.placeholder = "输入单号或款号查询";
        }
        if (this.Language == "en") {
            this.filter = "filter";
            this.placeholder = "input number or style to query";
        }
    }
    ShowFilter() {
        this.getstate.emit(!this.show)
    }
}
