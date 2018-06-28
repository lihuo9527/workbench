import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-material-arrival',
    templateUrl: './material-arrival.component.html',
    styleUrls: ['./material-arrival.component.css']
})
export class MaterialArrivalComponent implements OnInit {

    constructor(private service: AppService) { }
    public datas = [];
    public id;
    public Language;
    public url;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.UpdateList();
    }
    UpdateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let object = $event ? $event : local;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4';
        if (object.type) option += '&type=' + object.type;
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
