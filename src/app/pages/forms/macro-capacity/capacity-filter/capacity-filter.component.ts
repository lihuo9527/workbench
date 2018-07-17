import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AppService } from '../../../../app.service';

@Component({
    selector: 'app-capacity-filter',
    templateUrl: './capacity-filter.component.html',
    styleUrls: ['./capacity-filter.component.css']
})
export class CapacityFilterComponent implements OnInit {

    @Output() public envet: EventEmitter<any> = new EventEmitter<any>();
    constructor(private service: AppService, ) { }
    public allstate: boolean;
    public rowstate: boolean;
    public dateType: number;

    public month: number = 1;
    public waterLeft: number = 0;
    public progressWidth: number;

    public state: boolean = false;
    public datas: any = [
        {
            title: 'Factory', title2: '工厂', rowstate: true, allstate: false, but: true, arrow: true, list: []
        },
        {
            title: 'Cycle', title2: '周期', rowstate: true, allstate: false, but: false, arrow: false, list: [
                { text: 'Month', text2: '月', state: false },
                { text: 'Week', text2: '周', state: false },
                { text: 'day', text2: '日', state: false },
            ]
        },
        {
            title: 'Statistical Unit', title2: '统计单位', rowstate: true, allstate: false, but: false, arrow: false,
            list: [
                { text: 'Man*Hrs', text2: '人*工时', state: false },
                { text: 'piece', text2: '件', state: false },
                { text: 'StandardPiece', text2: '标准件', state: false },
            ]
        },
        {
            title: 'Capacity include out', title2: '产量含外协', rowstate: true, allstate: false, but: false, arrow: false,
            list: [
                { text: 'Capacity include out', text2: '产量含外协', state: false },
            ]
        },
        {
            title: 'Load include', title2: '负载含外协', rowstate: true, allstate: false, but: false, arrow: false,
            list: [
                { text: 'Load include', text2: '负载含外协', state: false },
            ]
        },
    ];
    public dates = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    public language;
    public dateshow = true;
    ngOnInit() {
        this.language = localStorage.getItem('language');
        this.dateshow = false;
        this.service.http_get('/api/BaseData/GetFactorys', false).subscribe((data: any) => {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    let json: any = {
                        'id': data[i].itemId,
                        'text': data[i].itemName,
                        'text2': data[i].itemName,
                        'state': false
                    };
                    this.datas[0].list.push(json);
                }
            }
        })
    }
    Back() {
        // filter过渡动漫
        document.getElementById('shadow').style.left = '100%';
        document.getElementById('filter').style.left = '100%';
    }
    on_off(allstate, i, item) {
        // 全部按钮开关改变状态
        this.datas[i].allstate = !this.datas[i].allstate;
        for (let b = 0; b < this.datas[i].list.length; b++) {
            this.datas[i].list[b].state = this.datas[i].allstate;
        }
    }
    change(obj, index, items, n1) {
        // 单选改变状态
        obj.state = !obj.state;
        this.dateType = index;
        if (items.title == 'Cycle' || items.title == 'Statistical Unit') {
            items.list.forEach((element, i) => {
                if (index != i) element.state = false;
            });
        }
    }
    backDate($event) {
        this.month = $event.month;
        this.waterLeft = $event.waterLeft;
        this.progressWidth = $event.progressWidth;
    }
    complete() {
        let obj: any = {};
        let local = JSON.parse(localStorage.getItem('filter'));
        let fids = [];
        if ('delay') {
            console.log(this.month);
            this.datas[0].list.forEach((element, i) => {
                if (element.state == true) fids.push(element.id);
            });
            if (local.input) obj['input'] = local.input;
            if (fids.toString()) obj['fids'] = fids.toString();

        } else if ('material') {
            let type;
            if (this.datas[0].list[0].state && this.datas[0].list[1].state || !this.datas[0].list[0].state && !this.datas[0].list[1].state) type = -1;
            if (this.datas[0].list[0].state && this.datas[0].list[1].state == false) type = 1;
            if (this.datas[0].list[0].state == false && this.datas[0].list[1].state) type = 0;
            if (local.input) obj['input'] = local.input;
            if (type.toString()) obj['type'] = type.toString();
        }
        console.log(JSON.stringify(obj))
        localStorage.setItem('filter', JSON.stringify(obj));
        this.envet.emit(obj);
        this.Back();
    }
}
