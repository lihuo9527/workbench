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
    public title;
    public state;
    public placeholder = "输入单号或款号查询";
    public lists = [
        {
            data: [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Floor", title2: "车间", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                {
                    title: "Status", title2: "状态", rowstate: false, allstate: false, but: true, arrow: true,
                    list: [
                        { text: "Sew Plan Date", text2: "未完成", state: false },
                        { text: "Delivery Date", text2: "已完成", state: false },
                        { text: "Order Confirmed date", text2: "已出口", state: false }
                    ]
                },
                {
                    title: "Firm Order or not", title2: "是否实单", rowstate: true, allstate: false, but: false, arrow: false,
                    list: [
                        { text: "Sew Plan Date", text2: "非实单", state: false },
                        { text: "Delivery Date", text2: "实单", state: false }
                    ]
                },
                {
                    title: "Group", title2: "分组", rowstate: true, allstate: false, but: false, arrow: false,
                    list: [
                        { text: "By Color", text2: "区分颜色", state: false }]
                },
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
                { title: "Lines", title2: "生产线", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                {
                    title: "Sort Order", title2: "排序方式", rowstate: true, allstate: false, but: false, arrow: false,
                    list: [
                        { text: "Ranking", text2: "按名次", state: false },
                        { text: "Line", text2: "按生产线", state: false }
                    ]
                },
                {
                    title: "Date", title2: "车缝开始日", rowstate: true, allstate: false, but: false, arrow: false,
                    list: []
                }
            ]
        },

        {
            data: [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Floor", title2: "车间", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                {
                    title: "Firm Order or not", title2: "是否实单", rowstate: true, allstate: false, but: false, arrow: false,
                    list: [
                        { text: "Sew Plan Date", text2: "非实单", state: false },
                        { text: "Delivery Date", text2: "实单", state: false }
                    ]
                },
                {
                    title: "Date", title2: "车缝计划时间", rowstate: true, allstate: false, but: false, arrow: false,
                    list: []
                }
            ]
        },

        {
            data: [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Floor", title2: "车间", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Line", title2: "生产线", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                {
                    title: "Grouping condition", title2: "分组条件", rowstate: true, allstate: false, but: false, arrow: true,
                    list: [
                        { text: "Factory", text2: "工厂", state: false },
                        { text: "Floor", text2: "车间", state: false },
                        { text: "Line", text2: "生产线", state: false },
                        { text: "Line+Rank", text2: "生产线+班次分组", state: false },
                        { text: "+Fty Style", text2: "+本厂款号", state: false }
                    ]
                },
                {
                    title: "Display Mode", title2: "显示方式", rowstate: true, allstate: false, but: false, arrow: true,
                    list: [
                        { text: "Date", text2: "按日期", state: false },
                        { text: "Month", text2: "按月份", state: false }
                    ]
                },
                { title: "Date", title2: "日期", rowstate: true, allstate: false, but: false, arrow: false, list: [] }
            ]
        },

        {
            data: [
                { title: "Factory", title2: "工厂", rowstate: true, allstate: false, but: true, arrow: true, list: [] },
            ]
        },
        {
            data: [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Floor", title2: "车间", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Style", title2: "选择大类", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Production Date", title2: "日期", rowstate: true, allstate: false, but: false, arrow: false, list: [] }
            ]
        },
        {
            data: [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Floor", title2: "车间", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Style", title2: "选择大类", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Production Date", title2: "日期", rowstate: true, allstate: false, but: false, arrow: false, list: [] }
            ]
        },
        {
            data: [
                { title: "Factory", title2: "工厂", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Floor", title2: "车间", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Style", title2: "选择大类", rowstate: false, allstate: false, but: true, arrow: true, list: [] },
                { title: "Production Date", title2: "日期", rowstate: true, allstate: false, but: false, arrow: false, list: [] }
            ]
        }
    ]
    public datas = [];
    public today = new Date();
    public t = this.today.getTime() + 1000 * 60 * 60 * 720;
    public EndDate = new Date(this.t).toLocaleDateString();
    public StartDate = this.today.toLocaleDateString();
    public datecontainer = true;
    ngOnInit() {
        this.id = this.routerIonfo.snapshot.params["id"];
        this.Language = localStorage.getItem("language");
        if (this.id == 0 && this.Language == "en") this.title = 'JO Tracking';
        if (this.id == 0 && this.Language == "cn") this.title = '生产跟催查询';
        if (this.id == 1 && this.Language == "en") this.title = 'Daily Scheduling Output';
        if (this.id == 1 && this.Language == "cn") this.title = '日计划产量';
        if (this.id == 2 && this.Language == "en") this.title = 'Weekly Running Schedule Report';
        if (this.id == 2 && this.Language == "cn") this.title = '滚动生产排期';
        if (this.id == 4 && this.Language == "en") this.title = 'JO Details Analysis';
        if (this.id == 4 && this.Language == "cn") this.title = '生产单明细分析';
        if (this.id == 3 && this.Language == "en") this.title = 'Line Efficiency';
        if (this.id == 3 && this.Language == "cn") this.title = '生产线效率';
        if (this.id == 5 && this.Language == "en") this.title = 'Embroidery Printing Process Plan';
        if (this.id == 5 && this.Language == "cn") this.title = '印绣花工序';
        if (this.id == 6 && this.Language == "en") this.title = 'Sewing Process Plan';
        if (this.id == 6 && this.Language == "cn") this.title = '车缝';
        if (this.id == 7 && this.Language == "en") this.title = 'Washing Process Plan';
        if (this.id == 7 && this.Language == "cn") this.title = '洗水';
        if (this.id == 4) this.datecontainer = false;
        this.datas = this.lists[this.id].data;
        if (this.Language == "en") this.placeholder = "input number or style to query";
        this.Init();
    }
    Init() {
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
                    for (let b = 0; b < data[i].Shops.length; b++) {
                        let floor: any = {
                            'id': data[i].Shops[b].WId,
                            'text2': data[i].Shops[b].ShopName,
                            'text': data[i].Shops[b].ShopName,
                            'state': false
                        };
                        if (this.id == 1 || this.id == 2) this.datas[1].list.push(floor);
                        if (this.id == 1 || this.id == 3) {
                            for (let c = 0; c < data[i].Shops[b].Lines.length; c++) {
                                let line: any = {
                                    'id': data[i].Shops[b].Lines[c]['LId'],
                                    'text2': data[i].Shops[b].Lines[c]['LineName'],
                                    'text': data[i].Shops[b].Lines[c]['LineName'],
                                    'state': false
                                };
                                this.datas[2].list.push(line);
                            }
                        }
                    }
                }
            }
        })
        if (this.id == 5 || this.id == 6 || this.id == 7) {
            this.service.http_get('/api/OuterFactory/GetProductTypes', false).subscribe((data: any) => {
                if (data.length > 0) {
                    this.datas[2].list = data;
                }
            })
        }
    }
    On_Off(allstate, i) {
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
    Query() {
        if (this.id == 0) {
            this.router.navigate(['joList', JSON.stringify({ "start": this.StartDate, "end": this.EndDate })]);
        }
        if (this.id == 1) this.router.navigate(['resultComparison']);
        if (this.id == 2) this.router.navigate(['scheduleList']);
        if (this.id == 3) { };
        if (this.id == 4) {
            let fids = "";
            for (let i = 0; i < this.datas[0].list.length; i++) {
                let fid = i == this.datas[0].list.length - 1 ? this.datas[0].list[i].id : this.datas[0].list[i].id + ",";
                fids += fid;
            }
            console.log("fids:" + fids)
            this.router.navigate(['detailAnalysisList', JSON.stringify({ "fids": fids })]);
        }
        if (this.id == 5 || this.id == 6 || this.id == 7) {
            let fids = "";
            for (let i = 0; i < this.datas[0].list.length; i++) {
                let fid = i == this.datas[0].list.length - 1 ? this.datas[0].list[i].id : this.datas[0].list[i].id + ",";
                fids += fid;
            }
            console.log("fids:" + fids)
            this.router.navigate(['outProcess', JSON.stringify({ "fids": fids,start:this.StartDate,end:this.EndDate,id:this.id })]);
        }
    }
}
