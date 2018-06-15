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
        {
            title: "Printing and Embroidery",
            data: [
                { title: "Unanswered Plan", number: 0, icon: "assets/images/icon_ucp.png", link: "unanswered" },
                { title: "Unfinished Plan", number: 0, icon: "assets/images/icon_unp.png", link: "unfinished" },
            ]
        },
       
        {
            title: "Sewing",
            data: [
                { title: "Unanswered Plan", number: 0, icon: "assets/images/icon_ucp.png", link: "unanswered" },
                { title: "Unfinished Plan", number: 0, icon: "assets/images/icon_unp.png", link: "unfinished" },
            ]
        }
    ]

    ngOnInit() {
        this.Language = localStorage.getItem("language");
    }
    link(link) {
        this.router.navigate([link])
    }
}
