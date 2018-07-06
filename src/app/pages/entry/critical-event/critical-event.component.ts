import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-critical-event',
    templateUrl: './critical-event.component.html',
    styleUrls: ['./critical-event.component.css']
})
//关键事件
export class CriticalEventComponent implements OnInit {
    constructor(
        private service: AppService,
        private routerIonfo: ActivatedRoute,
        private router: Router,
    ) { }
    public datas = [];
    public language;
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.updateList('init');

    }
    updateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let object = $event == 'add' || $event == 'search' || $event == 'init' ? local : $event;
        let option = "";
        option = 'pageIndex=' + pageIndex + '&pageSize=4&star=' + object.start + '&end=' + object.end;
        if (object.fids) option += '&fids=' + object.fids;
        if (object.wsids) option += '&wsids=' + object.wsids;
        if (object.eventid) option += '&eventid=' + object.eventid;
        if (object.dateType >= 0) option += '&dateType=' + object.dateType;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/Schedule/GetEventPoes?' + option, false).subscribe((data: any) => {
            if ($event != 'add') {
                this.datas = data;
            } else {
                data.forEach(element => {
                    this.datas.push(element);
                });
            }
        })
    }
    link(item) {
        console.log(item);
        this.router.navigate(["eventEntry", JSON.stringify(item)]);
    }
}
