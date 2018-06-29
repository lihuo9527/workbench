import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appCapacityFilter]'
})
export class CapacityFilterDirective {

    constructor() { }
    public touch;
    public startx;
    public starty;
    @HostListener('touchstart',['event']) ontouchstart(ev) {
        let obj = ev.touches[0];
        this.startx = obj.touch.pageX;
        this.starty = obj.touch.pageY;
        console.log(this.startx, this.starty)
    }
    @HostListener('touchmove',['event']) ontouchmove(ev) {
        // let obj = ev.touches[0];
        // console.log(obj.pageX, obj.pageY);

        // let x = Number(obj.pageX);
        // //页面触点X坐标 
        // let y = Number(obj.pageY);
        // //页面触点Y坐标 var text; 
        // //判断滑动左右方向 
        // if (x - this.startx >= 30) {
        //     console.log('向右滑动')
        // } else if (x - this.startx <= -30) {
        //     console.log('向左滑动')
        // }


    }
    @HostListener('touchend') ontouchend() {

    }

}
