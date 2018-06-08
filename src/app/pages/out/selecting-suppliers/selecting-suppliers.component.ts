import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-selecting-suppliers',
    templateUrl: './selecting-suppliers.component.html',
    styleUrls: ['./selecting-suppliers.component.css']
})
export class SelectingSuppliersComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute, private router: Router) { }
    public Language;
    public title;
    public datas;
    public userface = [];
    public data;
    ngOnInit() {
        this.data = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.Language = localStorage.getItem("language");
        this.title = "Selecting Suppliers";
        this.service.http_get('/api/OuterFactory/GetContacts', false).subscribe((data: any) => {
            if (data.msg == "success") {
                this.datas = data;
            }

        })
    }
    show(item, i) {
        item.state = !item.state;
        if (item.state) {
            this.datas.result.contactsList.forEach((element, index) => {
                if (i != index) element.state = false;
            });

        }

    }
    add(user, $event) {
        $event.stopPropagation();
        user.state = !user.state;
        if (user.state) {
            this.userface.push(user);
        } else {
            this.userface.forEach((element, index) => {
                if (user.uid == element.uid) {
                    this.userface.splice(index,1);
                    return;
                }
            });
        }

    }
    send() {
        let fids = [];
        this.userface.forEach((element)=>{
            fids.push(element.uid);
        })
        let option = {
            totalCount:this.data.total,
            startTime:this.data.date,
            dayCount:this.data.dayAmount,
            code:this.data.code,
            ofids:fids
        }
        this.service.http_post("/api/OuterFactory/EntryPlan", option,false).subscribe((data:any)=>{
            if(data.msg=="录入成功"){
               window.history.go(-2);
            }
        })
    }

}
