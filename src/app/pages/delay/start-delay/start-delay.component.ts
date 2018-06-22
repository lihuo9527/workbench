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
        localStorage.setItem("filter", JSON.stringify({ input: '' }));
        this.Language = localStorage.getItem("language");
        this.UpdateList();
    }
    UpdateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4';
        if ($event) {
            if ($event.fids) option += '&fids=' + $event.fids;
        }
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/TaskWarn/GetDetailStartDelay?' + option, false).subscribe((data: any) => {
            if ($event != 'add') {
                data.forEach(element => {
                    element["arrow"] = false
                });
                this.datas = data;
            } else {
                data.forEach(element => {
                    element["arrow"] = false
                    this.datas.push(element);
                });
            }
        })
    }
}
