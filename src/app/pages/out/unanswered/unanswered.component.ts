import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-unanswered',
    templateUrl: './unanswered.component.html',
    styleUrls: ['./unanswered.component.css']
})
export class UnansweredComponent implements OnInit {

    constructor(private service: AppService, private router: Router) { }
    public Language;
    public title = 'Unanswered Plan';
    public datas = [];
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this. UpdateList();
    }
    UpdateList() {
        let pageIndex = Math.ceil(this.datas.length / 4) + 1;
        this.service.http_get('/api/OuterFactory/UnansweredPlanList?pageIndex=' + pageIndex + '&pageSize=4', false).subscribe((data: any) => {
            if (data.msg == "success") {
                let obj = data.result.listInfo;
                obj.forEach(element => {
                    this.datas.push(element);
                });
            }
        })
    }
    Link(item){
        this.router.navigate(['planEntry', JSON.stringify({data:item,title:this.title})]);
    }
}
