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
    public boxWidth;
    public persent: number;
    public startWidth: number;
    public month: number = 0;
    public waterLeft: string;
    public progressWidth: string;
    @HostListener('touchstart', ['$event']) onTouchStart(e) {
        console.log('开始：' + e.changedTouches[0].clientX);
        if (!this.touchStartX) this.touchStartX = e.changedTouches[0].clientX;
        if (!this.touchStartY) this.touchStartY = e.changedTouches[0].clientY;
        this.boxWidth = this.el.nativeElement.parentNode.offsetWidth;
        this.persent = this.boxWidth / 12;
        this.startWidth = this.boxWidth / 24;
    }
    @HostListener('touchmove', ['$event']) onTouchMove(e) {
        let moveX = e.changedTouches[0].clientX - this.touchStartX;

        //  Y轴移动小于X轴 判定为横向滑动
        if (moveX > 0) {
            if (this.touchStartX + moveX >= this.boxWidth + this.persent + this.persent/2.7) {
                this.waterLeft = Number(this.boxWidth - this.persent - 1) + 'px';
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
            this.waterLeft = 0 + 'px';
            this.progressWidth = 0 + 'px';
            this.month = 1;
            let objs = { month: this.month, waterLeft: this.waterLeft, progressWidth: this.progressWidth };
            this.CapacityFilterDirective.emit(objs);
        }
    }
    @HostListener('touchend', ['$event']) onTouchEnd(e) {
        let moveX = e.changedTouches[0].clientX - this.touchStartX;
        let moveY = e.changedTouches[0].clientY - this.touchStartY;
        console.log('结束：' + moveX)
    }

}
