import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
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
    public language;
    public newdate = new Date();
    public nowdate = this.newdate.toLocaleDateString();
    public state;
    public type;
    public title;
    ngOnInit() {
        localStorage.setItem("filter", JSON.stringify({ input: '' }));
        this.language = localStorage.getItem("language");
        this.id = this.routerIonfo.snapshot.params["id"] == 'all' ? -1 : this.routerIonfo.snapshot.params["id"];
        this.title = this.language == "en" ? "Material Delay" : "物料延误";
        this.updateList('init');
    }
    updateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4' + '&type=' + this.id;
        let object = $event == 'add' || $event == 'search' || $event == 'init' ? local : $event;
        if (object.fids) option += '&fids=' + object.fids;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/TaskWarn/GetDetailMatDelay?' + option, false).subscribe((data: any) => {
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
        this.service.routerLink(['/delay/delayEdit', JSON.stringify({ type: "material", title: this.title, data: item })]);
    }
}
