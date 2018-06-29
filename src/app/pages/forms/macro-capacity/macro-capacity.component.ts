import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-macro-capacity',
    templateUrl: './macro-capacity.component.html',
    styleUrls: ['./macro-capacity.component.css']
})
export class MacroCapacityComponent implements OnInit {
    public Language;
    public input;
    public filter;
    public placeholder;
    public state;
    public date = new Date().toLocaleDateString();
    constructor() { }
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

    backDate($event) {
        let obj = JSON.parse($event);
        if (obj.date) {
            this.date = obj.date;
        }
        this.state = false;
    }
    showFilter() {
        //filter过渡动漫
        document.getElementById("shadow").style.left = "0%";
        document.getElementById("filter").style.left = "0%";
    }
}