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
    public datas: any = [];
    public colors = [];
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
        this.updateList();
        this.service.http_get('/api/Capacity/GetCapacityColorTip', false).subscribe((data: any) => {
            this.colors = data;
            this.colors.push({ Color: "#ab5e5e", Name: "TotalLoading", Remark: "总负载" })
        })
    }
    //日历回调事件
    backDate($event) {
        let obj = JSON.parse($event);
        console.log($event);

        if (obj.date) {
            this.date = obj.date;
        }
        this.state = false;
    }
    //初始化-筛选
    updateList($event?) {
        let option = $event ? `starDate=${this.date}&capIncOut=${$event.capIncOut}
        &loadingIncOut=${$event.loadingIncOut}&timeSpan=${$event.cycle}&timeType=${$event.cycleType}
        &unitType=${$event.unitType}` : `starDate=${this.date}&capIncOut=1&loadingIncOut=1&timeSpan=3&timeType=0&unitType=0`;
        if ($event && $event.fids) option += `&fids=${$event.fids}`;
        this.service.http_get(`/api/Capacity/GetCapacity?${option}`, false).subscribe((data: any) => {
            this.datas = data;
        });
    }
    //filter过渡动漫
    showFilter() {
        document.getElementById("shadow").style.left = "0%";
        document.getElementById("filter").style.left = "0%";
    }
}
