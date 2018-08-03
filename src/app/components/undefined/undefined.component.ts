import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-undefined',
    templateUrl: './undefined.component.html',
    styleUrls: ['./undefined.component.css']
})
export class UndefinedComponent implements OnInit {
    @Input() public length = 0;
    constructor() { }
    public language = localStorage.getItem("language");
    ngOnInit() {
    }

}
