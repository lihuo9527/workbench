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
    public language;
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
    public floorselectstate = false;
    public lineselectstate;
    public processName;
    public floorName;
    public lineName;
    public processId;
    public floorData;
    public lineData;
    public floorId;
    public lineId;
    public shops;
    public time;
    public peoples;
    public rate;
    public inputs = [
        { name: "Time Consuming", name2: "消耗工时", placeholder: "input the time", placeholder2: "输入工时", number: "" },
        { name: "Number of people", name2: "人数", placeholder: "input the number", placeholder2: "输入人数", number: "" },
        { name: "Qualification Rate", name2: "合格率", placeholder: "input the rate", placeholder2: "输入合格率(百分比)", number: "" }
    ];
    public message = {
        state: false,
        btnText: "OK",
        msg: ""
    }
    ngOnInit() {
        this.data = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.language = localStorage.getItem("language");
        this.placeholder = this.language == 'cn' ? "输入完成数量" : "Input completed qty";
        this.date = this.language == 'cn' ? "选择生产日期" : "Select production date";
        this.color_tabs = { CompleteAmount: '', ProDataCompletedList: [] };
        if (this.data.Pid == "progress") {
            this.title = this.language == 'cn' ? "生产日进度" : "Production Daily Progress";
            this.service.http_get('/api/Schedule/GetPlanScheduleData?poid=' + this.data.id + '&planId=' + this.data.ProductionEventID, false).subscribe((data: any) => {
                console.log(data)
                this.color_tabs = data;
            })
        }
        if (this.data.Pid == "non-process") {
            this.title = this.language == 'cn' ? "非排产工序日进度" : "Non-Planing Process Entry";
            this.processName = this.language == 'cn' ? "工序" : "Process";
            this.floorName = this.language == 'cn' ? "车间" : "Floor";
            this.lineName = this.language == 'cn' ? "产线" : "Line";
            this.service.http_get('/api/Schedule/GetPoProcess?poId=' + this.data.id, false).subscribe((data: any) => {
                this.process = data;
            })
            this.service.http_get('/api/Schedule/GetScheduleWorkshop?poid=' + this.data.id, false)
                .subscribe((data: any) => {
                    this.shops = data;
                    this.floorData = this.shops.Shops;
                });

        }
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
            this.color_tabs = data;
        });
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
                    "ProDatas": [],
                    "WorkShopId": this.floorId,
                    "LineId": this.lineId
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
                let submitstate = false;
                data.ProDatas.forEach(element => {
                    if (element.Amount > 0) submitstate = true;
                })
                if (submitstate == false) {
                    this.service.messageBox(this.message, "提交失败,请填写完整信息！");
                    return;
                }
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
                    element.SizeCompletes.forEach((el, index) => {
                        if (el.Amount > 0) {
                            let json = {
                                "Color": element.Color,
                                "Size": el.Size,
                                "Amount": parseInt(el.Amount)
                            }
                            data.ProDatas.push(json);
                        };
                    });
                });
                let submitstate = false;
                data.ProDatas.forEach(element => {
                    if (element.Amount > 0) submitstate = true;
                })
                if (submitstate == false) {
                    this.service.messageBox(this.message, "提交失败,请填写完整信息！");
                    return;
                }
                // console.log(JSON.stringify(this.color_tabs))
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
    alert(message) {
        this.message.msg = message;
        this.message.state = true;
        this.message.btnText = "OK";
    }
    getProcess() {
        this.selectstate = !this.selectstate;
        this.floorselectstate = false;
        this.lineselectstate = false;
    }
    getFloor() {
        this.selectstate = false;
        this.lineselectstate = false;
        this.floorselectstate = !this.floorselectstate;
    }
    getLines() {
        this.lineselectstate = !this.lineselectstate;
        this.selectstate = false;
        this.floorselectstate = false;
    }
    showLines(shopName, key, id) {
        this.floorselectstate = !this.floorselectstate;
        this.floorName = shopName;
        this.floorId = id;
        this.lineData = this.shops.Shops[key].Lines;
    }
}
