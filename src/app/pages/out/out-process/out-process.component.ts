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
    public Language;
    public title;
    public datas = [];
    public state;
    ngOnInit() {
        this.data = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.id = this.data.id;
        console.log(this.id)
        this.Language = localStorage.getItem("language");
        if (this.id == 5 && this.Language == "en") this.title = 'Embroidery Printing Process Plan';
        if (this.id == 5 && this.Language == "cn") this.title = '印绣花工序';
        if (this.id == 6 && this.Language == "en") this.title = 'Sewing Process Plan';
        if (this.id == 6 && this.Language == "cn") this.title = '车缝';
        if (this.id == 7 && this.Language == "en") this.title = 'Washing Process Plan';
        if (this.id == 7 && this.Language == "cn") this.title = '洗水';
        this.UpdateList();
    }
    UpdateList($event?) {
        let local = JSON.parse(localStorage.getItem("filter"));
        let pageIndex = local.input ? 1 : this.datas.length / 4 + 1;
        let option = "";
        if ($event) {
            option = 'pageIndex=' + pageIndex + '&pageSize=4&star=' + $event.StartDate + '&end=' + $event.EndDate;
            if ($event.fids) option += '&fids=' + $event.fids;
            if ($event.wsids) option += '&wsids=' + $event.wsids;
            if ($event.eventid) option += '&eventid=' + $event.eventid;
        } else {
            option = 'pageIndex=' + pageIndex + '&pageSize=4&star=' + local.start + '&end=' + local.end
        }
        if (local.input) option += '&code=' + local.input;
        this.service.http_get('/api/OuterFactory/GetPoes?' + option, false).subscribe((data: any) => {
            if ($event || local.input) {
                this.datas = data;
            } else {
                let obj = data;
                if (obj.length > 0) {
                    for (let i = 0; i < obj.length; i++) {
                        this.datas.push(obj[i]);
                    }
                }
            }

        })
    }
    Link(item) {
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
