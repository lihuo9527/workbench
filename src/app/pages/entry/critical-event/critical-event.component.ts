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
    public Language;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.UpdateList();

    }
    UpdateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = local.input ? 1 : this.datas.length / 4 + 1;
        let option = "";
        if ($event) {
            option = 'pageIndex=' + pageIndex + '&pageSize=4&star=' + $event.start + '&end=' + $event.end;
            if ($event.fids) option += '&fids=' + $event.fids;
            if ($event.wsids) option += '&wsids=' + $event.wsids;
            if ($event.eventid) option += '&eventid=' + $event.eventid;
            if ($event.dateType >= 0) option += '&dateType=' + $event.dateType;
        } else {
            option = 'pageIndex=' + pageIndex + '&pageSize=4&star=' + local.start + '&end=' + local.end
            if (local.fids) option += '&fids=' + local.fids;
            if (local.wsids) option += '&wsids=' + local.wsids;
            if (local.eventid) option += '&eventid=' + local.eventid;
            if (local.dateType >= 0) option += '&dateType=' + local.dateType;
        }
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/Schedule/GetEventPoes?' + option, false).subscribe((data: any) => {
            if ($event || local.input) {
                this.datas = data;
            } else {
                let obj = data;
                if (obj.length > 0) {
                    for (let i = 0; i < obj.length; i++) {
                        this.datas.push(obj[i]);
                    }
                }
            }

        })
    }
    Link(item) {
        console.log(item);
        this.router.navigate(["eventEntry", JSON.stringify(item)]);
    }
}
