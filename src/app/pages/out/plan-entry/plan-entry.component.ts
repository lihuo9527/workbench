import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-plan-entry',
    templateUrl: './plan-entry.component.html',
    styleUrls: ['./plan-entry.component.css']
})
export class PlanEntryComponent implements OnInit {

    constructor(private routerIonfo: ActivatedRoute, private service: AppService, private router: Router) { }
    public datas;
    public data;
    public Language;
    public title;
    public state;
    public date = "Select start date";
    public total;
    public dayAmount;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.datas = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.title = this.datas.title;
        this.data = this.datas.data;
        console.log(this.datas);
        let json = [
            { role: "外协", contacts: [{ title: "A", names: ["LIHUO", "YUXINSHUAI"] }, { title: "b", names: ["LIHUO", "YUXINSHUAI"] }] },
            { role: "供应商", contacts: [{ title: "A", names: ["LIHUO", "YUXINSHUAI"] }, { title: "b", names: ["LIHUO", "YUXINSHUAI"] }] }
        ];
    }
    Next() {
        if (this.total > 0 && this.dayAmount > 0 && this.date != "Select start date") {
            this.router.navigate(['selectingSuppliers', JSON.stringify({ total: this.total, date: this.date, dayAmount:this.dayAmount,code:this.data.code})])
        }else{
            alert("请填写完整信息！")
        }
    }

    backDate($event) {
        let obj = JSON.parse($event);
        if (obj.date) {
            this.date = obj.date;
        }
        this.state = false;
    }
}
