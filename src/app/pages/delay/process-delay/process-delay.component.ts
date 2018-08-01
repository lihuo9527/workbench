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
    public language;
    public type;
    public title;
    ngOnInit() {
        localStorage.setItem("filter", JSON.stringify({ input: '' }));
        this.language = localStorage.getItem("language");
        this.id = this.routerIonfo.snapshot.params["id"] == 'all' ? -1 : this.routerIonfo.snapshot.params["id"];
        this.title = this.language == "en" ? "Process Delay" : "工序延误";
        this.updateList('init');
    }
    updateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4' + '&processId=' + this.id;
        let object = $event == 'add' || $event == 'search' || $event == 'init' ? local : $event;
        if (object.fids) option += '&fids=' + object.fids;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/TaskWarn/GetDetailProcessDelay?' + option, false).subscribe((data: any) => {
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
    enterEdit(item) {
        this.service.routerLink(['/delay/delayEdit', JSON.stringify({type:"process", title: this.title, data: item })]);
    }
}
