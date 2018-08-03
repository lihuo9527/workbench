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
    public language;
    public title;
    public state;
    public date;
    public total;
    public total2;
    public dayAmount;
    public loading: boolean = false;
    public Plan = { "msg": "", "result": { "sumBackFactory": "", "dayCount": "", "canDayCount": "", "supplier": "", "produceTime": "", "recording": [], "startTime": "", "totalCount": "", "sumOutgoingCount": "" }, "status": "" };
    public message = {
        state: false,
        btnText: "OK",
        msg: ""
    }
    public amount;
    public texts = ["请填写完整信息！", "录入成功!", "修改成功！"];
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.datas = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.title = this.datas.title;
        this.data = this.datas.data;
        console.log(this.datas);
        this.date = this.language == "cn" ? "请选择开始时间" : "Select start date";
        this.amount = this.language == "cn" ? "总数量" : "Total";
        this.getPlan();
        if (this.language == "en") {
            this.texts[0] = "Please fill in the complete information";
            this.texts[1] = "Successful entry";
            this.texts[2] = "Successfully modified";
        }
    }
    getPlan() {
        if (this.data.plan == 'Yes') {
            this.service.http_get('/api/OuterFactory/ShowPlan?planId=' + this.data.planId, false).subscribe((data: any) => {
                if (data.msg == "success") {
                    this.Plan = data;
                }
                let totaloutgoing: number = 0;
                let totalreturn: number = 0;
                if (this.Plan.result.recording.length > 0) {
                    this.Plan.result.recording.forEach(element => {
                        totaloutgoing += Number(element.outgoingCount);
                        totalreturn += Number(element.backFactory);
                    });
                    if (!totaloutgoing) totaloutgoing = 0;
                    if (!totalreturn) totalreturn = 0;
                    this.Plan.result.recording.push({
                        date: this.amount,
                        outgoingCount: totaloutgoing,
                        backFactory: totalreturn,
                        reduce: totalreturn - totaloutgoing
                    })
                }

                console.log(data)
            })
        }
    }
    next() {
        if (this.total > 0 && this.dayAmount > 0 && parseInt(this.date) > 0) {
            this.router.navigate(['/out/selectingSuppliers', JSON.stringify({ total: this.total, date: this.date, dayAmount: this.dayAmount, code: this.data.code, styleNo: this.data.pattern })])
        } else {
            this.service.messageBox(this.message, this.texts[0])
        }
    }
    submit() {
        if (this.total > 0 && parseInt(this.date) > 0) {
            let option = "totalCount=" + this.total + "&startTime=" + this.date + "&code=" + this.data.code + "&planId=" + this.data.planId;
            this.loading = true;
            this.service.http_post("/api/OuterFactory/EntryDayOutSchedule", option, false, "form").subscribe((data: any) => {
                this.loading = false;
                if (data.msg == "success") {
                    this.getPlan();
                    this.service.messageBox(this.message, this.texts[1])
                }
            }, error => {
                this.loading = false;
            })
        } else {
            this.service.messageBox(this.message, this.texts[0]);
        }
    }
    backDate($event) {
        let obj = JSON.parse($event);
        if (obj.date) {
            this.date = obj.date;
        }
        this.state = false;
    }
    change(item) {
        let state = item.isEnd == 0 ? 1 : 0;
        let option = 'planId=' + item.planId + "&status=" + state;
        this.loading = true;
        this.service.http_post('/api/OuterFactory/ModifyPlanStatus', option, false, "form").subscribe((data: any) => {
            this.loading = false;
            item.isEnd = state;
            this.service.messageBox(this.message, this.texts[2]);
            console.log(this.data)
        }, error => {
            this.loading = false;
        })
    }

}
