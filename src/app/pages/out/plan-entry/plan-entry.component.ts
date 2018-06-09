import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-plan-entry',
    templateUrl: './plan-entry.component.html',
    styleUrls: ['./plan-entry.component.css']
})
export class PlanEntryComponent implements OnInit {

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
    public Plan = {"msg": "", "result": { "sumBackFactory": "", "dayCount": "", "canDayCount": "", "supplier": "", "produceTime": "", "recording": [], "startTime": "", "totalCount": "", "sumOutgoingCount": ""}, "status":""};
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.datas = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.title = this.datas.title;
        this.data = this.datas.data;
        console.log(this.datas);
        this.getPlan();

    }
    getPlan() {
        if (this.data.plan == 'Yes') {
            this.service.http_get('/api/OuterFactory/ShowPlan?planId=' + this.data.planId, false).subscribe((data: any) => {
                if (data.msg == "success") {
                    this.Plan = data;
                }
                let totaloutgoing: number = 0;
                let totalreturn: number = 0;
                this.Plan.result.recording.forEach(element => {
                    totaloutgoing += Number(element.outgoingCount);
                    totalreturn += Number(element.backFactory);
                });
                this.Plan.result.recording.push({
                    date: "Total",
                    outgoingCount: totaloutgoing,
                    backFactory: totalreturn,
                    reduce: "-" + (totaloutgoing - totalreturn)
                })
                console.log(data)
            })
        }
    }
    next() {
        if (this.total > 0 && this.dayAmount > 0 && parseInt(this.date) > 0) {
            this.router.navigate(['selectingSuppliers', JSON.stringify({ total: this.total, date: this.date, dayAmount: this.dayAmount, code: this.data.code })])
        } else {
            alert("请填写完整信息！")
        }
    }
    submit() {
        if (this.total > 0 && parseInt(this.date) > 0) {
            let option = "totalCount=" + this.total + "&startTime=" + this.date + "&code=" + this.data.code + "&planId=" + this.data.planId
            this.service.http_post("/api/OuterFactory/EntryDayOutSchedule", option, false, "form").subscribe((data: any) => {
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
