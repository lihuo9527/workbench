import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-list-title',
    templateUrl: './list-title.component.html',
    styleUrls: ['./list-title.component.css']
})
export class ListTitleComponent implements OnInit {
    @Input() public title: string;//标题的文本
    @Input() public number: string;//已处理数
    @Input() public orders: boolean;//控制订单数是否显示
    @Input() public text: string;//已处理数后的文本
    constructor() { }

    ngOnInit() {
    }

}
