import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-production-daily-progress',
    templateUrl: './production-daily-progress.component.html',
    styleUrls: ['./production-daily-progress.component.css']
})
//每日进度
export class ProductionDailyProgressComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute, private router: Router) { }
    public datas = [];
    public language;
    public type;
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.updateList('init');
    }
    updateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let object = $event == 'add' || $event == 'search' || $event == 'init' ? local : $event;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4&planTime=' + object.start;
        if (object.fids) option += '&fids=' + object.fids;
        if (object.wsids) option += '&wsids=' + object.wsids;
        if (object.styles) option += '&productTypeIds=' + object.styles;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/Schedule/GetPlanPoes?' + option, false).subscribe((data: any) => {
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
    link(item) {
        console.log(item);
        item["Pid"] = "progress";
        this.router.navigate(['/entry/scheduleEntry', JSON.stringify(item)])
    }
}
