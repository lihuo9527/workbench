import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-material-delay',
    templateUrl: './material-delay.component.html',
    styleUrls: ['./material-delay.component.css']
})
export class MaterialDelayComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute, ) { }
    public processId = "-1";
    public datas = [];
    public id;
    public language;
    public newdate = new Date();
    public nowdate = this.newdate.toLocaleDateString();
    public state;
    public type;
    ngOnInit() {
        localStorage.setItem("filter", JSON.stringify({ input: '' }));
        this.language = localStorage.getItem("language");
        this.id = this.routerIonfo.snapshot.params["id"] == 'all' ? -1 : this.routerIonfo.snapshot.params["id"];
        this.updateList('init');
    }
    updateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4' + '&type=' + this.id;
        let object = $event == 'add' || $event == 'search' || $event == 'init' ? local : $event;
        if (object.fids) option += '&fids=' + object.fids;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/TaskWarn/GetDetailMatDelay?' + option, false).subscribe((data: any) => {
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
