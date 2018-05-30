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
    public Language;
    public newdate = new Date();
    public nowdate = this.newdate.toLocaleDateString();
    public state;

    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.id = this.routerIonfo.snapshot.params["id"];
        this.GetList(this.id);
    }

    GetList(index?) {
        let pageIndex = Math.ceil(this.datas.length / 4 + 1);
        this.service.http_get('/api/TaskWarn/GetDetailMatDelay?pageIndex=' + pageIndex + '&pageSize=4&fids=1&type=' + this.id, false).subscribe((data:any) => {
            if (index != undefined) {
                if (data.length > 0) this.datas = data;
            } else {
                this.service.up_date(this.datas, data);
            }
        })
    }
}
