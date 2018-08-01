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
    public title;
    ngOnInit() {
        localStorage.setItem("filter", JSON.stringify({ input: '' }));
        this.language = localStorage.getItem("language");
        this.id = this.routerIonfo.snapshot.params["id"] == "all" ? "-1" : this.routerIonfo.snapshot.params["id"];
        this.title = this.language == "en" ? "Critical Event Delay" : "关键事件延误";
        this.updateList('init');
    }
    updateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4' + '&eventId=' + this.id;
        let object = $event == 'add' || $event == 'search' || $event == 'init' ? local : $event;
        if (object.fids) option += '&fids=' + object.fids;
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
    enterEdit(item) {
        this.service.routerLink(['/delay/delayEdit', JSON.stringify({type:"critical", title: this.title, data: item })]);
    }
}
