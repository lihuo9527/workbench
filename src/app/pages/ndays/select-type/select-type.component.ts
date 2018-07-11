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
    public language;
    public title: string;
    public state: boolean;
    public placeholder = "输入单号或款号查询";
    public input: string;
    public datecontainer = true;
    public selectType = -1;
    public datas = [
        { text: "Fabric", text2: "主料", state: false },
        { text: "Accessories", text2: "辅料", state: false }
    ];
    ngOnInit() {
        this.language = localStorage.getItem("language");
        if (this.language == "en") this.placeholder = "input number or style to query";
        localStorage.setItem("filter", JSON.stringify({ input: '' }));
    }
    query() {
        if (this.datas[0].state && this.datas[1].state || !this.datas[0].state && !this.datas[1].state) this.selectType = -1;
        if (this.datas[0].state && this.datas[1].state == false) this.selectType = 0;
        if (this.datas[0].state == false && this.datas[1].state) this.selectType = 1;
        localStorage.setItem("datas", JSON.stringify([{ title: "Material", title2: "物料", rowstate: true, allstate: false, but: true, arrow: true, list: this.datas }]));
        localStorage.setItem("filter", JSON.stringify({ 'id': 'material', "input": this.input, "type": this.selectType.toString() }));
        this.router.navigate(['ndays/materialArrival']);
    }
}
