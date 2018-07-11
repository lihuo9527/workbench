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
    public language;
    public state;
    public type;
    ngOnInit() {
        localStorage.setItem("filter", JSON.stringify({ input: '' }));
        this.language = localStorage.getItem("language");
        this.id = this.routerIonfo.snapshot.params["id"] == "all" ? "-1" : this.routerIonfo.snapshot.params["id"];
        this.updateList();
    }
    updateList($event?) {
        if (this.type == 2 && $event == 'add') return;
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4' + '&eventId=' + this.id;
        if ($event && $event.fids) option += '&fids=' + $event.fids;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/TaskWarn/GetDetailEventDelay?' + option, false).subscribe((data: any) => {
            this.type = data.length > 0 ? 1 : 2;
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
