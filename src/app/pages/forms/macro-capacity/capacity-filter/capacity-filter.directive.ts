import { Directive, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
    selector: '[CapacityFilterDirective]'
})
export class CapacityFilterDirective {
    @Output() public CapacityFilterDirective = new EventEmitter<any>();

    public touchStartX;
    public boxWidth;
    public persent: number;
    public startWidth: number;
    public month: number;
    public waterLeft: string;
    public progressWidth: string;
    public moveX
    constructor(private el: ElementRef) {
        //初始化选中3个月;
        setTimeout(() => {
            this.boxWidth = this.el.nativeElement.parentNode.offsetWidth;
            this.persent = this.boxWidth / 12;
            this.startWidth = this.boxWidth / 24;
            this.month = 3;
            this.waterLeft = this.el.nativeElement.offsetWidth * 2 + "px";
            this.progressWidth = this.el.nativeElement.parentNode.offsetWidth / 12 * 2.5 + "px";
            this.moveX = this.touchStartX;
            let objs = { month: this.month, waterLeft: this.waterLeft, progressWidth: this.progressWidth };
            console.log(objs);
            this.CapacityFilterDirective.emit(objs);
            console.log(this.el.nativeElement.offsetWidth);
        }, 1000);

    }

    @HostListener('touchstart', ['$event']) onTouchStart(e) {
        console.log('开始：', e.changedTouches[0].clientX - parseInt(this.waterLeft));
        if (!this.touchStartX) this.touchStartX = e.changedTouches[0].clientX - parseInt(this.waterLeft);
        let objs = { month: this.month, waterLeft: this.waterLeft, progressWidth: this.progressWidth };
        this.boxWidth = this.el.nativeElement.parentNode.offsetWidth;
        this.persent = this.boxWidth / 12;
        this.startWidth = this.boxWidth / 24;
        console.log(objs);
        // this.CapacityFilterDirective.emit(objs);

    }
    @HostListener('touchmove', ['$event']) onTouchMove(e) {
        console.log(e.changedTouches[0].clientX, this.touchStartX)
        this.moveX = e.changedTouches[0].clientX - this.touchStartX;
        //  Y轴移动小于X轴 判定为横向滑动
        if (this.moveX >= 0) {
            if (this.touchStartX + this.moveX >= this.boxWidth + this.persent + this.persent / 2.7) {
                this.waterLeft = Number(this.boxWidth - this.persent - 1) + 'px';
                this.progressWidth = '100%';
                this.month = 12;
                let objs = { month: this.month, waterLeft: this.waterLeft, progressWidth: this.progressWidth, num: 100 };
                this.CapacityFilterDirective.emit(objs);
                console.log(objs);
            } else {
                this.waterLeft = this.moveX + 'px';
                this.month = Math.floor(this.moveX / this.persent) + 1;
                this.progressWidth = this.startWidth + this.moveX + 'px';
                let objs = { month: this.month, waterLeft: this.waterLeft, progressWidth: this.progressWidth, num: 10 };
                this.CapacityFilterDirective.emit(objs);
                console.log(objs);
            }
        } else if (this.moveX < 0) {
            this.waterLeft = 0 + 'px';
            this.progressWidth = 0 + 'px';
            this.month = 1;
            let objs = { month: this.month, waterLeft: this.waterLeft, progressWidth: this.progressWidth, num: 0 };
            this.CapacityFilterDirective.emit(objs);
            console.log(objs);
        }
    }
    @HostListener('touchend', ['$event']) onTouchEnd(e) {
        console.log('结束：', parseInt(this.waterLeft))
        if (parseInt(this.waterLeft) <= 0) {
            console.log("小于0")
            this.waterLeft = 0 + 'px';
            this.progressWidth = 0 + 'px';
            this.month = 1;
            let objs = { month: this.month, waterLeft: this.waterLeft, progressWidth: this.progressWidth };
            this.CapacityFilterDirective.emit(objs);
        } else {
            console.log("大于0")
        }
    }

}
