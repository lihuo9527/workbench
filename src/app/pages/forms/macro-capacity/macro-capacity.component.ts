import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-macro-capacity',
    templateUrl: './macro-capacity.component.html',
    styleUrls: ['./macro-capacity.component.css']
})
export class MacroCapacityComponent implements OnInit {
    public language;
    public input;
    public filter;
    public placeholder;
    public state;
    public date = new Date().toLocaleDateString();
    public datas: any = [
        {
            factoryName: "RunXing Factory",
            list: [
                { month: "2018.01", typeA: [10, 20, 30], typeB: [21, 31, 41] },
                { month: "2018.02", typeA: [1, 2, 7], typeB: [2, 3, 10] },
                { month: "2018.03", typeA: [9, 1, 3], typeB: [2, 3, 4] },
                { month: "2018.04", typeA: [9, 1, 3], typeB: [2, 3, 4] }
            ]
        },
        {
            factoryName: "Factory",
            list: [
                { month: "2018.01", typeA: [10, 20, 30], typeB: [21, 31, 41] },
                { month: "2018.02", typeA: [1, 2, 7], typeB: [2, 3, 10] },
                { month: "2018.03", typeA: [9, 1, 3], typeB: [2, 3, 4] }
            ]
        }
    ]
    constructor(private service: AppService) { }
    ngOnInit() {
        this.language = localStorage.getItem("language");
        if (this.language == "cn") {
            this.filter = "筛选";
            this.placeholder = "输入单号或款号查询";
        }
        if (this.language == "en") {
            this.filter = "filter";
            this.placeholder = "input number or style to query";
        }
        // this.service.
    }

    backDate($event) {
        let obj = JSON.parse($event);
        console.log($event);

        if (obj.date) {
            this.date = obj.date;
        }
        this.state = false;
    }
    updateList($event) {
        console.log($event);
    }
    output() {
    }
    showFilter() {
        //filter过渡动漫
        document.getElementById("shadow").style.left = "0%";
        document.getElementById("filter").style.left = "0%";
    }
}
