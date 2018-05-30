import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-critical-event-delay',
    templateUrl: './critical-event-delay.component.html',
    styleUrls: ['./critical-event-delay.component.css']
})
export class CriticalEventDelayComponent implements OnInit {
    constructor(private service: AppService, private routerIonfo: ActivatedRoute, ) { }
    public eventId = "-1";
    public datas = [];
    public id;
    public Language;
    public state;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.id = this.routerIonfo.snapshot.params["id"];
        this.id == "all" ? this.eventId = "-1" : this.eventId = this.id;
        this.GetList(1);
    }

    GetList(index?) {
        let pageIndex = Math.ceil(this.datas.length / 4 + 1);
        this.service.http_get('/api/TaskWarn/GetDetailEventDelay?pageIndex=' + pageIndex + '&pageSize=4&fids=1&eventId=' + this.eventId, false).subscribe((data:any) => {
            if (index != undefined) {
                if(data.length > 0) this.datas = data;
            } else {
                this.service.up_date(this.datas, data);
            }
        })
    }
}
