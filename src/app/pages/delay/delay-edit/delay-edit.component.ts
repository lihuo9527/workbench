import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-delay-edit',
    templateUrl: './delay-edit.component.html',
    styleUrls: ['./delay-edit.component.css']
})
export class DelayEditComponent implements OnInit {

    constructor(private routerIonfo: ActivatedRoute) { }
    public language;
    public title;
    public data;
    public type;
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.routerIonfo.params.subscribe(datas => {
            let obj = JSON.parse(datas.data);
            this.type = obj.type;
            this.title = obj.title;
            this.data = obj.data;
            console.log(obj.data);
        })
    }

}
