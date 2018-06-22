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
    public datas: any = [];
    public id;
    public Language;
    public Link;
    public state;
    public index;
    ngOnInit() {
        localStorage.setItem("filter",JSON.stringify({input:''}));
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

    UpdateList($event?) {
        if (this.index != undefined) {
            if (this.index == "0") this.id = "6";
            if (this.index == "1") this.id = "8";
            if (this.index == "2") this.id = "10";
        }
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4' + '&priority=' + this.id;
        if ($event) {
            if ($event.fids) option += '&fids=' + $event.fids;
        }
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/TaskWarn/GetDetailDeliveryDelay?' + option, false).subscribe((data: any) => {
            if ($event != 'add') {
                this.datas = data;
            } else {
                data.forEach(element => {
                    this.datas.push(element);
              });
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
        this.index = index;
        this.UpdateList();
    }
    enterEdit(i) {
        this.router.navigate(['/eventDelayEdit', JSON.stringify(this.datas[i])]);
        console.log(this.datas[i]);
    }
}
