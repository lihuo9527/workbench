import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-start-delay',
    templateUrl: './start-delay.component.html',
    styleUrls: ['./start-delay.component.css']
})
export class StartDelayComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute, ) { }
    public datas = [
        {
            "ProductionEventID": 0,
            "LineName": "string",
            "Amount": "string",
            "PlanAmount": 0,
            "DeliveryDate": "2018-03-24T16:48:23.218Z",
            "PlanStart": "2018-03-24T16:48:23.218Z",
            "EarliestStartDate": "2018-03-24T16:48:23.218Z",
            "DelayDays": 0,
            "MasterMatFinishDate": "string",
            "NotMasterMatFinishDate": "string",
            "PreProductionEventDate": "string",
            "PoCode": "string",
            "CustomerName": "string",
            "CustomerStyleNO": "string",
            "Pattern": "string",
            "ProductTypeName": "string",
            "Merchandiser": "string",
            "Description": "string",
            "FactoryID": 0,
            "arrow": false
        },
        {
            "ProductionEventID": 0,
            "LineName": "string",
            "Amount": "string",
            "PlanAmount": 0,
            "DeliveryDate": "2018-03-24T16:48:23.218Z",
            "PlanStart": "2018-03-24T16:48:23.218Z",
            "EarliestStartDate": "2018-03-24T16:48:23.218Z",
            "DelayDays": 0,
            "MasterMatFinishDate": "string",
            "NotMasterMatFinishDate": "string",
            "PreProductionEventDate": "string",
            "PoCode": "string",
            "CustomerName": "string",
            "CustomerStyleNO": "string",
            "Pattern": "string",
            "ProductTypeName": "string",
            "Merchandiser": "string",
            "Description": "string",
            "FactoryID": 0,
            "arrow": false
        }
    ]
    public id;
    public Language;
    public url = '/api/TaskWarn/GetDetailStartDelay?';
    public arrow = false;
    public state;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.GetList();
    }
    GetList() {
        this.service.http_get(this.url + 'pageIndex=1&pageSize=4', false).subscribe((data:any) => {
            let obj = data;
            if (obj.length > 0) {
                for (let i = 0; i < obj.length; i++) {
                    obj[i]["arrow"] = false
                }
                this.datas = obj;
            }
        })
    }
    UpdateList() {
        let pageIndex = Math.ceil(this.datas.length / 4 + 1);
        this.service.http_get(this.url + 'pageIndex=' + pageIndex + '&pageSize=4', false).subscribe((data:any) => {
            let obj = data;
            if (obj.length > 0) {
                for (let i = 0; i < obj.length; i++) {
                    obj[i]["arrow"] = false
                    this.datas.push(obj[i]);
                }
            }
        })
    }
}
