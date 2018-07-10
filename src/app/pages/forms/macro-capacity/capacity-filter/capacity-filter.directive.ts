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

    public persent: number;
    public startWidth: number;
    public month: number = 0;
    public waterLeft: string;
    public progressWidth: string;
    @HostListener('touchstart', ['$event']) onTouchStart(e) {
        console.log('开始：' + e.changedTouches[0].clientX);
        if (!this.touchStartX) this.touchStartX = e.changedTouches[0].clientX;
        if (!this.touchStartY) this.touchStartY = e.changedTouches[0].clientY;
        this.left = parseInt(this.el.nativeElement.style.left);

        let boxWidth = this.el.nativeElement.parentNode.offsetWidth;
        this.persent = boxWidth / 12;
        this.startWidth = boxWidth / 24;
        if (this.el.nativeElement.style.left) {
            this.month = Math.floor(parseInt(this.el.nativeElement.style.left) / this.persent) + 1;
            let objs = { month: this.month, waterLeft: this.waterLeft, progressWidth: this.progressWidth };
            this.CapacityFilterDirective.emit(objs);
        }
    }
    @HostListener('touchmove', ['$event']) onTouchMove(e) {
        let moveX = e.changedTouches[0].clientX - this.touchStartX;
        let moveY = e.changedTouches[0].clientY - this.touchStartY;
        // console.log(moveX, moveY);

        if (Math.abs(moveY) < Math.abs(moveX)) {
            //  Y轴移动小于X轴 判定为横向滑动
            if (moveX > 0) {
                if (this.touchStartX + moveX >= this.el.nativeElement.parentNode.offsetWidth + this.el.nativeElement.offsetWidth) {
                    // document.getElementById("progress").style.width = "100%";
                    this.waterLeft = Number(this.el.nativeElement.parentNode.offsetWidth - this.el.nativeElement.offsetWidth - 1) + 'px';
                    this.progressWidth = '100%';
                    this.month = 12;
                    let objs = { month: this.month, waterLeft: this.waterLeft, progressWidth: this.progressWidth };
                    this.CapacityFilterDirective.emit(objs);
                } else {
                    this.waterLeft = moveX + 'px';
                    this.month = Math.floor(moveX / this.persent) + 1;
                    this.progressWidth = this.startWidth + moveX + 'px';
                    let objs = { month: this.month, waterLeft: this.waterLeft, progressWidth: this.progressWidth };
                    this.CapacityFilterDirective.emit(objs);
                }
            } else if (moveX < 0) {

                console.log('负数', this.touchStartX + this.el.nativeElement.offsetWidth, this.left, Math.abs(moveX))
                if (this.left - Math.abs(moveX) <= 0) {
                    this.waterLeft = 0 + 'px';
                    this.progressWidth = 0 + 'px';
                    this.month = 1;
                    let objs = { month: this.month, waterLeft: this.waterLeft, progressWidth: this.progressWidth };
                    this.CapacityFilterDirective.emit(objs);
                } else {
                    this.month = Math.floor(moveX / this.persent) + 1;
                    this.waterLeft = this.left - Math.abs(moveX) + 'px';
                    this.progressWidth = this.startWidth + this.left - Math.abs(moveX) + 'px';
                    let objs = { month: this.month, waterLeft: this.waterLeft, progressWidth: this.progressWidth };
                    this.CapacityFilterDirective.emit(objs);
                }
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
        console.log('结束：' + moveX)
    }

}
