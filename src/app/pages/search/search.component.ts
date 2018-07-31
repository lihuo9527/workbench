import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    //搜索页面
    constructor(private routerIonfo: ActivatedRoute, private service: AppService, private router: Router) { }
    public language;
    public id;
    public title: string;
    public state: boolean;
    public placeholder = "输入单号或款号查询";
    public input: string;
    public dateType: number;
    public datas = [];
    public today = new Date();
    public t;
    public EndDate;
    public StartDate;
    public datecontainer = true;
    public floors = [];
    public index;
    public number: number = 2;
    ngOnInit() {
        this.language = localStorage.getItem("language");
        if (this.language == "en") this.placeholder = "input number or style to query";
        let data = JSON.parse(this.routerIonfo.snapshot.params["id"]);
        this.id = data.id;
        this.title = data.t;
        this.index = data.i;
        let days;
        if (this.index == 0 && this.id == '0') {
            //关键事件
            days = 18 * 24;
            this.t = this.today.getTime() + 1000 * 60 * 60 * days;
            this.EndDate = new Date(this.t).toLocaleDateString();
            this.StartDate = this.today.toLocaleDateString();
            this.datas = [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Critical Event", title2: "关键事件", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                {
                    title: "Date", title2: "日期", rowstate: true, allstate: false, but: false, arrow: false,
                    list: [
                        { text: "Sew Plan Date", text2: "车缝计划日", state: false },
                        { text: "Delivery Date", text2: "交货期", state: false },
                        { text: "Order Confirmed date", text2: "订单确认日", state: false }]
                }
            ];

        }
        if (this.index == 0 && this.id == '1') {
            this.StartDate = new Date(this.today.getTime() - 1000 * 60 * 60 * 24).toLocaleDateString();
            this.number = 1;
            this.datecontainer = false;
            this.datas = [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Floor", title2: "车间", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Style", title2: "大类", rowstate: false, allstate: false, but: true, arrow: true, list: [] }
            ];

        }
        if (this.index == 0 && this.id == '2') {
            //非排产工序
            days = 15 * 24;
            this.t = this.today.getTime() + 1000 * 60 * 60 * days;
            this.EndDate = new Date(this.t).toLocaleDateString();
            this.StartDate = this.today.toLocaleDateString();
            this.datas = [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Process", title2: "工序", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                {
                    title: "Date", title2: "日期", rowstate: true, allstate: false, but: false, arrow: false, list: [
                        { text: "Sew Plan Date", text2: "车缝计划日", state: false },
                        { text: "Delivery Date", text2: "交货期", state: false },
                        { text: "Order Confirmed date", text2: "订单确认日", state: false }]
                }
            ];

        }
        if (this.index == 1) {
            //外发工序
            days = 2 * 24;
            this.t = this.today.getTime() - 1000 * 60 * 60 * days;
            this.title = this.language == "cn" ? this.title + "外发计划" : "Outsourced plan for " + this.title;
            this.EndDate = this.today.toLocaleDateString();
            this.StartDate = new Date(this.t).toLocaleDateString();
            this.datas = [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Style", title2: "大类", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Delivery Date", title2: "交货期", rowstate: true, allstate: false, but: false, arrow: false, list: [] }
            ];
        }
        console.log("id", this.id);
        this.init();
    }
    init() {
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
                    let floors = []
                    for (let b = 0; b < data[i].Shops.length; b++) {
                        let floor: any = {
                            'id': data[i].Shops[b].WId,
                            'text2': data[i].Shops[b].ShopName,
                            'text': data[i].Shops[b].ShopName,
                            'state': false,
                            'fid': data[i].FId
                        };
                        floors.push(floor);
                    }
                    this.floors.push({ id: data[i].FId, data: floors });
                    localStorage.setItem("floors", JSON.stringify(this.floors));
                }
            }
        })
        console.log("floors", this.floors)

        if (this.id >= 0) {
            let url: string;
            let i = 1;
            if (this.index == 1) {
                i = 1;
                url = '/api/BaseData/GetProductTypes';
            }
            if (this.index == 0 && this.id == 1) {
                i = 2;
                url = '/api/BaseData/GetProductTypes';
            }
            if (this.index == 0 && this.id == 0) {
                url = '/api/BaseData/GetEvents';

            }
            if (this.index == 0 && this.id == 2) {
                url = '/api/BaseData/GetOthProcesses';

            }
            console.log(url)
            this.service.http_get(url, false).subscribe((data: any) => {
                if (data.length > 0) {
                    data.forEach(element => {
                        let json: any = {
                            'id': element.itemId,
                            'text': element.itemName,
                            'text2': element.itemName,
                            'state': false
                        };
                        this.datas[i].list.push(json);
                    });

                }
            })
        }
    }
    on_off(allstate, i, item) {
        //全部按钮开关改变状态
        this.datas[i].allstate = !this.datas[i].allstate;
        for (let b = 0; b < this.datas[i].list.length; b++) {
            this.datas[i].list[b].state = this.datas[i].allstate;
        }
        if (item.title == "Factory" && !allstate) {
            //工厂关联添加车间
            if (this.id == 1 && this.index == 0) {
                this.datas[1].list = [];
                this.floors.forEach((element) => {
                    element.data.forEach(el => {
                        this.datas[1].list.push(el);
                    });
                });
            }
        }
        if (item.title == "Factory" && allstate) {
            //工厂关联删除车间
            if (this.id == 1 && this.index == 0) {
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
        if (items.title == 'Factory' && obj.state && this.id == 1 && this.index == 0) {
            //工厂关联添加车间
            this.floors.forEach((element) => {
                if (obj.id == element.id) {
                    element.data.forEach(el => {
                        this.datas[1].list.push(el);
                    });
                }
            });
            console.log(this.datas[1].list)
        }
        if (items.title == 'Factory' && !obj.state && this.id == 1 && this.index == 0) {
            //工厂关联删除车间
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
    backDate(objs) {
        //时间组件选择触发赋值
        let obj = JSON.parse(objs);
        console.log(obj);
        let time = 0;
        if (this.id == 1 && this.index == 0 && obj.date) {
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
    query() {
        //条件查询，先写入localstorage，下个页面根据存储的变量去筛选
        localStorage.setItem("datas", JSON.stringify(this.datas));
        let fids = [];
        this.datas[0].list.forEach((element, i) => {
            if (element.state == true) fids.push(element.id);
        });
        let wsids = [];
        if (this.index == 0 && this.id == 1) {
            this.datas[1].list.forEach((element, i) => {
                if (element.state == true) wsids.push(element.id);

            });
        }
        if (this.id == 0 && this.index == 0) {
            //关键事件
            let events = [];
            this.datas[1].list.forEach(element => {
                if (element.state == true) events.push(element.id);
            });
            localStorage.setItem("filter", JSON.stringify({ 'index': this.index, 'id': this.id, "start": this.StartDate, "end": this.EndDate, "input": this.input, "dateType": this.dateType, 'fids': fids.toString(), eventid: events.toString() }));
            this.router.navigate(['/entry/criticalEvent']);
        }
        if (this.id == 1 && this.index == 0) {
            //每日进度
            let styles = [];
            this.datas[2].list.forEach(element => {
                if (element.state == true) styles.push(element.id);
            });
            localStorage.setItem("filter", JSON.stringify({ 'index': this.index, 'id': this.id, "start": this.StartDate, "input": this.input, "styles": styles.toString(), 'fids': fids.toString(), 'wsids': wsids.toString() }));
            // this.router.navigateByUrl('/entry/productionDailyProgress');
            this.router.navigate(['/entry/productionDailyProgress']);
        }
        if (this.id == 2 && this.index == 0) {
            //非排产工序
            let process = [];
            this.datas[1].list.forEach(element => {
                if (element.state == true) process.push(element.id);
            });
            localStorage.setItem("filter", JSON.stringify({ 'index': this.index, 'id': this.id, "start": this.StartDate, "end": this.EndDate, "input": this.input, "process": process.toString(), 'fids': fids.toString(), "dateType": this.dateType }));
            this.router.navigate(['/entry/nonPlaningProcess']);
        };
        if (this.index == 1) {
            //外发工序
            let styles = [];
            this.datas[1].list.forEach(element => {
                if (element.state == true) styles.push(element.id);
            });
            localStorage.setItem("filter", JSON.stringify({ 'fids': fids.toString(), 'index': this.index, 'id': this.id, "start": this.StartDate, "end": this.EndDate, "input": this.input, 'productTypeIds': styles.toString() }));
            console.log("fids:" + fids)
            this.router.navigate(['/out/outProcess', this.title]);
        }
    }
}
