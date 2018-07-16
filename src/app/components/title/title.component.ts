import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
    @Input() public title: string;//页面标题
    @Input() public link: any;//返回按钮触发的路由路径
    @Input() public size: string;//控制标题文字大小big/small
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
