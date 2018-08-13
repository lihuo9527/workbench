import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { UnhandledAlertError } from 'selenium-webdriver';
@Component({
    selector: 'app-deliver-delay',
    templateUrl: './deliver-delay.component.html',
    styleUrls: ['./deliver-delay.component.css']
})
export class DeliverDelayComponent implements OnInit {

    constructor(
        private routerIonfo: ActivatedRoute,
        private service: AppService, ) { }
    public tabs = [
        { text: "General", show: false, link: "/delay/deliverDelay" },
        { text: "Important", show: false, link: "/delay/deliverDelay" },
        { text: "Urgency", show: false, link: "/delay/deliverDelay" }
    ];
    public datas: any = [];
    public id;
    public language;
    public link;
    public state;
    public index;
    public type;
    public title;
    ngOnInit() {
        localStorage.setItem("filter", JSON.stringify({ input: '' }));
        let navid;
        this.link = this.routerIonfo.snapshot.params["id"] == "all" ? ['/all'] : ['/home'];
        navid = this.routerIonfo.snapshot.params["id"] != "all" ? this.routerIonfo.snapshot.params["id"] : "0";
        this.language = localStorage.getItem("language");
        this.title = this.language == "en" ? "Delivery Delay" : "交期延误订单";
        if (this.language == "cn") {
            this.tabs[0].text = "普通";
            this.tabs[1].text = "重要";
            this.tabs[2].text = "紧急";
        }
        console.log(this.link);
        this.showIndex(navid);
    }
   //初始化-筛选-搜索-查看更多
    updateList($event?) {
        if (this.index != undefined) {
            if (this.index == "0") this.id = "6";
            if (this.index == "1") this.id = "8";
            if (this.index == "2") this.id = "10";
        }
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let object = $event == 'add' || $event == 'search' || $event == 'init' ? local : $event;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4' + '&priority=' + this.id;
        if (object.fids) option += '&fids=' + object.fids;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/TaskWarn/GetDetailDeliveryDelay?' + option, false).subscribe((data: any) => {
            this.type = data.length > 0 ? 1 : 2;
            if ($event != 'add') {
                this.datas = data;
            } else {
                data.forEach(element => {
                    this.datas.push(element);
                });
            }
        })
    }
    //选择tabs
    showIndex(index) {
        for (let i = 0; i < this.tabs.length; i++) {
            if (i == index) {
                this.tabs[i].show = true;
            } else {
                this.tabs[i].show = false;
            }
        }
        this.datas = [];
        this.index = index;
        this.updateList('init');
    }
    //进入详情页面
    enterEdit(item) {
        this.service.routerLink(['/delay/delayEdit', JSON.stringify({type:"deliver", title: this.title, data: item })]);
    }
}
