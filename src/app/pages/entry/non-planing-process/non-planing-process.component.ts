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
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.updateList('init');
    }

    updateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = "";
        let object = $event == 'add' || $event == 'search' || $event == 'init' ? local : $event;
        option = 'pageIndex=' + pageIndex + '&pageSize=4&star=' + object.start + '&end=' + object.end
        if (object.fids) option += '&fids=' + object.fids;
        if (object.wsids) option += '&wsids=' + object.wsids;
        if (object.process) option += '&processid=' + object.process;
        if (object.dateType >= 0) option += '&dateType=' + object.dateType;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/Schedule/GetProcessPoes?' + option, false).subscribe((data: any) => {
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
        item["Pid"] = "non-process";
        this.router.navigate(['scheduleEntry', JSON.stringify(item)])
    }
}
