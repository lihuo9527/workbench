import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
    selector: 'app-detail-analysis-list',
    templateUrl: './detail-analysis-list.component.html',
    styleUrls: ['./detail-analysis-list.component.css']
})
export class DetailAnalysisListComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute, private router: Router) { }
    public Language;
    public data;
    public polist;
    public state;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.data = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.service.http_get("/api/Po/GetPoes?pageIndex=1&pageSize=4&fid=" + this.data.fids, false).subscribe((data:any) => {
            this.polist = [
                {
                    "id": 1,
                    "code": "123456789",
                    "customerid": 0,
                    "customername": "string",
                    "deliverydate": "2018-04-08T02:10:25.073Z",
                    "initDeliveryDate": "2018-04-08T02:10:25.073Z",
                    "workshopDate": "2018-04-08T02:10:25.073Z",
                    "producttype": "string",
                    "pattern": "string",
                    "amount": 1000,
                    "priority": 0,
                    "merchandiser": "string",
                    "StarDate": "2018-04-08T02:10:25.073Z",
                    "EndDate": "2018-04-08T02:10:25.073Z",
                    "CompleteAmount": 0,
                    "MainMaterielArriveDate": "2018-04-08T02:10:25.073Z",
                    "OthMaterielArriveDate": "2018-04-08T02:10:25.073Z",
                    "EventFlowName": "string",
                    "Processes": [
                        {
                            "itemId": 0,
                            "itemName": "string"
                        }
                    ]
                }
            ]
            if (data.length > 0) {
                this.polist = data;
            }

            console.log(this.polist);

        })
    }
    Link(item) {
        this.router.navigate(['detailAnalysis', JSON.stringify(item)])
    }
}
