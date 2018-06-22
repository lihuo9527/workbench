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
        localStorage.setItem("filter", JSON.stringify({ input: '' }));
        this.Language = localStorage.getItem("language");
        this.id = this.routerIonfo.snapshot.params["id"];
        this.UpdateList();
    }
    UpdateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4' + '&processId=' + this.id;
        if ($event) {
            if ($event.fids) option += '&fids=' + $event.fids;
        }
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/TaskWarn/GetDetailProcessDelay?' + option, false).subscribe((data: any) => {
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
