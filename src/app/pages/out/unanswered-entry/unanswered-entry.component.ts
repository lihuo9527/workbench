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
    public language;
    public title;
    public state;
    public date;
    public total;
    public total2;
    public dayAmount;
    public message = {
        state: false,
        btnText: "OK",
        msg: ""
    };
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.datas = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.title = this.language == "en" ? this.datas.title + " Entry" : this.datas.title + "录入";
        this.date = this.language == "en" ? "Select start date" : "选择开始日期";
        this.data = this.datas.data;
        console.log(this.datas);
    }
    submit() {
        if (this.total > 0 && parseInt(this.date) > 0) {
            let option = "dayCount=" + this.total + "&startTime=" + this.date + "&planId=" + this.data.planId
            this.service.http_post("/api/OuterFactory/UnansweredPlanEntry ", option, false, "form").subscribe((data: any) => {
                if (data.msg == "success") {
                    this.data.date = data.result.planReply.date;
                    this.data.count = data.result.planReply.count;
                    this.service.messageBox(this.message, "录入成功!");
                }
            })
        } else {
            this.service.messageBox(this.message, "请填写完整信息再提交！")
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
