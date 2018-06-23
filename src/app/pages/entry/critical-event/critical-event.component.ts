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
        let object = $event ? $event : local;
        option = 'pageIndex=' + pageIndex + '&pageSize=4&star=' + object.start + '&end=' + object.end
        if (object.fids) option += '&fids=' + object.fids;
        if (object.wsids) option += '&wsids=' + object.wsids;
        if (object.eventid) option += '&eventid=' + object.eventid;
        if (object.dateType >= 0) option += '&dateType=' + object.dateType;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/Schedule/GetEventPoes?' + option, false).subscribe((data: any) => {
            if ($event || local.input) {
                this.datas = data;
            } else {
                data.forEach(element => {
                    this.datas.push(element);
                });
            }
        })
    }
    Link(item) {
        console.log(item);
        this.router.navigate(["eventEntry", JSON.stringify(item)]);
    }
}
