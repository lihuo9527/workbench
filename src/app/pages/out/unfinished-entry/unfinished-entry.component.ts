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
    public language;
    public title;
    public state;
    public date: string;
    public total;
    public total2;
    public dayAmount;
    public amount: string;
    public loading: boolean = false;
    public Plan = { "msg": "", "result": { "sumBackFactory": "", "dayCount": "", "canDayCount": "", "supplier": "", "produceTime": "", "listInfo": [], "startTime": "", "totalCount": "", "sumOutgoingCount": "" }, "status": "" };
    public message = {
        state: false,
        btnText: "OK",
        msg: ""
    };
    public texts = ["请填写完整信息再提交！", "录入成功！"];
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.datas = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.title = this.language == "en" ? this.datas.title + " Entry" : this.datas.title + "录入";
        this.date = this.language == "en" ? "Select start date" : "选择开始日期";
        this.amount = this.language == "cn" ? "总数量" : "Total";
        this.data = this.datas.data;
        console.log(this.datas);
        this.getPlan();
        if (this.language == "en") {
            this.texts[0] = "Please fill in the complete information";
            this.texts[1] = "Successful entry";
        }
    }
    //获取计划数量详情
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
            if (!totaloutgoing) totaloutgoing = 0;
            if (!totalreturn) totalreturn = 0;
            this.Plan.result.listInfo.push({
                date: this.amount,
                receiveCount: totaloutgoing,
                issueCount: totalreturn,
                reduce: totalreturn - totaloutgoing
            })
            console.log(data)
        })
    }
    //未完成计划录入
    submit() {
        if (this.total > 0 && parseInt(this.date) > 0) {
            let option = "count=" + this.total + "&outTime=" + this.date + "&planId=" + this.data.planId;
            this.loading = true;
            this.service.http_post("/api/OuterFactory/UndonePlanEntry", option, false, "form").subscribe((data: any) => {
                this.loading = false;
                if (data.msg == "success") {
                    this.getPlan();
                    this.service.messageBox(this.message, this.texts[1])
                }
            }, error => {
                this.loading = false;
            })
        } else {
            this.service.messageBox(this.message, this.texts[0])
        }
    }
    //日历组件回调事件
    backDate($event) {
        let obj = JSON.parse($event);
        if (obj.date) {
            this.date = obj.date;
        }
        this.state = false;
    }
}
