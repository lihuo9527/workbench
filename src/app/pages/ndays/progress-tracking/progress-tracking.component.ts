import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-progress-tracking',
    templateUrl: './progress-tracking.component.html',
    styleUrls: ['./progress-tracking.component.css']
})
export class ProgressTrackingComponent implements OnInit {

    constructor(private service: AppService ) { }
    public datas = [];
    public id;
    public language;
    public url;
    public type;
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.updateList();
    }
    updateList($event?) {
        if (this.type == 2 && $event == 'add') return;
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4';
        if ($event && $event.fids) option += '&fids=' + $event.fids;
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
