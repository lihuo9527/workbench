import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
    @Output() public outputValue: EventEmitter<any> = new EventEmitter<any>();//事件输出input框的内容
    constructor() { }
    public placeholder;
    public Language;
    public filter;
    public show: boolean;
    public input;
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
    blur() {
        let obj = JSON.parse(localStorage.getItem("filter"));
        obj.input = this.input
        localStorage.setItem("filter", JSON.stringify(obj));
    }
    output() {
        this.outputValue.emit(this.input)
    }
    showFilter() {
        //filter过渡动漫
        document.getElementById("shadow").style.left = "0%";
        document.getElementById("filter").style.left = "0%";
    }
}
