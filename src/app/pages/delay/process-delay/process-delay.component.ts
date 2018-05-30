import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-process-delay',
    templateUrl: './process-delay.component.html',
    styleUrls: ['./process-delay.component.css']
})
export class ProcessDelayComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute, ) { }
    public processId = "-1";
    public state = false;
    public datas = [];
    public id;
    public Language;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.id = this.routerIonfo.snapshot.params["id"];
        this.GetList(this.id);
    }

    GetList(index?) {
        let pageIndex = Math.ceil(this.datas.length / 4 + 1);
        this.service.http_get('/api/TaskWarn/GetDetailProcessDelay?pageIndex=' + pageIndex + '&pageSize=4&processId=' + this.id, false).subscribe((data:any) => {
            if (index != undefined) {
                if (data.length > 0) this.datas = data;
            } else {
                this.service.up_date(this.datas, data);
            }
        })
    }
}
