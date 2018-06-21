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
    public dateType: number;
    public state: boolean = false;
    public datas: object = [
        { title: "Factory", title2: "工厂", rowstate: true, allstate: false, but: true, arrow: true, list: [] },
        { title: "Floor", title2: "车间", rowstate: true, allstate: false, but: true, arrow: true, list: [] }
    ];
    public today = new Date();
    public t = this.today.getTime() - 1000 * 60 * 60 * 48;
    public EndDate = this.today.toLocaleDateString();
    public StartDate = new Date(this.t).toLocaleDateString();
    public Language;
    public floors = JSON.parse(localStorage.getItem("floors"));
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        console.log("INfo", this.Info)
        this.datas = JSON.parse(localStorage.getItem("datas"));

    }
    Back() {
        //filter过渡动漫
        document.getElementById("shadow").style.left = "100%";
        document.getElementById("filter").style.left = "100%";
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
    on_off(allstate, i, item) {
        //全部按钮开关改变状态
        this.datas[i].allstate = !this.datas[i].allstate;
        for (let b = 0; b < this.datas[i].list.length; b++) {
            this.datas[i].list[b].state = this.datas[i].allstate;
        }
        if (item.title == "Factory" && !allstate) {
            //关联全部工厂添加车间
            this.floors.forEach((element) => {
                element.data.forEach(el => {
                    this.datas[1].list.push(el);
                });
            });
        }
        if (item.title == "Factory" && allstate) {
            //关联全部工厂删除车间
            this.datas[i + 1].allstate = false;
            this.datas[i + 1].list = [];
        }
    }

    change(obj, index, items, n1) {
        //单选改变状态
        obj.state = !obj.state;
        this.dateType = index;
        if (items.title == 'Production Date' || items.title == 'Date') {
            items.list.forEach((element, i) => {
                if (index != i) element.state = false;
            });
        }
        if (items.title == 'Factory' && obj.state) {
            //关联工厂添加车间
            this.floors.forEach((element) => {
                if (obj.id == element.id) {
                    element.data.forEach(el => {
                        this.datas[1].list.push(el);
                    });
                }
            });
            console.log(this.datas[1].list)
        }
        if (items.title == 'Factory' && !obj.state) {
            //关联工厂删除车间
            let k = 0;
            for (let i = 0; i < this.datas[1].list.length; i++) {
                console.log(obj.id, this.datas[1].list[i].fid)
                if (obj.id == this.datas[1].list[i].fid) {
                    this.datas[1].list.splice(i, 1);
                    i = i - 1;
                }
            }
        }
    }
    complete() {
        let obj: object = {};
        let local = JSON.parse(localStorage.getItem("filter"));
        let fids = [];
        this.datas[0].list.forEach((element, i) => {
            if (element.state == true) fids.push(element.id);
        });
        let wsids = [];
        this.datas[1].list.forEach((element, i) => {
            if (element.state == true) wsids.push(element.id);

        });

        obj['start'] = this.StartDate;
        obj['end'] = this.EndDate;
        obj['id'] = local.id;
        if (wsids.toString()) obj['wsids'] = wsids.toString();
        if (fids.toString()) obj['fids'] = fids.toString();
        if (local.input) obj['input'] = local.input;

        if (local.id == 0) {
            let eventid = [];
            //关键事件
            this.datas[2].list.forEach(element => {
                if (element.state == true) eventid.push(element.id);
            });
            if (this.dateType >= 0 && this.datas[3].list[this.dateType].state) obj['dateType'] = this.dateType;
            if (eventid.toString()) obj['eventid'] = eventid.toString();
        }
        if (local.id == 1) {
            //每日进度
            let styles = [];
            this.datas[2].list.forEach((element, i) => {
                if (element.state == true) styles.push(element.id);
            });
            if (styles.toString()) obj['styles'] = styles.toString();
        }
        if (local.id == 2) {
            //非排产工序
            let process = [];
            this.datas[2].list.forEach(element => {
                if (element.state == true) process.push(element.id);
            });
            if (this.dateType >= 0 && this.datas[3].list[this.dateType].state) obj['dateType'] = this.dateType;
            if (process.toString()) obj['process'] = process.toString();
        }
        console.log(JSON.stringify(obj))
        localStorage.setItem("filter", JSON.stringify(obj));
        this.envet.emit(obj);
        this.Back();
    }
}
