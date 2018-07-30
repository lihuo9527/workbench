import { Directive, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';


@Directive({
    selector: '[DownUpdateDirective]'
})
export class DownUpdateDirective {
    //下拉刷新
    @Output() public DownUpdateDirective = new EventEmitter<any>();
    private touchStartY;
    private moveY;
    private lastY;
    private maxHeight = 46;
    constructor(private el: ElementRef) {
        // this.el.nativeElement.style.overflow = "auto";
        // this.el.nativeElement.style.WebkitOverflowScrolling = "touch";
        this.el.nativeElement.innerHTML = '<div class="downupdate" id="downupdate" style="overflow: hidden;width: 100%;background: #333;color: #fff;max-height: 46px;height: 0px;display: flex;justify-content: center;align-items: center;min-height:0;transition:0.5s;">松开刷新</div>' + this.el.nativeElement.innerHTML;
    }
    @HostListener('touchstart', ['$event']) onTouchStart(e) {
        console.log(document.body.scrollTop, document.documentElement.scrollTop);
        if (this.getScrollTop() == 0) {
            this.moveY = 0;
            this.lastY = 0;
            this.touchStartY = e.changedTouches[0].clientY;
            // document.body.style.overflowY = "hidden";
            // document.documentElement.style.overflowY = "hidden";
        }
        console.log(this.touchStartY);
    }
    @HostListener('touchmove', ['$event']) onTouchMove(e) {
        console.log(this.moveY, e.changedTouches[0].clientY, this.touchStartY);
        if (this.getScrollTop() == 0) {
            this.moveY = e.changedTouches[0].clientY - this.touchStartY;
            if (this.moveY > 0 && e.changedTouches[0].clientY > this.touchStartY) {
                if (this.moveY > this.maxHeight) this.moveY = this.maxHeight;
                document.getElementById("downupdate").style.height = this.moveY + "px";
            } else {
                document.getElementById("downupdate").style.height = "0px";
            }
            this.lastY = this.moveY;
        }
    }
    @HostListener('touchend', ['$event']) onTouchEnd(e) {
        console.log(this.moveY);
        if (this.getScrollTop() == 0 && document.getElementById("downupdate").offsetHeight == this.maxHeight) {
            this.DownUpdateDirective.emit({ state: "update" });
        }
        document.getElementById("downupdate").style.height = "0px";
        // document.documentElement.style.overflowY = "scroll";
        // document.body.style.overflowY = "scroll";
    }

    getScrollTop() {
        return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    }

}
