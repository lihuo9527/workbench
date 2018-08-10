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
    public loading: boolean = false;
    public disabled = false;
    public inputs = [
        { name: "Work hour", name2: "消耗工时", placeholder: "input the time", placeholder2: "输入工时", number: "" },
        { name: "Worker", name2: "人数", placeholder: "input the number", placeholder2: "输入人数", number: "" },
        { name: "Pass Rate", name2: "合格率", placeholder: "input the rate", placeholder2: "输入合格率", number: "" }
    ];
    public message = {
        state: false,
        btnText: "OK",
        msg: ""
    }
    public texts = ["请先选择工序/填写完整信息！", "提交失败,请填写完整信息！", "保存成功！", "提交失败！", "提交失败,有进度数时工时不能为0！", "提交失败,提交的信息出现非法字符串！"];
    ngOnInit() {
        this.data = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.language = localStorage.getItem("language");
        this.placeholder = this.language == 'cn' ? "输入完成数量" : "Input completed qty";
        this.date = this.language == 'cn' ? "选择生产日期" : "Select production date";
        this.color_tabs = { CompleteAmount: '', ProDataCompletedList: [] };
        if (this.language == "en") {
            this.texts[0] = "Please select the process first /Fill in the complete information";
            this.texts[1] = "The submission failed, please fill in the complete information";
            this.texts[2] = "Saved successfully";
            this.texts[3] = "The submission faile";
            this.texts[4] = "The submission failed, and the work time cannot be 0 when there is a progress count.";
            this.texts[5] = "The submission failed, and the submitted information had an illegal character."
        }
        if (this.data.Pid == "progress") {
            // let today = new Date();
            // let t = today.getTime() - 1000 * 60 * 60 * 24;
            // this.date = new Date(t).toLocaleDateString();
            this.title = this.language == 'cn' ? "生产日进度" : "Production Daily Progress";
            this.service.http_get('/api/Schedule/GetPlanScheduleData?poid=' + this.data.id + '&planId=' + this.data.ProductionEventID + '&lineId=' + this.data.LineID, false).subscribe((data: any) => {
                console.log(data)
                this.color_tabs = data;
                this.date = data.ProTime;
                this.inputs[0].number = data.WorkHours;
                this.inputs[1].number = data.WorkerAmount;
                this.inputs[2].number = "100";

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
        this.service.http_get('/api/Schedule/GetLineDefaultDuration?lineId=' + this.data.LineID + '&proDate=' + this.date, false)
            .subscribe((data: any) => {
                this.inputs[0].number = data.WorkHours;
            });
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
        let IsProCompleted = this.allstate ? 1 : 0;
        //非排产工序
        if (this.data.Pid == "non-process") {
            if (!this.tabstate) {
                //按颜色尺码录入
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
                if (!this.processId) {
                    this.service.messageBox(this.message, this.texts[0]);
                    return;
                }
                if (submitstate == false) {
                    this.service.messageBox(this.message, this.texts[1]);
                    return;
                }

                console.log(JSON.stringify(data))
                if (this.processId && parseInt(this.date) > 0) {
                    console.log(this.processId)
                    this.loading = true;
                    this.service.http_post('/api/Schedule/AddScheduleDaily', JSON.stringify(data), false).subscribe((data: any) => {
                        this.loading = false;
                        if (data.IsSuccess == 1) {
                            this.service.messageBox(this.message, this.texts[2]);
                        } else {
                            this.filterMessage(data);
                        }
                        console.log(data);
                    }, error => {
                        this.loading = false;
                        this.service.messageBox(this.message, this.texts[3]);
                    })
                } else {
                    this.service.messageBox(this.message, this.texts[0]);
                }

            } else {
                //按订单录入
                if (this.processId && parseInt(this.date) > 0 && !isNaN(this.number)) {
                    let option = "processId=" + this.processId + "&poId=" + this.data.id + "&proDate=" + this.date + "&amount=" + this.number;
                    this.loading = true;
                    this.service.http_post('/api/Schedule/AddScheduleByPo', option, false, "form").subscribe((data: any) => {
                        this.loading = false;
                        if (data.IsSuccess == 1) {
                            this.service.messageBox(this.message, this.texts[2]);
                        } else {
                            this.filterMessage(data);
                        }
                        console.log(data);
                    }, error => {
                        this.loading = false;
                        this.service.messageBox(this.message, this.texts[3]);
                    })
                } else {
                    this.service.messageBox(this.message, this.texts[0]);
                }
            }
        }

        //生产日进度
        if (this.data.Pid == "progress") {
            if (!this.tabstate) {
                //按颜色尺码录入
                let data = {
                    "ProductionEventId": this.data.ProductionEventID,
                    "LineId": this.data.LineID,
                    "PoId": this.data.id,
                    "ProceesId": 0,
                    "ProDate": this.date,
                    "IsProCompleted": IsProCompleted,
                    "ProDatas": [],
                    "WorkerAmount": this.inputs[1].number,
                    "WorkHours": this.inputs[0].number,
                    "FPY": this.inputs[2].number
                }
                this.color_tabs.ProDataCompletedList.forEach(element => {
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
                console.log(isNaN(parseInt(this.date)));
                if (submitstate && Number(this.inputs[0].number) <= 0) {
                    this.service.messageBox(this.message, this.texts[4]);
                    return;
                }
                if (submitstate == false || Number(this.inputs[0].number) <= 0 || Number(this.inputs[1].number) <= 0 || Number(this.inputs[2].number) <= 0 || isNaN(parseInt(this.date))) {
                    if (!this.allstate) {
                        this.service.messageBox(this.message, this.texts[1]);
                        return;
                    }
                }
                if (!this.checkNumber(this.inputs[1].number) || !this.checkNumber(this.inputs[2].number) || !this.checkNumber(this.inputs[0].number)) {
                    this.service.messageBox(this.message, this.texts[5]);
                    return;
                }
                // console.log(JSON.stringify(this.color_tabs))
                this.loading = true;
                this.service.http_post('/api/Schedule/AddPlanScheduleDaily', JSON.stringify(data), false).subscribe((data: any) => {
                    this.loading = false;
                    if (data.IsSuccess == 1) {
                        this.service.messageBox(this.message, this.texts[2]);
                        if (this.allstate) this.disabled = true;
                    } else {
                        this.filterMessage(data);
                    }
                }, error => {
                    this.loading = false;
                    this.service.messageBox(this.message, this.texts[3]);
                })
            } else {
                //按订单录入
                if (this.number > 0 && Number(this.inputs[0].number) <= 0) {
                    this.service.messageBox(this.message, this.texts[4]);
                    return;
                }
                if (Number(this.inputs[0].number) <= 0 || Number(this.inputs[1].number) <= 0 || Number(this.inputs[2].number) <= 0 || isNaN(parseInt(this.date)) || isNaN(this.number)) {
                    if (!this.allstate) {
                        this.service.messageBox(this.message, this.texts[1]);
                        return;
                    }
                }
                if (!this.checkNumber(this.inputs[1].number) || !this.checkNumber(this.inputs[2].number) || !this.checkNumber(this.inputs[0].number)) {
                    this.service.messageBox(this.message, this.texts[5]);
                    return;
                }
                let option = "ProductionEventId=" + this.data.ProductionEventID + "&lineId=" + this.data.LineID + "&poId=" + this.data.id + "&proDate=" + this.date + "&amount=" + this.number + "&WorkerAmount=" + this.inputs[1].number + "&WorkHours=" + this.inputs[0].number + "&FPY=" + this.inputs[2].number + "&isProCompleted=" + IsProCompleted;
                this.loading = true;
                this.service.http_post('/api/Schedule/AddPlanScheduleByPo', option, false, "form").subscribe((data: any) => {
                    this.loading = false;
                    if (data.IsSuccess == 1) {
                        this.service.messageBox(this.message, this.texts[2]);
                        if (this.allstate) this.disabled = true;
                    } else {
                        this.filterMessage(data);
                    }
                }, error => {
                    this.loading = false;
                    this.service.messageBox(this.message, this.texts[3]);
                })

            }
        }

    }
    checkNumber(number: string) {
        var reg = /^[0-9]+\.?[0-9]+?$/;
        if (reg.test(number)) {
            return true;
        }
        return false;
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
    filterMessage(obj) {
        obj.ErrMessage.forEach(element => {
            if (this.language == element.Lang) {
                this.service.messageBox(this.message, element.Message);
            }
        });
    }

}
