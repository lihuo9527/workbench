import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
    selector: 'app-out-sourcing',
    templateUrl: './out-sourcing.component.html',
    styleUrls: ['./out-sourcing.component.css']
})
export class OutSourcingComponent implements OnInit {

    constructor(private router: Router) { }
    public Language;
    public plans = [
        { title: "Unanswered Plan", icon: "assets/images/unanswered.png", link: "unanswered" },
        { title: "Unfinished Plan", icon: "assets/images/unfinished.png", link: "unfinished" },

    ]

    ngOnInit() {
        this.Language = localStorage.getItem("language");
    }
    link(link) {
        this.router.navigate([link])
    }
}
