import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { ActivatedRoute} from '@angular/router';
@Component({
    selector: 'app-progress-tracking',
    templateUrl: './progress-tracking.component.html',
    styleUrls: ['./progress-tracking.component.css']
})
export class ProgressTrackingComponent implements OnInit {

    constructor(private service: AppService , private routerIonfo: ActivatedRoute) { }
    public datas = [];
    public id;
    public language;
    public url;
    public type;
    public title
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.title = JSON.parse(this.routerIonfo.snapshot.params["data"]).t;
        this.updateList('init');
    }
    updateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let object = $event == 'add' || $event == 'search' || $event == 'init' ? local : $event;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4';
        if (object.fids) option += '&fids=' + object.fids;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/TaskWarn/GetDetailProgressTrack?' + option, false).subscribe((data: any) => {
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
