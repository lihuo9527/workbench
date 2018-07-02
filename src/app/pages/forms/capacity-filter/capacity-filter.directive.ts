import { Directive, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
    selector: '[CapacityFilterDirective]'
})
export class CapacityFilterDirective {
    @Output() public CapacityFilterDirective = new EventEmitter<any>();
    constructor(private el: ElementRef) { }
    public touch;
    public touchStartX;
    public touchStartY;
    public left;
    @HostListener('touchstart', ['$event']) onTouchStart(e) {
        console.log("开始：" + e.changedTouches[0].clientX)
        this.touchStartX = e.changedTouches[0].clientX;
        this.touchStartY = e.changedTouches[0].clientY;
        this.left = parseInt(this.el.nativeElement.style.left);
    }
    @HostListener('touchmove', ['$event']) onTouchMove(e) {
        let moveX = e.changedTouches[0].clientX - this.touchStartX;
        let moveY = e.changedTouches[0].clientY - this.touchStartY;
        console.log("x:", moveX);
        //  Y轴移动小于X轴 判定为横向滑动
        if (moveX > 0) {
            console.log("向右移动！")
            if (this.touchStartX + moveX >= this.el.nativeElement.parentNode.offsetWidth + this.el.nativeElement.offsetWidth + 1) {
                this.el.nativeElement.style.left = Number(this.el.nativeElement.parentNode.offsetWidth - this.el.nativeElement.offsetWidth - 1) + "px";
                document.getElementById("progress").style.width = "100%";
                this.el.nativeElement.children[0].innerHTML = "12";
            } else {
                this.el.nativeElement.style.left = moveX + "px";
                document.getElementById("progress").style.width = moveX + this.el.nativeElement.offsetWidth / 2 + "px";
                let month = parseInt(this.el.nativeElement.parentNode.offsetWidth) / 12;
                let num = parseInt(this.el.nativeElement.style.left) > month ? Math.floor(parseInt(this.el.nativeElement.style.left) / month) + 1 : 1;
                this.el.nativeElement.children[0].innerHTML = num;

            }
        } else if (moveX < 0) {
            console.log("向左移动！")
            console.log("负数", this.touchStartX + this.el.nativeElement.offsetWidth, this.left, Math.abs(moveX))
            if (this.left - Math.abs(moveX) <= 0) {
                this.el.nativeElement.style.left = 0 + "px";
                document.getElementById("progress").style.width = "0px";
                this.el.nativeElement.children[0].innerHTML = "1";
            } else {
                this.el.nativeElement.style.left = this.left - Math.abs(moveX) + this.el.nativeElement.offsetWidth / 2 + "px";
                document.getElementById("progress").style.width = this.left - Math.abs(moveX) + this.el.nativeElement.offsetWidth / 2 + "px";
                let month = parseInt(this.el.nativeElement.parentNode.offsetWidth) / 12;
                let num = parseInt(this.el.nativeElement.style.left) > month ? Math.floor(parseInt(this.el.nativeElement.style.left) / month) - 1 : 1;
                this.el.nativeElement.children[0].innerHTML = num;
            }
        }
    }
    @HostListener('touchend', ['$event']) onTouchEnd(e) {
        let moveX = e.changedTouches[0].clientX - this.touchStartX;
        let moveY = e.changedTouches[0].clientY - this.touchStartY;
        console.log("结束：" + moveX)
    }

}
