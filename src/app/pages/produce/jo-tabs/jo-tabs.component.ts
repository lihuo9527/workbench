import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-jo-tabs',
    templateUrl: './jo-tabs.component.html',
    styleUrls: ['./jo-tabs.component.css']
})
export class JoTabsComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute, private router: Router) { }
    public Language;
    public tabs = [
        { text: "生产单信息", text2: "JO Details", show: false },
        { text: "关键事件", text2: "Critical Event", show: false },
        { text: "WIP", text2: "WIP", show: false }];
    public data;
    public sizelist;
    public eventlist;

    ngOnInit() {
        this.data = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.Language = localStorage.getItem("language");
        this.ShowIndex(0);
    }
    ShowIndex(index) {
        console.log(index);
        for (let i = 0; i < this.tabs.length; i++) {
            if (i == index) {
                this.tabs[i].show = true;
            } else {
                this.tabs[i].show = false;
            }
        }
        if (index == 0) {
            this.service.http_get('/api/ReportPoProgress/GetPlanScheduleData?poid=' + this.data.id + "&planId=" + this.data.ProductionEventID, false).subscribe((data:any) => {
                this.sizelist = data;
                console.log(data)

            })
        }
        if (index == 1) {
            this.service.http_get('/api/ReportPoProgress/GetPoEvents?poid=' + this.data.id, false).subscribe((data:any) => {
                this.eventlist = data;
                console.log(data)

            })
        }

    }
}
