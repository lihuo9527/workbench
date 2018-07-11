import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-start-delay',
    templateUrl: './start-delay.component.html',
    styleUrls: ['./start-delay.component.css']
})
export class StartDelayComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute, ) { }
    public datas: any = [];
    public id;
    public language;
    public url = '/api/TaskWarn/GetDetailStartDelay?';
    public arrow = false;
    public state;
    public type;
    ngOnInit() {
        localStorage.setItem("filter", JSON.stringify({ input: '' }));
        this.language = localStorage.getItem("language");
        this.updateList();
    }
    updateList($event?) {
        if (this.type == 2 && $event == 'add') return;
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4';
        if ($event && $event.fids) option += '&fids=' + $event.fids;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/TaskWarn/GetDetailStartDelay?' + option, false).subscribe((data: any) => {
            this.type = data.length > 0 ? 1 : 2;
            if ($event != 'add') {
                data.forEach(element => {
                    element["arrow"] = false
                });
                this.datas = data;
            } else {
                data.forEach(element => {
                    element["arrow"] = false
                    this.datas.push(element);
                });
            }
        })
    }
}
