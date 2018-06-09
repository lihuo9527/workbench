import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-unfinished',
    templateUrl: './unfinished.component.html',
    styleUrls: ['./unfinished.component.css']
})
export class UnfinishedComponent implements OnInit {

    constructor(private service: AppService, private router: Router) { }
    public Language;
    public title = 'Unfinished Plan';
    public datas = [];
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.UpdateList();
    }
    UpdateList() {
        let pageIndex = Math.ceil(this.datas.length / 4) + 1;
        this.service.http_get('/api/OuterFactory/UndonePlanList?pageIndex=' + pageIndex + '&pageSize=4', false).subscribe((data: any) => {
            if (data.msg == "success") {
                let obj = data.result.listInfo;
                obj.forEach(element => {
                    this.datas.push(element);
                });
            }
        })
    }
    Link(item) {
        this.router.navigate(['planEntry', JSON.stringify({ data: item, title: this.title })]);
    }
}
