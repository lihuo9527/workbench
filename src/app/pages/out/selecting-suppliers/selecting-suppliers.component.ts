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
    public language;
    public datas: any = { result: { contactsList: [] } };
    public userface = [];
    public data;
    public loading: boolean = false;
    public id = JSON.parse(localStorage.getItem("filter")).id;
    public message = {
        state: false,
        btnText: "OK",
        msg: ""
    }
    public texts = ["您还没有选择供应商！", "录入成功！"];
    ngOnInit() {
        this.data = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.language = localStorage.getItem("language");
        this.service.http_get('/api/OuterFactory/GetContacts', false).subscribe((data: any) => {
            if (data.msg == "success") {
                this.datas = data;
            }
        })
        if (this.language == "en") {
            this.texts[0] = "You have not selected a supplier yet!";
            this.texts[1] = "Successful entry";
        }
    }
    show(item, i) {
        item.state = !item.state;
        if (item.state) {
            this.datas.result.contactsList.forEach((element, index) => {
                if (i != index) element.state = false;
            });

        }

    }
    //添加联系人
    add(user, $event) {
        $event.stopPropagation();
        user.state = !user.state;
        if (user.state) {
            this.userface.forEach((element) => {
                if (user.uid != element.uid) {
                    element.state = false;
                }
            });
            this.userface[0] = user;
        } else {
            this.userface.forEach((element, index) => {
                if (user.uid == element.uid) {
                    this.userface.splice(index, 1);
                    return;
                }
            });
        }

    }
    //录入计划
    send() {
        let fids = [];
        this.userface.forEach((element) => {
            fids.push(element.uid);
        })
        if (fids.length <= 0) {
            this.service.messageBox(this.message, this.texts[0]);
            return;
        }
        let option = {
            totalCount: this.data.total,
            startTime: this.data.date,
            dayCount: this.data.dayAmount,
            code: this.data.code,
            ofids: fids.toString(),
            nodeId: this.id,
            styleNo: this.data.styleNo
        }
        this.loading = true;
        this.service.http_post("/api/OuterFactory/EntryPlan", option, false).subscribe((data: any) => {
            this.loading = false;
            if (data.msg == "success") {
                this.service.messageBox(this.message, this.texts[1]);
                setTimeout(() => window.history.go(-2), 1500);
            } else {
                this.service.messageBox(this.message, data.msg);
            }
        }, error => {
            this.loading = false;
        })
    }


}
