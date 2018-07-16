import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
    @Input() public msg: string;//需要显示的文本消息
    @Input() public btnText: string;//确认按钮的文本消息
    @Input() public msgShow: boolean;//是否显示消息框
    @Output() public event: EventEmitter<string> = new EventEmitter();//点确认后触发事件
    constructor() { }

    ngOnInit() {
    }
    send() {
        this.event.emit(JSON.stringify({ msgShow: false }))
    }
}
