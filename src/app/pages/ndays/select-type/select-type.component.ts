import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-select-type',
    templateUrl: './select-type.component.html',
    styleUrls: ['./select-type.component.css']
})
export class SelectTypeComponent implements OnInit {

    constructor(private routerIonfo: ActivatedRoute, private service: AppService, private router: Router) { }
    public Language;
    public id;
    public title: string;
    public state: boolean;
    public placeholder = "输入单号或款号查询";
    public input: string;
    public datecontainer = true;
    public selectType = -1;
    public datas = [
        { name: "主料", name2: "主料", state: false },
        { name: "辅料", name2: "辅料", state: false }
    ];
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        console.log("id", this.id);
    }
    select(Type) {
        this.selectType = this.selectType == Type ? -1 : Type;
    }
    query() {
        localStorage.setItem("filter", JSON.stringify({ 'id': this.id, "input": this.input }));
        this.router.navigate(['ndays/materialArrival', this.selectType]);

    }
}
