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
    public language;
    public type;
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.updateList('init');
    }
    //初始化-筛选-搜索-查看更多
    updateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let object = $event == 'add' || $event == 'search' || $event == 'init' ? local : $event;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4&star=' + object.start + '&end=' + object.end;
        if (object.fids) option += '&fids=' + object.fids;
        if (object.wsids) option += '&wsids=' + object.wsids;
        if (object.process) option += '&processid=' + object.process;
        if (object.dateType >= 0) option += '&dateType=' + object.dateType;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/Schedule/GetProcessPoes?' + option, false).subscribe((data: any) => {
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
    //进入非排产工序日进度录入
    link(item) {
        console.log(item);
        item["Pid"] = "non-process";
        this.router.navigate(['/entry/scheduleEntry', JSON.stringify(item)])
    }
}
