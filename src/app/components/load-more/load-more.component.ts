import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-load-more',
    templateUrl: './load-more.component.html',
    styleUrls: ['./load-more.component.css']
})
export class LoadMoreComponent implements OnInit {
    @Input() public type;
    constructor() { }
    public text;
    public notMore;
    public language;
    ngOnInit() {
        this.language = localStorage.getItem("language");
        if (this.language == "cn") this.text = "更多";
        if (this.language == "en") this.text = "load more...";
        if (this.language == "cn") this.notMore = "查询不到更多内容...";
        if (this.language == "en") this.notMore = "not any more...";
    }

}
