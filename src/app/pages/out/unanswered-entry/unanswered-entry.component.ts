import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-unanswered-entry',
    templateUrl: './unanswered-entry.component.html',
    styleUrls: ['./unanswered-entry.component.css']
})
export class UnansweredEntryComponent implements OnInit {
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
    public Plan = { "msg": "", "result": { "sumBackFactory": "", "dayCount": "", "canDayCount": "", "supplier": "", "produceTime": "", "recording": [], "startTime": "", "totalCount": "", "sumOutgoingCount": "" }, "status": "" };
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.datas = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.title = this.datas.title + " Entry";
        this.data = this.datas.data;
        console.log(this.datas);
    }
    submit() {
        if (this.total > 0 && parseInt(this.date) > 0) {
            let option = "dayCount=" + this.total + "&startTime=" + this.date  + "&planId=" + this.data.planId
            this.service.http_post("/api/OuterFactory/UnansweredPlanEntry ", option, false, "form").subscribe((data: any) => {
                if (data.msg == "success") {
                    this.data.date = data.result.planReply.date;
                    this.data.count = data.result.planReply.count;
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
