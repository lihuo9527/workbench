import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    @Output() public envet: EventEmitter<any> = new EventEmitter<any>();
    @Input() public Info: string;
    constructor(private service: AppService,
        private routerIonfo: ActivatedRoute, ) { }
    public allstate: boolean;
    public rowstate: boolean;
    public state = false;
    public datas = [
        { title: "Factory", title2: "工厂", rowstate: true, allstate: false, but: true, arrow: true, list: [] },
        { title: "Floor", title2: "车间", rowstate: true, allstate: false, but: true, arrow: true, list: [] }
    ];
    public today = new Date();
    public t = this.today.getTime() - 1000 * 60 * 60 * 48;
    public EndDate = this.today.toLocaleDateString();
    public StartDate = new Date(this.t).toLocaleDateString();
    public Language;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        console.log("INfo", this.Info)
        this.datas = JSON.parse(localStorage.getItem("datas"));

    }
    Back() {
        document.getElementById("shadow").style.left = "100%";
        document.getElementById("filter").style.left = "100%";
    }
    on_off(allstate, i) {
        this.datas[i].allstate = !this.datas[i].allstate;
        for (let b = 0; b < this.datas[i].list.length; b++) {
            this.datas[i].list[b].state = this.datas[i].allstate;
        }
    }
    backDate(objs) {
        let obj = JSON.parse(objs);
        let time = 0;
        if (obj.dates) {
            this.StartDate = obj.dates[0];
            this.EndDate = obj.dates[1];
            time = 1000;
        }
        setTimeout(() => this.state = obj.state, time);

    }
    complete() {
        let fids = [];
        for (let i = 0; i < this.datas[0].list.length; i++) {
            if (this.datas[0].list[i]['state'] == true) fids.push(this.datas[0].list[i]["id"]);
        }
        let wsids = [];
        for (let i = 0; i < this.datas[1].list.length; i++) {
            if (this.datas[1].list[i]['state'] == true) wsids.push(this.datas[1].list[i]["id"]);
        }
        let eventid = [];
        for (let i = 0; i < this.datas[2].list.length; i++) {
            if (this.datas[2].list[i]['state'] == true) eventid.push(this.datas[2].list[i]["id"]);
        }
        console.log(JSON.stringify({ 'eventid': eventid, 'wsids': wsids, 'fids': fids, 'StartDate': this.StartDate, 'EndDate': this.EndDate }));
        let obj: any = {};
        let local = JSON.parse(localStorage.getItem("filter"));
        obj['start'] = this.StartDate;
        obj['end'] = this.EndDate;
        if (eventid.toString()) obj['eventid'] = eventid.toString();
        if (wsids.toString()) obj['wsids'] = wsids.toString();
        if (fids.toString()) obj['fids'] = fids.toString();
        if (local.input) obj['input'] = local.input;
        console.log("obj", obj)
        localStorage.setItem("filter", JSON.stringify(obj));
        this.envet.emit({ 'eventid': eventid.toString(), 'wsids': wsids.toString(), 'fids': fids.toString(), 'StartDate': this.StartDate, 'EndDate': this.EndDate });
        this.Back();
    }
}
