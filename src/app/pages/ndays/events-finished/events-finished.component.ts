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
        this.Language = localStorage.getItem("language");
        this.id = this.routerIonfo.snapshot.params["id"];
        // console.log( "id:" + this.id);
        if (this.id == 0) this.url = '/api/TaskWarn/GetDetailMatReceive?';
        if (this.id == 1) this.url = '/api/TaskWarn/GetDetailEventNotMaintain?';
        if (this.id == 2) this.url = '/api/TaskWarn/GetDetailProgressTrack?';
        this.UpdateList();
    }
    UpdateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4' + '&eventId=' + this.id;
        if ($event && $event.fids) option += '&fids=' + $event.fids;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get(this.url + option, false).subscribe((data: any) => {
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
