import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-event-entry',
    templateUrl: './event-entry.component.html',
    styleUrls: ['./event-entry.component.css']
})
export class EventEntryComponent implements OnInit {

    constructor(
        private service: AppService,
        private routerIonfo: ActivatedRoute,
    ) { }
    public language;
    public data;
    public list;
    public DateState = false;
    public DateName;
    public index;
    public state = false;
    public message = {
        state: false,
        btnText: "OK",
        msg: ""
    }
    ngOnInit() {
        this.data = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.language = localStorage.getItem("language");
        console.log(this.data)
        this.service.http_get('/api/Schedule/GetPoEvents?poId=' + this.data.id, false).subscribe((data: any) => {
            if (data.length > 0) this.list = data;
        })
    }
    Save() {
        let data = {
            "PoId": this.data.id,
            "Events": []
        };
        this.list.forEach(element => {
            let json = {};
            json["EventFlowNodeId"] = element.eventflownodeid;
            json["ExpectTime"] = element.startdate;
            json["EndTime"] = element.enddate;
            data.Events.push(json);
        });
        this.service.http_post('/api/Schedule/UpdateEventsDate', data, false).subscribe((data: any) => {
            if (data.IsSuccess == 1) {
                this.service.messageBox(this.message, "保存成功！");
            } else {
                this.service.messageBox(this.message, data.ErrMessage);
            }
            console.log(data);
        }, error => {
            this.service.messageBox(this.message, "保存失败！");
        })
    }
    backDate($event) {
        let obj = JSON.parse($event);
        if (obj.date) {
            this.list[this.index][this.DateName] = obj.date;
        }
        this.state = false;
    }
    ShowDate(i, event) {
        this.state = true;
        this.index = i;
        this.DateName = event;
    }
}
