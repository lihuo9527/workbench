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
    public loading: boolean = false;
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
        this.data = this.datas.data;
        console.log(this.datas);
        if (this.language == "en") {
            this.texts[0] = "Please fill in the complete information";
            this.texts[1] = "Successful entry";
        }
    }
    submit() {
        if (this.total > 0 && parseInt(this.date) > 0) {
            let option = "dayCount=" + this.total + "&startTime=" + this.date + "&planId=" + this.data.planId;
            this.loading = true;
            this.service.http_post("/api/OuterFactory/UnansweredPlanEntry ", option, false, "form").subscribe((data: any) => {
                this.loading = false;
                if (data.msg == "success") {
                    this.data.date = data.result.planReply.date;
                    this.data.count = data.result.planReply.count;
                    this.service.messageBox(this.message, this.texts[1]);
                }
            }, error => {
                this.loading = false;
            })
        } else {
            this.service.messageBox(this.message, this.texts[0])
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
