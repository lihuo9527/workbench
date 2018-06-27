import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-material-arrival',
    templateUrl: './material-arrival.component.html',
    styleUrls: ['./material-arrival.component.css']
})
export class MaterialArrivalComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute, ) { }
    public datas = [];
    public id;
    public Language;
    public url;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.id = this.routerIonfo.snapshot.params["id"];
        console.log("id:" + this.id);
        if (this.id == 0) this.url = '/api/TaskWarn/GetDetailMatReceive?';
        this.UpdateList();
    }
    UpdateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4' + '&type=' + this.id;
        if ($event && $event.fids) option += '&fids=' + $event.fids;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/TaskWarn/GetDetailMatReceive?' + option, false).subscribe((data: any) => {
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
