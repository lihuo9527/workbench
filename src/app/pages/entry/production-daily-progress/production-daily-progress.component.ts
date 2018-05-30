import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-production-daily-progress',
    templateUrl: './production-daily-progress.component.html',
    styleUrls: ['./production-daily-progress.component.css']
})
export class ProductionDailyProgressComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute, private router: Router) { }
    public eventId = "-1";
    public datas = [];
    public id;
    public Language;
    public state = true;
    public navigations = [];
    public start;
    public end;
    public filter;

    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.id = this.routerIonfo.snapshot.params["id"];
        this.id == "all" ? this.eventId = "-1" : this.eventId = this.id;
        console.log("id:" + this.id);
    }
    UpdateList() {
        let pageIndex = this.datas.length / 4 + 1;
        this.service.http_get('/api/Schedule/GetPlanPoes?pageIndex=' + pageIndex + '&pageSize=4&star=' + this.start + '&end=' + this.end, false).subscribe((data:any) => {
            let obj = data;
            if (obj.length > 0) {
                for (let i = 0; i < obj.length; i++) {
                    this.datas.push(obj[i]);
                }
            }
        })
    }
    Complete($event) {
        this.start = $event.StartDate;
        this.end = $event.EndDate;
        console.log("收到" + $event);
        this.service.http_get('/api/Schedule/GetPlanPoes?pageIndex=1&pageSize=4' +
            // '&fids=' + $event.fids + '&wsids=' +  $event.wsids+ 
            // '&eventid=' +  $event.eventid+ 
            '&star=' + $event.StartDate + '&end=' + $event.EndDate, false).subscribe((data:any) => {
                let obj = data;
                if (obj.length > 0) {
                    this.datas = [{
                        "ProductionEventID": 4357, "LineID": 4, "LineName": "T02组",
                        "StartTime": "2018-03-22T08:00:00", "id": 1084, "code": "D03NIK0438", "customerid": 5,
                        "customername": "高尔夫巡回赛", "deliverydate": "2018-04-13T00:00:00",
                        "initDeliveryDate": null, "producttype": "POLO-有领上衣-TP3", "pattern": "s/330239",
                        "amount": 7375.0, "priority": 8,
                        "merchandiser": "YUANHONG", "StarDate": "2018-03-22T08:00:00", "EndDate": "2018-03-22T08:00:00", "CompleteAmount": 0.0
                    }]
                    this.state = false;
                }
            })
    }
    Link(item) {
        console.log(item);
        item["Pid"] = "progress";
        this.router.navigate(['scheduleEntry', JSON.stringify(item)])
    }
}
