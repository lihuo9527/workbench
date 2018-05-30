import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-schedule-report-forms',
    templateUrl: './schedule-report-forms.component.html',
    styleUrls: ['./schedule-report-forms.component.css']
})
export class ScheduleReportFormsComponent implements OnInit {

    constructor() { }
    public Language;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
    }

}
