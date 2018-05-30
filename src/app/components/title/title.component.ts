import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
    @Input() public title: string;
    @Input() public link: any;
    constructor(private router: Router) { }

    ngOnInit() {
    }
    BackPage() {
        console.log(this.link);
        if (this.link) {
            this.router.navigate(this.link)
        } else {
            window.history.go(-1);
        }
        console.log(this.link)
    }
}
