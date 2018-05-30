import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
@Component({
    selector: 'app-today',
    templateUrl: './today.component.html',
    styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute, ) { }
    public type = "-1";
    public datas = [];
    public id;
    ngOnInit() {
        this.id = this.routerIonfo.snapshot.params["id"];
        this.GetList(this.id);
    }

    GetList(index) {
        // if(index=="0") this.id="0";
        // if(index=="1") this.id="1";
        this.service.http_get('/api/TaskWarn/GetDetailMatDelay?pageIndex=1&pageSize=4&fids=1&type=' + this.type, false).subscribe((data: any) => {
            let obj = data;
            if (obj.length > 0) {
                this.datas = obj;
            }
        })
    }
    UpdateList() {
        let pageIndex = Math.ceil(this.datas.length / 4 + 1);
        this.service.http_get('/api/TaskWarn/GetDetailMatDelay?pageIndex=' + pageIndex + '&pageSize=4&fids=1&type=' + this.type, false).subscribe((data: any) => {
            let obj = data;
            if (obj.length > 0) {
                for (let i = 0; i < obj.length; i++) {
                    this.datas.push(obj[i]);
                }
            }
        })
    }
}
