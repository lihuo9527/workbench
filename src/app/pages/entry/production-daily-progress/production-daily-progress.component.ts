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
    public Language;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.updateList();
    }
    updateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = local.input ? 1 : this.datas.length / 4 + 1;
        let option = "";
        let object = $event ? $event : local;
        option = 'pageIndex=' + pageIndex + '&pageSize=4&star=' + object.start + '&end=' + object.end
        if (object.fids) option += '&fids=' + object.fids;
        if (object.wsids) option += '&wsids=' + object.wsids;
        if (object.styles) option += '&styles=' + object.styles;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/Schedule/GetPlanPoes?' + option, false).subscribe((data: any) => {
            if ($event || local.input) {
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
        this.router.navigate(['scheduleEntry', JSON.stringify(item)])
    }
}
