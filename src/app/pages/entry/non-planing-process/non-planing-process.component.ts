import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-non-planing-process',
    templateUrl: './non-planing-process.component.html',
    styleUrls: ['./non-planing-process.component.css']
})
//非排产工序
export class NonPlaningProcessComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute, private router: Router) { }
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
            if ($event.process) option += '&processid=' + $event.process;
            if ($event.dateType >= 0) option += '&dateType=' + $event.dateType;
        } else {
            option = 'pageIndex=' + pageIndex + '&pageSize=4&star=' + local.start + '&end=' + local.end
            if (local.fids) option += '&fids=' + local.fids;
            if (local.wsids) option += '&wsids=' + local.wsids;
            if (local.process) option += '&processid=' + local.process;
            if (local.dateType >= 0) option += '&dateType=' + local.dateType;
        }
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/Schedule/GetProcessPoes?' + option, false).subscribe((data: any) => {
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
        item["Pid"] = "non-process";
        this.router.navigate(['scheduleEntry', JSON.stringify(item)])
    }
}
