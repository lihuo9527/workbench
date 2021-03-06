import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { ActivatedRoute} from '@angular/router';
@Component({
    selector: 'app-events-finished',
    templateUrl: './events-finished.component.html',
    styleUrls: ['./events-finished.component.css']
})
export class EventsFinishedComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute,) { }
    public datas = [];
    public id;
    public language;
    public url;
    public type;
    public title;
    ngOnInit() {
        localStorage.setItem("filter", JSON.stringify({ input: '' }));
        this.title = JSON.parse(this.routerIonfo.snapshot.params["data"]).t;
        this.language = localStorage.getItem("language");
        this.updateList('init');
    }
    //初始化-筛选-搜索-查看更多
    updateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4';
        let object = $event == 'add' || $event == 'search' || $event == 'init' ? local : $event;
        if (object.fids) option += '&fids=' + object.fids;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/TaskWarn/GetDetailEventNotMaintain?' + option, false).subscribe((data: any) => {
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

}
