import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.component.html',
    styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

    constructor(private router: Router) { }
    public Language;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
    }
    Link() {
        this.router.navigate(['scheduleReportForms']);
    }
}
