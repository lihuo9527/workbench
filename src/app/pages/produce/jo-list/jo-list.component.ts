import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-jo-list',
    templateUrl: './jo-list.component.html',
    styleUrls: ['./jo-list.component.css']
})
export class JoListComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute, private router: Router) { }
    public Language;
    public lists = [];
    public data;
    public jolist = [];
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.data = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.GetList(1);
    }
    GetList(index?) {
        let pageIndex = Math.ceil(this.jolist.length / 4 + 1);
        this.service.http_get("/api/ReportPoProgress/GetPlanPoes?pageIndex=" + pageIndex + "&pageSize=4&star=" + this.data.start + "&end=" + this.data.end, false).subscribe((data:any) => {
            if (index != undefined) {
                if (data.length > 0) this.jolist = data;
            } else {
                this.service.up_date(this.jolist, data);
            }
        })
    }
    Link(item) {
        this.router.navigate(['joTabs', JSON.stringify(item)])
    }
}
