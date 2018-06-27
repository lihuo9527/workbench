import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-events-finished',
  templateUrl: './events-finished.component.html',
  styleUrls: ['./events-finished.component.css']
})
export class EventsFinishedComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute, ) { }
    public datas = [];
    public id;
    public Language;
    public url;
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
        this.service.http_get('/api/TaskWarn/GetDetailEventNotMaintain?' + option, false).subscribe((data: any) => {
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
