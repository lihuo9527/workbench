import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-not-bind',
    templateUrl: './not-bind.component.html',
    styleUrls: ['./not-bind.component.css']
})
export class NotBindComponent implements OnInit {
    public language;
    constructor() { }

    ngOnInit() {
        this.language = localStorage.getItem("language");
    }

}
