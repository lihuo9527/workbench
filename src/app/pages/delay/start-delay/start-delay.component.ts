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
    public Language;
    public url = '/api/TaskWarn/GetDetailStartDelay?';
    public arrow = false;
    public state;
    ngOnInit() {
        localStorage.setItem("filter", JSON.stringify({ input: '' }));
        this.Language = localStorage.getItem("language");
        this.UpdateList();
    }
    UpdateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4';
        if ($event && $event.fids) option += '&fids=' + $event.fids;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/TaskWarn/GetDetailStartDelay?' + option, false).subscribe((data: any) => {
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
