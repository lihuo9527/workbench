import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from '../../app.service';
@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    @Output() public event: EventEmitter<any> = new EventEmitter<any>();//event 筛选完成回调
    @Input() public info: string; //info 传参信息进行判断
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
    public number: number = 2;
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.local = JSON.parse(localStorage.getItem("filter"));
        console.log("info", this.info, this.local.input);
        if (this.local.id == 1 && this.local.index == 0) {
            this.number = 1;
            this.dateshow = false;
        }
        if (this.info == "delay") {
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
        if (this.info == "event" && this.local.dateType >= 0) {
            this.dateType = this.local.dateType;
        }
        if (this.info == "delay" || this.info == "material") {
            if (this.info == "material") {
                this.datas = JSON.parse(localStorage.getItem("datas"));
            }
            this.dateshow = false;
        } else {
            this.EndDate = this.local.end;
            this.datas = JSON.parse(localStorage.getItem("datas"));
        }
    }
    //filter过渡动漫
    back() {
        document.getElementById("shadow").style.left = "100%";
        document.getElementById("filter").style.left = "100%";
    }
    //日历组件回调事件
    backDate(objs) {
        let obj = JSON.parse(objs);
        let time = 0;
        if (this.local.id == 1 && this.local.index == 0 && obj.date) {
            this.StartDate = obj.date;
            time = 500;
        } else {
            if (obj.dates) {
                this.StartDate = obj.dates[0];
                this.EndDate = obj.dates[1];
                time = 500;
            }
        }
        setTimeout(() => this.state = obj.state, time);
    }
    //全部按钮开关改变状态
    on_off(allstate, i, item) {
        this.datas[i].allstate = !this.datas[i].allstate;
        for (let b = 0; b < this.datas[i].list.length; b++) {
            this.datas[i].list[b].state = this.datas[i].allstate;
        }
        //关联全部工厂添加车间
        if (item.title == "Factory" && !allstate) {
            if (this.local.id == 1 && this.local.index == 0) {
                this.datas[1].list = [];
                this.floors.forEach((element) => {
                    element.data.forEach(el => {
                        this.datas[1].list.push(el);
                    });
                });
            }
        }
        //关联全部工厂删除车间
        if (item.title == "Factory" && allstate) {
            if (this.local.id == 1 && this.local.index == 0) {
                this.datas[i + 1].allstate = false;
                this.datas[i + 1].list = [];
            }
        }
    }
    //单选改变状态
    change(obj, index, items, n1) {
        obj.state = !obj.state;
        if (items.title == 'Production Date' || items.title == 'Date') {
            items.list.forEach((element, i) => {
                if (index != i) element.state = false;
            });
            this.dateType = obj.state ? index : undefined;
        }
        //关联工厂添加车间
        if (items.title == 'Factory' && obj.state && this.local.id == 1 && this.local.index == 0) {
            this.floors.forEach((element) => {
                if (obj.id == element.id) {
                    element.data.forEach(el => {
                        this.datas[1].list.push(el);
                    });
                }
            });
            console.log(this.datas[1].list)
        }
        //关联工厂删除车间
        if (items.title == 'Factory' && !obj.state && this.local.id == 1 && this.local.index == 0) {
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
    //完成筛选返回条件
    complete() {
        this.local = JSON.parse(localStorage.getItem("filter"));
        let obj: any = {};
        let fids = [];
        let wsids = [];
        if (this.info != "delay" && this.info != "material") {
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
            console.log("input", this.local.input);
            if (this.local.input) obj['input'] = this.local.input;
             //关键事件
            if (this.local.id == 0 && this.local.index == 0) {
                let eventid = [];
                this.datas[1].list.forEach(element => {
                    if (element.state == true) eventid.push(element.id);
                });
                if (this.dateType >= 0) obj['dateType'] = this.dateType;
                if (eventid.toString()) obj['eventid'] = eventid.toString();
            }
            //生产日进度
            if (this.local.id == 1 && this.local.index == 0) {
                let styles = [];
                this.datas[2].list.forEach((element, i) => {
                    if (element.state == true) styles.push(element.id);
                });
                if (styles.toString()) obj['styles'] = styles.toString();
            }
            //非排产工序
            if (this.local.id == 2 && this.local.index == 0) {
                let process = [];
                this.datas[1].list.forEach(element => {
                    if (element.state == true) process.push(element.id);
                });
                if (this.dateType >= 0) obj['dateType'] = this.dateType;
                if (process.toString()) obj['process'] = process.toString();
            }
            //外发工序
            if (this.local.index == 1) {
                let styles = [];
                this.datas[1].list.forEach(element => {
                    if (element.state == true) styles.push(element.id);
                });
                if (styles.toString()) obj['productTypeIds'] = styles.toString();
            }
        } else if (this.info == "delay") {
            //工序延误、事件延误、交期延误
            this.datas[0].list.forEach((element, i) => {
                if (element.state == true) fids.push(element.id);
            });
            console.log('input', this.local.input)
            if (this.local.input) obj['input'] = this.local.input;
            if (fids.toString()) obj['fids'] = fids.toString();

        } else if (this.info == "material") {
            //物料延误
            let type;
            if (this.datas[0].list[0].state && this.datas[0].list[1].state || !this.datas[0].list[0].state && !this.datas[0].list[1].state) type = -1;
            if (this.datas[0].list[0].state && this.datas[0].list[1].state == false) type = 0;
            if (this.datas[0].list[0].state == false && this.datas[0].list[1].state) type = 1;
            if (this.local.input) obj['input'] = this.local.input;
            if (type.toString()) obj['type'] = type.toString();
        }
        console.log(JSON.stringify(obj))
        localStorage.setItem("filter", JSON.stringify(obj));
        this.event.emit(obj);
        this.back();
    }
}
