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
        private routerIonfo: ActivatedRoute, ) { }
    public Language;
    public data;
    public list;
    public DateState = false;
    public DateName;
    public index;
    ngOnInit() {
        this.data = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.Language = localStorage.getItem("language");
        console.log(this.data)
        this.service.http_get('/api/Schedule/GetPoEvents?poId=' + this.data.id, false).subscribe((data:any) => {
            if (data.length > 0) this.list = data;
        })
    }
    Save() {
        let data = {
            "PoId": this.data.id,
            "Events": []
        };
        for (let i = 0; i < this.list.length; i++) {
            let json = {};
            json["EventId"] = this.list[i].id;
            json["ExpectTime"] = this.list[i].startdate;
            json["EndTime"] = this.list[i].enddate;
            data.Events.push(json);
        }
        this.service.http_post('/api/Schedule/UpdateEventsDate', data, false).subscribe((data:any) => {
            console.log(data);
        })
    }
    GetDate($event) {
        console.log($event)
        this.DateState = false;
        if ($event != "false") {
            let obj = JSON.parse($event);
            this.list[this.index][obj.name] = obj.date;
            this.list[this.index][obj.name] = obj.date;
        }
    }
    ShowDate(i, event) {
        this.index = i;
        this.DateName = event;
        this.DateState = true;
    }
}
