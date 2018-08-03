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
    public type;
    public message = {
        state: false,
        btnText: "OK",
        msg: ""
    }
    ngOnInit() {
        this.data = JSON.parse(localStorage.getItem("filter"));
        this.id = this.data.id;
        this.language = localStorage.getItem("language");
        this.title = this.routerIonfo.snapshot.params["title"];
        console.log(this.routerIonfo.snapshot.params["title"])
        this.updateList('init');
    }
    updateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = $event == 'add' ? Math.ceil(this.datas.length / 4 + 1) : 1;
        let object = $event == 'add' || $event == 'search' || $event == 'init' ? local : $event;
        let option = 'pageIndex=' + pageIndex + '&pageSize=4&star=' + object.start + '&end=' + object.end + "&nodeId=" + this.id;
        if (object.fids) option += '&fids=' + object.fids;
        if (object.wsids) option += '&wsids=' + object.wsids;
        if (object.productTypeIds) option += '&productTypeIds=' + object.productTypeIds;
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/OuterFactory/GetPoes?' + option, false).subscribe((data: any) => {
            this.type = data.length > 0 ? 1 : 2;
            if ($event == "add") {
                data.forEach(element => {
                    this.datas.push(element);
                });
            } else {
                this.datas = data;
            }
        })
    }
    link(item) {
        this.router.navigate(['/out/planEntry', JSON.stringify({ data: item, title: this.title })]);
    }
    change(item) {
        let state = item.isEnd == 0 ? 1 : 0;
        let option = 'planId=' + item.planId + "&status=" + state;
        this.service.http_post('/api/OuterFactory/ModifyPlanStatus', option, false, "form").subscribe((data: any) => {
            item.isEnd = state;
            let text = this.language == "cn" ? "修改成功！" : "Successfully modified";
            this.service.messageBox(this.message, text)
        })

    }
}
