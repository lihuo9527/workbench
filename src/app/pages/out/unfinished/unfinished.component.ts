import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-unfinished',
    templateUrl: './unfinished.component.html',
    styleUrls: ['./unfinished.component.css']
})
export class UnfinishedComponent implements OnInit {

    constructor(private service: AppService, private router: Router, private routerIonfo: ActivatedRoute, ) { }
    public language;
    public title = '';
    public datas = [];
    public id;
    public state;
    public placeholder;
    public input;
    public type;
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.title = this.language == "cn" ? "未完成的计划" : "Uncompleted Plan";
        this.placeholder = this.language == "cn" ? "输入单号或款号查询" : "input style/JO/PO to query";
        this.id = this.routerIonfo.snapshot.params["id"];
        this.updateList();
    }
    updateList($event?) {
        if ($event == 'search' && !this.input) return;
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4' + "&nodeId=" + this.id;
        if (this.input) option += "&code=" + this.input;
        this.service.http_get('/api/OuterFactory/UndonePlanList?' + option, false).subscribe((data: any) => {
            this.type = data.length > 0 ? 1 : 2;
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
    link(item) {
        this.router.navigate(['unfinishedEntry', JSON.stringify({ data: item, title: this.title })]);
    }
}
