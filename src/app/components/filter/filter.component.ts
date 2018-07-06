import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from '../../app.service';
@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    @Output() public envet: EventEmitter<any> = new EventEmitter<any>();
    @Input() public Info: string;
    constructor(private service: AppService, ) { }
    public allstate: boolean;
    public rowstate: boolean;
    public dateType: number;
    public state: boolean = false;
    public datas: any = [
        { title: "Factory", title2: "工厂", rowstate: true, allstate: false, but: true, arrow: true, list: [] }
    ];
    public EndDate;
    public StartDate;
    public language;
    public floors = JSON.parse(localStorage.getItem("floors"));
    public dateshow = true;
    public local;
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.local = JSON.parse(localStorage.getItem("filter"));
        console.log("INfo", this.Info)
        if (this.Info == "delay") {
            this.dateshow = false;
            this.service.http_get('/api/BaseData/GetFactoryLines', false).subscribe((data: any) => {
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        let json: any = {
                            'id': data[i].FId,
                            'text': data[i].FName,
                            'text2': data[i].FName,
                            'state': false
                        };
                        this.datas[0].list.push(json);
                    }
                }
            })
        } else {
            this.StartDate = this.local.start;
        }
        if (this.Info == "delay" || this.Info == "material") {
            this.dateshow = false;
        } else {
            this.EndDate = this.local.end;
            this.datas = JSON.parse(localStorage.getItem("datas"));
        }
    }
    back() {
        //filter过渡动漫
        document.getElementById("shadow").style.left = "100%";
        document.getElementById("filter").style.left = "100%";
    }

    backDate(objs) {
        //返回时间并关闭窗口
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
        if (item.title == "Factory" && !allstate && this.Info != "delay") {
            //关联全部工厂添加车间
            if (this.local.id != 0 && this.local.index == 0 && this.local.id != 2 || this.local.index != 0) {
                this.datas[1].list = [];
                this.floors.forEach((element) => {
                    element.data.forEach(el => {
                        this.datas[1].list.push(el);
                    });
                });
            }
        }
        if (item.title == "Factory" && allstate && this.Info != "delay") {
            //关联全部工厂删除车间
            if (this.local.id != 0 && this.local.index == 0 && this.local.id != 2 || this.local.index != 0) {
                this.datas[i + 1].allstate = false;
                this.datas[i + 1].list = [];
            }
        }
    }

    change(obj, index, items, n1) {
        //单选改变状态
        obj.state = !obj.state;
        if (items.title == 'Production Date' || items.title == 'Date') {
            items.list.forEach((element, i) => {
                if (index != i) element.state = false;
            });
            this.dateType = obj.state ? index : undefined;
        }
        if (items.title == 'Factory' && obj.state && this.Info != "delay") {
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
        if (items.title == 'Factory' && !obj.state && this.Info != "delay") {
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
        let obj: any = {};
        let fids = [];
        let wsids = [];
        if (this.Info != "delay" && this.Info != "material") {
            this.datas[0].list.forEach((element, i) => {
                if (element.state == true) fids.push(element.id);
            });
            obj['start'] = this.StartDate;
            obj['end'] = this.EndDate;
            obj['id'] = this.local.id;
            obj['index'] = this.local.index;
            if (this.local.index == 1 || this.local.index == 0 && this.local.id == 1) {
                this.datas[1].list.forEach((element, i) => {
                    if (element.state == true) wsids.push(element.id);

                });
                if (wsids.toString()) obj['wsids'] = wsids.toString();
            }
            if (fids.toString()) obj['fids'] = fids.toString();
            if (this.local.input) obj['input'] = this.local.input;
            if (this.local.id == 0 && this.local.index == 0) {
                let eventid = [];
                //关键事件
                this.datas[1].list.forEach(element => {
                    if (element.state == true) eventid.push(element.id);
                });
                if (this.dateType >= 0) obj['dateType'] = this.dateType;
                if (eventid.toString()) obj['eventid'] = eventid.toString();
            }
            if (this.local.id == 1 && this.local.index == 0) {
                //每日进度
                let styles = [];
                this.datas[2].list.forEach((element, i) => {
                    if (element.state == true) styles.push(element.id);
                });
                if (styles.toString()) obj['styles'] = styles.toString();
            }
            if (this.local.id == 2 && this.local.index == 0) {
                //非排产工序
                let process = [];
                this.datas[2].list.forEach(element => {
                    if (element.state == true) process.push(element.id);
                });
                if (this.dateType >= 0) obj['dateType'] = this.dateType;
                if (process.toString()) obj['process'] = process.toString();
            }
            if (this.local.id >= 0 && this.local.index == 1) {
                //外发工序
                let styles = [];
                this.datas[2].list.forEach(element => {
                    if (element.state == true) styles.push(element.id);
                });
                if (styles.toString()) obj['styles'] = styles.toString();
            }
        } else if (this.Info == "delay") {
            this.datas[0].list.forEach((element, i) => {
                if (element.state == true) fids.push(element.id);
            });
            if (this.local.input) obj['input'] = this.local.input;
            if (fids.toString()) obj['fids'] = fids.toString();

        } else if (this.Info == "material") {
            let type;
            if (this.datas[0].list[0].state && this.datas[0].list[1].state || !this.datas[0].list[0].state && !this.datas[0].list[1].state) type = -1;
            if (this.datas[0].list[0].state && this.datas[0].list[1].state == false) type = 1;
            if (this.datas[0].list[0].state == false && this.datas[0].list[1].state) type = 0;
            if (this.local.input) obj['input'] = this.local.input;
            if (type.toString()) obj['type'] = type.toString();
        }
        console.log(JSON.stringify(obj))
        localStorage.setItem("filter", JSON.stringify(obj));
        this.envet.emit(obj);
        this.back();
    }
}
