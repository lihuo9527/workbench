import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-non-planing-process',
    templateUrl: './non-planing-process.component.html',
    styleUrls: ['./non-planing-process.component.css']
})
export class NonPlaningProcessComponent implements OnInit {

    constructor(private service: AppService, private routerIonfo: ActivatedRoute, private router: Router) { }
    public eventId = "-1";
    public datas = [];
    public id;
    public Language;
    public state = true;
    public navigations = [];
    public start;
    public end;
    public filter;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.id = this.routerIonfo.snapshot.params["id"];
        this.eventId = this.id == "all" ? "-1" : this.id;
        console.log("id" + this.id);
    }
    UpdateList() {
        let pageIndex = Math.ceil(this.datas.length / 4) + 1;
        this.service.http_get('/api/Schedule/GetProcessPoes?pageIndex=' + pageIndex + '&pageSize=4&star=' + this.start + '&end=' + this.end, false).subscribe((data: any) => {
            let obj = data;
            if (obj.length > 0) {
                for (let i = 0; i < obj.length; i++) {
                    this.datas.push(obj[i]);
                }
            }
        })
    }
    Select(index) {
        console.log(index)
        for (let i = 0; i < this.navigations.length; i++) {
            if (i == index) {
                this.navigations[i].state = true;
            } else {
                this.navigations[i].state = false;
            }
        }
        this.id = index;
    }
    Complete($event) {
        this.start = $event.StartDate;
        this.end = $event.EndDate;
        console.log("收到" + $event);
        this.service.http_get('/api/Schedule/GetProcessPoes?pageIndex=1&pageSize=4' +
            // '&fids=' + $event.fids + '&wsids=' +  $event.wsids+ 
            // '&eventid=' +  $event.eventid+ 
            '&star=' + $event.StartDate + '&end=' + $event.EndDate, false).subscribe((data: any) => {
                let obj = data;
                if (obj.length > 0) {
                    this.datas = obj;
                    this.state = false;
                }
            })
    }
    GetTabs($event) {
        this.navigations = $event;
        this.navigations[0].state = true;
    }

    Link(item) {
        console.log(item);
        item["Pid"] = "non-process";
        this.router.navigate(['scheduleEntry', JSON.stringify(item)])
    }
}
