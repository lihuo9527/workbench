import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-unanswered',
    templateUrl: './unanswered.component.html',
    styleUrls: ['./unanswered.component.css']
})
export class UnansweredComponent implements OnInit {

    constructor(private service: AppService, private router: Router, private routerIonfo: ActivatedRoute, ) { }
    public language;
    public title;
    public datas = [];
    public state;
    public id;
    public placeholder;
    public input;
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.id = this.routerIonfo.snapshot.params["id"];
        this.title = this.language == "cn" ? "未回复的计划" : "Unanswered Plan";
        this.placeholder = this.language == "cn" ? "款号/JO/PO 查询" : "input style/JO/PO to query";
        this.updateList();
    }
    updateList($event?) {
        if ($event == 'search' && !this.input) return;
        let pageIndex = Math.ceil(this.datas.length / 4) + 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4' + "&nodeId=" + this.id;
        if (this.input) option += "&code=" + this.input;
        this.service.http_get('/api/OuterFactory/UnansweredPlanList?' + option, false).subscribe((data: any) => {
            console.log(data);
            if (data.msg == "success") {
                if ($event == "add") {
                    let obj = data.result.listInfo;
                    obj.forEach(element => {
                        this.datas.push(element);
                    });
                } else {
                    this.datas = data.result.listInfo;
                }
            }
        })
    }
    Link(item) {
        this.router.navigate(['unansweredEntry', JSON.stringify({ data: item, title: this.title })]);
    }
}
