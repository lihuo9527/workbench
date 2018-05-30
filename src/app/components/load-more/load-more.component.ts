import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-load-more',
    templateUrl: './load-more.component.html',
    styleUrls: ['./load-more.component.css']
})
export class LoadMoreComponent implements OnInit {
    @Input() public language;
    constructor() { }
    public text;
    ngOnInit() {
        if (this.language == "cn") this.text = "更多";
        if (this.language == "en") this.text = "load more...";
    }

}
