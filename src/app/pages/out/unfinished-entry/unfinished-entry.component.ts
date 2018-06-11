import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';

@Component({
    selector: 'app-unfinished-entry',
    templateUrl: './unfinished-entry.component.html',
    styleUrls: ['./unfinished-entry.component.css']
})
export class UnfinishedEntryComponent implements OnInit {

    constructor(private routerIonfo: ActivatedRoute, private service: AppService, private router: Router) { }
    public datas;
    public data;
    public Language;
    public title;
    public state;
    public date = "Select start date";
    public total;
    public total2;
    public dayAmount;
    public Plan = { "msg": "", "result": { "sumBackFactory": "", "dayCount": "", "canDayCount": "", "supplier": "", "produceTime": "", "listInfo": [], "startTime": "", "totalCount": "", "sumOutgoingCount": "" }, "status": "" };
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.datas = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.title = this.datas.title + " Entry";
        this.data = this.datas.data;
        console.log(this.datas);
        this.getPlan();

    }
    getPlan() {
        this.service.http_get('/api/OuterFactory/UndonePlanSubPlanList?planId=' + this.data.planId, false).subscribe((data: any) => {
            if (data.msg == "success") {
                this.Plan = data;
            }
            let totaloutgoing: number = 0;
            let totalreturn: number = 0;
            this.Plan.result.listInfo.forEach(element => {
                totaloutgoing += Number(element.receiveCount);
                totalreturn += Number(element.issueCount);
            });
            this.Plan.result.listInfo.push({
                date: "Total",
                receiveCount: totaloutgoing,
                issueCount: totalreturn,
                reduce: "-" + (totaloutgoing - totalreturn)
            })
            console.log(data)
        })
    }
    submit() {
        if (this.total > 0 && parseInt(this.date) > 0) {
            let option = "count=" + this.total + "&outTime=" + this.date  + "&planId=" + this.data.planId
            this.service.http_post("/api/OuterFactory/UndonePlanEntry", option, false, "form").subscribe((data: any) => {
                if (data.msg == "success") {
                    this.getPlan();
                    alert("录入成功")
                }
            })
        }
    }
    backDate($event) {
        let obj = JSON.parse($event);
        if (obj.date) {
            this.date = obj.date;
        }
        this.state = false;
    }
}
