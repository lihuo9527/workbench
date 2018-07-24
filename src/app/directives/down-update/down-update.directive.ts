import { Directive, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';


@Directive({
    selector: '[DownUpdateDirective]'
})
export class DownUpdateDirective {
    @Output() public DownUpdateDirective = new EventEmitter<any>();
    private touchStartY;
    private moveY;
    constructor() { }
    @HostListener('touchstart', ['$event']) onTouchStart(e) {
        if (!this.touchStartY) this.touchStartY = e.changedTouches[0].clientY;
    }
    @HostListener('touchmove', ['$event']) onTouchMove(e) {
        console.log(this.moveY)
        this.moveY = e.changedTouches[0].clientY - this.touchStartY;
        if (this.moveY > 0) {
            document.getElementById("downupdate").style.height = this.moveY + "px";
        }

        //  Y轴移动小于X轴 判定为横向滑动  
    }
    @HostListener('touchend', ['$event']) onTouchEnd(e) {
        if (this.moveY >= 70) {
            this.DownUpdateDirective.emit({ state: "update" });
        }
        document.getElementById("downupdate").style.height = "0px";

    }
}
