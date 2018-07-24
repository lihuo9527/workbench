import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
@Component({
    selector: 'app-not-bind',
    templateUrl: './not-bind.component.html',
    styleUrls: ['./not-bind.component.css']
})
export class NotBindComponent implements OnInit {
    public language;
    constructor(private service: AppService, ) { }

    ngOnInit() {
        this.language = localStorage.getItem("language");
        if (this.service.accessControl(new window_obj(), "notBind")) return;
    }

}
