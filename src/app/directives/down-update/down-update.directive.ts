import { Directive, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';


@Directive({
    selector: '[DownUpdateDirective]'
})
export class DownUpdateDirective {
    //下拉刷新
    @Output() public DownUpdateDirective = new EventEmitter<any>();
    private touchStartY;
    private moveY;
    constructor(private el: ElementRef) {
        this.el.nativeElement.innerHTML = '<div class="downupdate" id="downupdate" style="overflow: hidden;width: 100%;background: #333;color: #fff;max-height: 4rem;height: 0px;transition: 0.7s;display: flex;justify-content: center;align-items: center;">松开刷新</div>' + this.el.nativeElement.innerHTML;
    }
    @HostListener('touchstart', ['$event']) onTouchStart(e) {
        if (!this.touchStartY) this.touchStartY = e.changedTouches[0].clientY;
    }
    @HostListener('touchmove', ['$event']) onTouchMove(e) {
        console.log(this.moveY)
        this.moveY = e.changedTouches[0].clientY - this.touchStartY;
        if (this.moveY > 0) {
            document.getElementById("downupdate").style.height = this.moveY + "px";
        }
    }
    @HostListener('touchend', ['$event']) onTouchEnd(e) {
        if (this.moveY >= 70) {
            this.DownUpdateDirective.emit({ state: "update" });
        }
        document.getElementById("downupdate").style.height = "0px";

    }
}
