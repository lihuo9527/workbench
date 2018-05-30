import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    @Output() public back: EventEmitter<any> = new EventEmitter<any>();
    @Output() public envet: EventEmitter<any> = new EventEmitter<any>();
    @Output() public ReturnData: EventEmitter<any> = new EventEmitter<any>();
    @Input() public Info: string;
    constructor(private service: AppService,
        private routerIonfo: ActivatedRoute, ) { }
    public allstate: boolean;
    public rowstate: boolean;
    public datas = [
        { title: "Factory", title2: "工厂", rowstate: true, allstate: false, but: true, arrow: true, list: [] },
        { title: "Floor", title2: "车间", rowstate: true, allstate: false, but: true, arrow: true, list: [] },
        { title: "Critical Event", title2: "关键事件", rowstate: true, allstate: false, but: true, arrow: true, list: [] },
        {
            title: "Date", title2: "日期", rowstate: true, allstate: false, but: false, arrow: false,
            list: [
                { text: "Sew Plan Date", text2: "车缝开始日", state: false },
                { text: "Delivery Date", text2: "交货期", state: false },
                { text: "Order Confirmed date", text2: "订单确认日", state: false }]
        }

    ];
    public today = new Date();
    public t = this.today.getTime() - 1000 * 60 * 60 * 48;
    public EndDate = this.today.toLocaleDateString();
    public StartDate = new Date(this.t).toLocaleDateString();
    public Language;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.Init();
    }
    Init() {
        this.service.http_get('/api/BaseData/GetFactoryLines', false).subscribe((data:any) => {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    let json: any = {
                        'id': data[i].FId,
                        'text': data[i].FName,
                        'state': false
                    };
                    this.datas[0].list.push(json);
                    for (let b = 0; b < data[i].Shops.length; b++) {
                        let floor: any = {
                            'id': data[i].Shops[b].WId,
                            'text': data[i].Shops[b].ShopName,
                            'state': false
                        };
                        this.datas[1].list.push(floor);
                    }
                }
            }
        })
        if (this.Info == "process") {
            this.service.http_get('/api/BaseData/GetProcesses', false).subscribe((data:any) => {
                if (data.length > 0) {
                    let names = [];
                    for (let i = 0; i < data.length; i++) {
                        let json: any = {
                            'id': data[i].itemId,
                            'text': data[i].itemName,
                            'state': false
                        };
                        names.push({ text: data[i].itemName, state: false })

                        this.datas[2].list.push(json);
                        this.datas[2].title = 'Processes';
                        this.datas[2].title2 = '工序';
                    }
                    this.ReturnData.emit(names);
                }
            })
        } else if (this.Info == "event") {
            this.service.http_get('/api/BaseData/GetEvents', false).subscribe((data:any) => {
                if (data.length > 0) {
                    let names = [];
                    for (let i = 0; i < data.length; i++) {
                        let json: any = {
                            'id': data[i].itemId,
                            'text': data[i].itemName,
                            'state': false
                        };
                        names.push({ text: data[i].itemName, state: false })

                        this.datas[2].list.push(json);
                        this.datas[2].title = 'Event';
                        this.datas[2].title2 = '关键事件';
                    }
                    this.ReturnData.emit(names);
                }
            })
        } else if (this.Info == "line") {
            this.service.http_get('/api/BaseData/GetEvents', false).subscribe((data:any) => {
                if (data.length > 0) {
                    let names = [];
                    for (let i = 0; i < data.length; i++) {
                        let json: any = {
                            'id': data[i].itemId,
                            'text': data[i].itemName,
                            'state': false
                        };
                        names.push({ text: data[i].itemName, state: false })

                        this.datas[2].list.push(json);
                        this.datas[2].title = 'LAine';
                        this.datas[2].title2 = '生产线';
                        this.datas[2].list.push(json);
                    }
                    this.ReturnData.emit(names);
                }
            })
        }

    }
    Back(i?) {
        this.back.emit(false);
    }
    On_Off(allstate, i) {
        this.datas[i].allstate = !this.datas[i].allstate;
        for (let b = 0; b < this.datas[i].list.length; b++) {
            this.datas[i].list[b].state = this.datas[i].allstate;
        }
    }
    BackDate(date, state) {
        if (state == "start") this.StartDate = date;
        if (state == "end") this.EndDate = date;
        console.log(date + state);
    }
    Complete() {
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
        console.log(JSON.stringify({ 'eventid': eventid, 'wsids': wsids, 'fids': fids , 'StartDate': this.StartDate, 'EndDate': this.EndDate }));
        this.envet.emit({ 'eventid': eventid, 'wsids': wsids, 'fids': fids, 'StartDate': this.StartDate, 'EndDate': this.EndDate })
        this.back.emit(false);
    }
}
