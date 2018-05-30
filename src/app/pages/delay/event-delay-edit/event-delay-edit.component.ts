import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-event-delay-edit',
    templateUrl: './event-delay-edit.component.html',
    styleUrls: ['./event-delay-edit.component.css']
})
export class EventDelayEditComponent implements OnInit {

    constructor(private routerIonfo: ActivatedRoute) { }
    public Language;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.routerIonfo.params.subscribe(data => console.log(data))
    }

}
