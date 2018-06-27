import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    constructor(private routerIonfo: ActivatedRoute, private service: AppService, private router: Router) { }
    public Language;
    public id;
    public title: string;
    public state: boolean;
    public placeholder = "输入单号或款号查询";
    public input: string;
    public dateType: number;
    public lists: any = [
        {
            data: [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Floor", title2: "车间", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Critical Event", title2: "关键事件", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                {
                    title: "Date", title2: "日期", rowstate: true, allstate: false, but: false, arrow: false,
                    list: [
                        { text: "Sew Plan Date", text2: "车缝开始日", state: false },
                        { text: "Delivery Date", text2: "交货期", state: false },
                        { text: "Order Confirmed date", text2: "订单确认日", state: false }]
                }
            ]
        },

        {
            data: [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Floor", title2: "车间", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Style", title2: "大类", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Production Date", title2: "生产日期", rowstate: true, allstate: false, but: false, arrow: false, list: [] }
            ]
        },

        {
            data: [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Floor", title2: "车间", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Process", title2: "工序", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                {
                    title: "Date", title2: "日期", rowstate: true, allstate: false, but: false, arrow: false, list: [
                        { text: "Sew Plan Date", text2: "车缝开始日", state: false },
                        { text: "Delivery Date", text2: "交货期", state: false },
                        { text: "Order Confirmed date", text2: "订单确认日", state: false }]
                }
            ]
        },

        {},

        {},
        {
            data: [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Floor", title2: "车间", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Style", title2: "大类", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Production Date", title2: "生产日期", rowstate: true, allstate: false, but: false, arrow: false, list: [] }
            ]
        },
        {
            data: [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Floor", title2: "车间", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Style", title2: "大类", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Production Date", title2: "生产日期", rowstate: true, allstate: false, but: false, arrow: false, list: [] }
            ]
        },
        {
            data: [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Floor", title2: "车间", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Style", title2: "大类", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Production Date", title2: "生产日期", rowstate: true, allstate: false, but: false, arrow: false, list: [] }
            ]
        }
    ]
    public datas = [];
    public today = new Date();
    public t = this.today.getTime() + 1000 * 60 * 60 * 720;
    public EndDate = new Date(this.t).toLocaleDateString();
    public StartDate = this.today.toLocaleDateString();
    public datecontainer = true;
    public floors = [];

    ngOnInit() {
        this.id = this.routerIonfo.snapshot.params["id"];
        this.Language = localStorage.getItem("language");
        if (this.Language == "en") this.placeholder = "input number or style to query";
        if (this.id == 0 && this.Language == "en") this.title = 'Critical Event';
        if (this.id == 0 && this.Language == "cn") this.title = '产前事件';
        if (this.id == 1 && this.Language == "en") this.title = 'Daily Progress';
        if (this.id == 1 && this.Language == "cn") this.title = '每日进度';
        if (this.id == 2 && this.Language == "en") this.title = 'Non-planing Process';
        if (this.id == 2 && this.Language == "cn") this.title = '非排产工序';
        if (this.id == 5 && this.Language == "en") this.title = 'Embroidery Printing Process Plan';
        if (this.id == 5 && this.Language == "cn") this.title = '印绣花工序';
        if (this.id == 6 && this.Language == "en") this.title = 'Sewing Process Plan';
        if (this.id == 6 && this.Language == "cn") this.title = '车缝';
        if (this.id == 7 && this.Language == "en") this.title = 'Washing Process Plan';
        if (this.id == 7 && this.Language == "cn") this.title = '洗水';
        if (this.id >= 0) {
            this.datas = this.lists[this.id].data;
            this.init();
        }
        console.log("id", this.id);
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
            switch (this.id) {
                case '0': url = '/api/BaseData/GetEvents';
                    break;
                case '1': url = '/api/BaseData/GetProductTypes';
                    break;
                case '2': url = '/api/BaseData/GetProcesses';
                    break;
                case '5': url = '/api/BaseData/GetProductTypes';
                    break;
                case '6': url = '/api/BaseData/GetProductTypes';
                    break;
                case '7': url = '/api/BaseData/GetProductTypes';
                    break;
                default: url = "";
                    break;
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
                        this.datas[2].list.push(json);
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
            this.datas[1].list = [];
            this.floors.forEach((element) => {
                element.data.forEach(el => {
                    this.datas[1].list.push(el);
                });
            });
        }
        if (item.title == "Factory" && allstate) {
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
            //关联工厂删除
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
        let time = 0;
        if (obj.dates) {
            this.StartDate = obj.dates[0];
            this.EndDate = obj.dates[1];
            time = 1000;
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
        this.datas[1].list.forEach((element, i) => {
            if (element.state == true) wsids.push(element.id);

        });
        if (this.id == 0) {
            //关键事件
            localStorage.setItem("filter", JSON.stringify({ 'id': this.id, "start": this.StartDate, "end": this.EndDate, "input": this.input, "dateType": this.dateType, 'fids': fids.toString(), 'wsids': wsids.toString() }));
            this.router.navigate(['criticalEvent']);
        }
        if (this.id == 1) {
            //每日进度
            let styles = [];
            this.datas[2].list.forEach(element => {
                if (element.state == true) styles.push(element.id);
            });
            localStorage.setItem("filter", JSON.stringify({ 'id': this.id, "start": this.StartDate, "end": this.EndDate, "input": this.input, "styles": styles.toString(), 'fids': fids.toString(), 'wsids': wsids.toString() }));
            this.router.navigate(['productionDailyProgress']);
        }

        if (this.id == 2) {
            //非排产工序
            let process = [];
            this.datas[2].list.forEach(element => {
                if (element.state == true) process.push(element.id);
            });
            localStorage.setItem("filter", JSON.stringify({ 'id': this.id, "start": this.StartDate, "end": this.EndDate, "input": this.input, "process": process.toString(), 'fids': fids.toString(), 'wsids': wsids.toString(), "dateType": this.dateType }));
            this.router.navigate(['nonPlaningProcess']);
        };
        if (this.id >= 5) {
            //外发工序
            let styles = [];
            this.datas[2].list.forEach(element => {
                if (element.state == true) styles.push(element.id);
            });
            localStorage.setItem("filter", JSON.stringify({ 'id': this.id, "start": this.StartDate, "end": this.EndDate, "input": this.input, 'styles': styles.toString() }));
            console.log("fids:" + fids)
            this.router.navigate(['outProcess']);
        }
    }
}
