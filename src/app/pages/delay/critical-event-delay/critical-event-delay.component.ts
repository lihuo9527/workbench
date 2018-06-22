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
        localStorage.setItem("filter", JSON.stringify({ input: '' }));
        this.Language = localStorage.getItem("language");
        this.id = this.routerIonfo.snapshot.params["id"];
        this.id == "all" ? this.eventId = "-1" : this.eventId = this.id;
        this.UpdateList();
    }
    UpdateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4';;
        if ($event) {
            if ($event.fids) option += '&fids=' + $event.fids;
        }
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/TaskWarn/GetDetailEventDelay?' + option, false).subscribe((data: any) => {
            if ($event != 'add') {
                this.datas = data;
            } else {
                data.forEach(element => {
                    this.datas.push(element);
                });
            }
        })
    }
}
