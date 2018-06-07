import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-critical-event',
    templateUrl: './critical-event.component.html',
    styleUrls: ['./critical-event.component.css']
})
export class CriticalEventComponent implements OnInit {
    constructor(
        private service: AppService,
        private routerIonfo: ActivatedRoute,
        private router: Router,
    ) { }
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
        this.id == "all" ? this.eventId = "-1" : this.eventId = this.id;
        console.log("id" + this.id);
        for (let i = 0; i < this.navigations.length; i++) {
            if (this.Language != this.navigations[i].show) this.navigations.splice(i, 1);
        }
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
    UpdateList() {
        let pageIndex = this.datas.length / 4 + 1;
        this.service.http_get('/api/Schedule/GetEventPoes?pageIndex=' + pageIndex + '&pageSize=4&star=' + this.start + '&end=' + this.end, false).subscribe((data:any) => {
            let obj = data;
            if (obj.length > 0) {
                for (let i = 0; i < obj.length; i++) {
                    this.datas.push(obj[i]);
                }
            }
        })
    }
    Complete($event) {
        this.start = $event.StartDate;
        this.end = $event.EndDate;
        console.log("收到" + $event);
        this.service.http_get('/api/Schedule/GetEventPoes?pageIndex=1&pageSize=4' +
            // '&fids=' + $event.fids + '&wsids=' +  $event.wsids+ 
            // '&eventid=' +  $event.eventid+ 
            '&star=' + $event.StartDate + '&end=' + $event.EndDate, false).subscribe((data:any) => {
                this.datas = data;
                this.state = false;
            })
    }
    GetTabs($event) {
        console.log($event);
        this.navigations = $event;
        this.navigations[0].state = true;
    }
    Link(item) {
        console.log(item);
        this.router.navigate(["eventEntry", JSON.stringify(item)]);
    }
}
