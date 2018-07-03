import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-out-process',
    templateUrl: './out-process.component.html',
    styleUrls: ['./out-process.component.css']
})
export class OutProcessComponent implements OnInit {

    constructor(private routerIonfo: ActivatedRoute, private service: AppService, private router: Router) { }
    public data;
    public id;
    public language;
    public title;
    public datas = [];
    public state;
    ngOnInit() {
        this.data = JSON.parse(localStorage.getItem("filter"));
        this.id = this.data.id;
        this.language = localStorage.getItem("language");
        this.title = this.routerIonfo.snapshot.params["title"];
        console.log(this.routerIonfo.snapshot.params["title"])
        this.updateList();
    }
    updateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = local.input ? 1 : Math.ceil(this.datas.length / 4 + 1);
        let option = "";
        let object = $event ? $event : local;
        option = 'pageIndex=' + pageIndex + '&pageSize=4&star=' + object.start + '&end=' + object.end
        if (object.fids) option += '&fids=' + object.fids;
        if (object.wsids) option += '&wsids=' + object.wsids;
        if (object.styles) option += '&styles=' + object.styles;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/OuterFactory/GetPoes?' + option, false).subscribe((data: any) => {
            if ($event || local.input) {
                this.datas = data;
            } else {
                data.forEach(element => {
                    this.datas.push(element);
                });
            }
        })
    }
    link(item) {
        this.router.navigate(['planEntry', JSON.stringify({ data: item, title: this.title })]);
    }
    change(item) {
        let state = item.isEnd == 0 ? 1 : 0;
        let option = 'planId=' + item.planId + "&status=" + state;
        this.service.http_post('/api/OuterFactory/ModifyPlanStatus', option, false, "form").subscribe((data: any) => {
            item.isEnd = state;
            alert("修改成功！")
        })

    }
}
