import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
import { ViewChild } from '@angular/core';
@Component({
    selector: 'app-schedule-entry',
    templateUrl: './schedule-entry.component.html',
    styleUrls: ['./schedule-entry.component.css']
})
export class ScheduleEntryComponent implements OnInit {
    @ViewChild('NumberInput') input;
    constructor(
        private service: AppService,
        private routerIonfo: ActivatedRoute, ) { }
    public Language;
    public data;
    public tabstate;
    public DateState;
    public date;
    public allstate;
    public state;
    public color_tabs = [];
    public green_show = 0;
    public number;
    public title;
    public title2;
    public placeholder;
    public DateName;
    ngOnInit() {
        this.data = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.Language = localStorage.getItem("language");
        this.placeholder = this.Language == 'cn' ? "输入完成数量" : "Input completed qty";
        this.date = this.Language == 'cn' ? "选择生产日期" : "Select production date";
        if (this.data.Pid == "progress") {
            this.title = "Production Daily Progress";
            this.title2 = "日进度数录入";
            this.service.http_get('/api/Schedule/GetPlanScheduleData?poid=' + this.data.id + '&planId=' + this.data.ProductionEventID, false).subscribe((data:any) => {
                console.log(data)
                this.color_tabs = data;
            })
        }
        if (this.data.Pid == "non-process") {
            this.title = "Non-Planing Process Entry";
            this.title2 = "非排产工序进度录入";
            this.service.http_get('/api/Schedule/GetScheduleData?poid=' + this.data.id + '&processId=' + this.data.ProductionEventID, false).subscribe((data:any) => {
                console.log(data)
                this.color_tabs = data;
            })
        }
        console.log(this.data)

    }
    change() {
        console.log(this.color_tabs)
    }
    backDate($event) {
        let obj = JSON.parse($event);
        if (obj.date) {
            this.date = obj.date;
        }
        this.state = false;
    }
    showDate(event) {
        this.state = true;
    }
    InputFocus() {
        this.input.nativeElement.focus();
    }
    Save() {
        if (!this.tabstate) {
            let IsProCompleted = this.allstate ? 1 : 0;
            let data = {
                "ProductionEventId": this.data.ProductionEventID,
                "LineId": this.data.LineID,
                "PoId": this.data.id,
                "ProceesId": 0,
                "ProDate": this.date,
                "IsProCompleted": IsProCompleted,
                "ProDatas": []
            }
            for (let i = 0; i < this.color_tabs.length; i++) {
                for (let b = 0; b < this.color_tabs[i].SizeCompletes.length; b++) {
                    if (this.color_tabs[i].SizeCompletes[b].Amount > 0) {
                        let json = {
                            "Color": this.color_tabs[i].Color,
                            "Size": this.color_tabs[i].SizeCompletes[b].Size,
                            "Amount": this.color_tabs[i].SizeCompletes[b].Amount
                        };
                        data.ProDatas.push(json);
                    }
                }
            }
            console.log(JSON.stringify(this.color_tabs))
            this.service.http_post('/api/Schedule/AddPlanScheduleDaily', JSON.stringify(data), false).subscribe((data:any) => {
                if(data.IsSuccess==1)alert("提交成功！")
                console.log(data);
            })
        } else {
            let data = "ProductionEventId=" +  this.data.ProductionEventID + "&lineId=" + this.data.LineID + "&poId=" + this.data.id + "&proDate=" + this.date + "&amount=" + this.number;
            this.service.http_post('/api/Schedule/AddPlanScheduleByPo', data, false,"form").subscribe((data:any) => {
                if(data.IsSuccess==1)alert("提交成功！")
                console.log(data);
            })

        }
    }

}
