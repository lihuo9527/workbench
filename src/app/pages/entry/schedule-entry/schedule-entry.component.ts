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
    public color_tabs: any = [];
    public green_show = 0;
    public number;
    public title;
    public title2;
    public placeholder;
    public DateName;
    public process;
    public selectstate;
    public processName;
    public processId;
    public message = {
        state: false,
        btnText: "OK",
        msg: ""
    }
    ngOnInit() {
        this.data = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.Language = localStorage.getItem("language");
        this.placeholder = this.Language == 'cn' ? "输入完成数量" : "Input completed qty";
        this.date = this.Language == 'cn' ? "选择生产日期" : "Select production date";
        if (this.data.Pid == "progress") {
            this.title = "Production Daily Progress";
            this.title2 = "日进度数录入";
            this.service.http_get('/api/Schedule/GetPlanScheduleData?poid=' + this.data.id + '&planId=' + this.data.ProductionEventID, false).subscribe((data: any) => {
                console.log(data)
                this.color_tabs = data;
            })
        }
        if (this.data.Pid == "non-process") {
            this.color_tabs = { CompleteAmount: '', ProDataCompletedList: [] }
            this.title = "Non-Planing Process Entry";
            this.title2 = "非排产工序进度录入";

            this.service.http_get('/api/Schedule/GetPoProcess?poId=' + this.data.id, false).subscribe((data: any) => {
                console.log(data)
                this.process = data;
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
    showDate() {
        this.state = true;
    }
    InputFocus() {
        this.input.nativeElement.focus();
    }
    switch(id, name) {
        this.processId = id;
        this.processName = name;
        this.selectstate = false;
        this.service.http_get('/api/Schedule/GetScheduleData?poid=' + this.data.id + '&processId=' + id, false).subscribe((data: any) => {
            console.log(data)
            this.color_tabs = data;
        })
    }
    Save() {
        if (this.data.Pid == "non-process") {
            if (!this.tabstate) {
                let IsProCompleted = this.allstate ? 1 : 0;
                let data = {
                    "ProceesId": this.processId,
                    "PoId": this.data.id,
                    "ProDate": this.date,
                    "IsProCompleted": IsProCompleted,
                    "ProDatas": []
                }
                this.color_tabs.ProDataCompletedList.forEach((element, i) => {
                    element.SizeCompletes.forEach(el => {
                        if (el.Amount > 0) {
                            let json = {
                                "Color": element.Color,
                                "Size": el.Size,
                                "Amount": el.Amount
                            };
                            data.ProDatas.push(json);
                        }
                    });
                });
                console.log(JSON.stringify(data))
                if (this.processId && parseInt(this.date) > 0) {
                    console.log(this.processId)
                    this.service.http_post('/api/Schedule/AddScheduleDaily', JSON.stringify(data), false).subscribe((data: any) => {
                        if (data.IsSuccess == 1) {
                            this.service.messageBox(this.message, "保存成功！");
                        } else {
                            this.service.messageBox(this.message, data.ErrMessage);
                        }
                        console.log(data);
                    }, error => {
                        this.service.messageBox(this.message, "提交失败！");
                    })
                } else {
                    this.service.messageBox(this.message, "请先选择工序或日期！");
                }

            } else {
                if (this.processId && parseInt(this.date) > 0) {
                    let data = "processId=" + this.processId + "&poId=" + this.data.id + "&proDate=" + this.date + "&amount=" + this.number;
                    this.service.http_post('/api/Schedule/AddScheduleByPo', data, false, "form").subscribe((data: any) => {
                        if (data.IsSuccess == 1) {
                            this.service.messageBox(this.message, "保存成功！");
                        } else {
                            this.service.messageBox(this.message, data.ErrMessage);
                        }
                        console.log(data);
                    }, error => {
                        this.service.messageBox(this.message, "提交失败！");
                    })
                } else {
                    this.service.messageBox(this.message, "请先选择工序或日期！");
                }
            }
        } else {
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

                this.color_tabs.forEach((element, i) => {
                    element.SizeCompletes.forEach(el => {
                        if (el.Amount > 0) {
                            let json = {
                                "Color": element.Color,
                                "Size": el.Size,
                                "Amount": parseInt(el.Amount)
                            };
                            data.ProDatas.push(json);
                        }
                    });
                });
                console.log(JSON.stringify(this.color_tabs))
                this.service.http_post('/api/Schedule/AddPlanScheduleDaily', JSON.stringify(data), false).subscribe((data: any) => {
                    if (data.IsSuccess == 1) {
                        this.service.messageBox(this.message, "保存成功！");
                    } else {
                        this.service.messageBox(this.message, data.ErrMessage);
                    }
                }, error => {
                    this.service.messageBox(this.message, "提交失败！");
                })
            } else {
                let data = "ProductionEventId=" + this.data.ProductionEventID + "&lineId=" + this.data.LineID + "&poId=" + this.data.id + "&proDate=" + this.date + "&amount=" + this.number;
                this.service.http_post('/api/Schedule/AddPlanScheduleByPo', data, false, "form").subscribe((data: any) => {
                    if (data.IsSuccess == 1) {
                        this.service.messageBox(this.message, "保存成功！");
                    } else {
                        this.service.messageBox(this.message, data.ErrMessage);
                    }
                }, error => {
                    this.service.messageBox(this.message, "提交失败！");
                })

            }
        }

    }
}
