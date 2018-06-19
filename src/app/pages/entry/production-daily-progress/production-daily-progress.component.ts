import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-production-daily-progress',
    templateUrl: './production-daily-progress.component.html',
    styleUrls: ['./production-daily-progress.component.css']
})
export class ProductionDailyProgressComponent implements OnInit {

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
            option = 'pageIndex=' + pageIndex + '&pageSize=4&star=' + $event.StartDate + '&end=' + $event.EndDate;
            if ($event.fids) option += '&fids=' + $event.fids;
            if ($event.wsids) option += '&wsids=' + $event.wsids;
            if ($event.eventid) option += '&eventid=' + $event.eventid;
        } else {
            option = 'pageIndex=' + pageIndex + '&pageSize=4&star=' + local.start + '&end=' + local.end
        }
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/Schedule/GetPlanPoes?' + option, false).subscribe((data: any) => {
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
        item["Pid"] = "progress";
        this.router.navigate(['scheduleEntry', JSON.stringify(item)])
    }
}
