import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
    @Input() public loadingShow: boolean;//控制组件是否显示
    constructor() { }

    ngOnInit() {
    }

}
