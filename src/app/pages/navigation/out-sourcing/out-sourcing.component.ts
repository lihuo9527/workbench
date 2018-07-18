import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-out-sourcing',
    templateUrl: './out-sourcing.component.html',
    styleUrls: ['./out-sourcing.component.css']
})
export class OutSourcingComponent implements OnInit {

    constructor(private router: Router, private service: AppService) { }
    public language;
    public plans = { status: 200, msg: "success", result: { resultInfo: [] } };
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.service.http_get("/api/OuterFactory/PlanCount", false).subscribe((data: any) => {
            if (data.result.resultInfo.length > 0) this.plans = data.result.resultInfo;
            console.log(data);
        })
    }
    link(link, id) {
        this.router.navigate([link, id])
    }
}
