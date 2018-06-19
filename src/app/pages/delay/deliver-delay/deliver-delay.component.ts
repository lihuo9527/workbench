import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { UnhandledAlertError } from 'selenium-webdriver';
@Component({
    selector: 'app-deliver-delay',
    templateUrl: './deliver-delay.component.html',
    styleUrls: ['./deliver-delay.component.css']
})
export class DeliverDelayComponent implements OnInit {

    constructor(private routerIonfo: ActivatedRoute,
        private router: Router,
        private service: AppService, ) { }
    public tabs = [
        { text: "Urgency", show: false, link: "/deliverDelay" },
        { text: "Important", show: false, link: "/deliverDelay" },
        { text: "General", show: false, link: "/deliverDelay" }
    ];
    public datas: any = [
        //  {CustomerName:"luyixuelai",PoCode:"1317403280",StartTime:"2017-08-06",pattern:"BC322393",DelayDays:"3",FactoryDelivery:"2017-08-06",DeliveryDate:"2017-09-12"},
        //  {CustomerName:"luyixuelai",PoCode:"1317403280",StartTime:"2017-08-06",pattern:"BC322393",DelayDays:"3",FactoryDelivery:"2017-08-06",DeliveryDate:"2017-09-12"},
        //  {CustomerName:"luyixuelai",PoCode:"1317403280",StartTime:"2017-08-06",pattern:"BC322393",DelayDays:"3",FactoryDelivery:"2017-08-06",DeliveryDate:"2017-09-12"},
        //  {CustomerName:"luyixuelai",PoCode:"1317403280",StartTime:"2017-08-06",pattern:"BC322393",DelayDays:"3",FactoryDelivery:"2017-08-06",DeliveryDate:"2017-09-12"}
    ];
    public id;
    public Language;
    public Link;
    public state;
    ngOnInit() {
        console.log(this.service.get_params());
        console.log('进入')
        let navid;
        this.Link = this.routerIonfo.snapshot.params["id"] == "all" ? ['/all', "3"] : ['/home'];
        navid = this.routerIonfo.snapshot.params["id"] != "all" ? this.routerIonfo.snapshot.params["id"] : "0";
        this.Language = localStorage.getItem("language");
        if (this.Language == "cn") {
            this.tabs[0].text = "紧急";
            this.tabs[1].text = "重要";
            this.tabs[2].text = "普通";
        }
        this.showIndex(navid);
    }
    getList(index?) {
        console.log(index);
        if (index != undefined) {
            if (index == "0") this.id = "6";
            if (index == "1") this.id = "8";
            if (index == "2") this.id = "10";
        }
        let pageIndex = Math.ceil(this.datas.length / 4 + 1);
        this.service.http_get('/api/TaskWarn/GetDetailDeliveryDelay?pageIndex=' + pageIndex + '&pageSize=4&fids=1&priority=' + this.id, false).subscribe((data:any) => {
            if (index != undefined) {
                if (data.length > 0) this.datas = data;
            } else {
                this.service.up_date(this.datas, data);
            }

        })
    }
    showIndex(index) {
        for (let i = 0; i < this.tabs.length; i++) {
            if (i == index) {
                this.tabs[i].show = true;
            } else {
                this.tabs[i].show = false;
            }
        }
        this.datas = [];
        this.getList(index);
    }
    search(){

    }
    enterEdit(i) {
        this.router.navigate(['/eventDelayEdit', JSON.stringify(this.datas[i])]);
        console.log(this.datas[i]);
    }
}
