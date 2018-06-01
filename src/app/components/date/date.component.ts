import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

    constructor() { }
    @Input() public state;
    @Input() public datas;
    @Input() public name;
    @Input() public targetContainerId;
    @Input() public targetId;
    @Input() public selectstate;
    @Output() public submit: EventEmitter<string> = new EventEmitter();
    public years = [];
    public months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    public days = [];
    public year;
    public month;
    public day;
    public Language;
    public ymd = "年/月/日";
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        if (this.Language == "en") this.ymd = "yesr/month/day";
        for (let i = 1992; i < 2030; i++) {
            this.years.push(i);
        }
        for (let i = 1; i < 32; i++) {
            i < 10 ? this.days.push("0" + i) : this.days.push(i);
        }
        this.year = this.years[0];
        this.month = this.months[0];
        this.day = this.days[0];
    }
    ngAfterViewInit(){
        new DateSelector({
        input: this.targetId,  //点击触发插件的input框的id
        container: this.targetContainerId,  //插件插入的容器id
        type: 1,   //0：不需要tab切换，自定义滑动内容，建议小于三个； //1：需要tab切换，【年月日】【时分】完全展示，固定死，可设置开始年份和结束年份
        param: [1, 1, 1, 0,0],  //设置['year','month','day','hour','minute'],1为需要，0为不需要,需要连续的1
        beginTime: [2017, 5, 1, 1, 1],  //如空数组默认设置成1970年1月1日0时0分开始，如需要设置开始时间点，数组的值对应param参数的对应值。
        endTime: [2027, 5, 7, 12, 2],   //如空数组默认设置成次年12月31日23时59分结束，如需要设置结束时间点，数组的值对应param参数的对应值。
        recentTime: [2017, 5, 9, 2, 2], //如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
        success:  (arr, arr2)=>{
            this.ymd = arr2[0] + "-" + arr2[1] + '-' + arr2[2];
            this.submit.emit(this.ymd);
            console.log(arr2[0] + "-" + arr2[1] + '-' + arr2[2], '--- 字符串结果');
        }
      });
    }
    select_event(value, str) {
        if (str == "m" && this.month == "01" || str == "m" && this.month == "03" || str == "m" && this.month == "05" ||
            str == "m" && this.month == "07" || str == "m" && this.month == "08" || str == "m" && this.month == "10" ||
            str == "m" && this.month == "12") {
            this.days = [];
            for (let i = 1; i < 32; i++) {
                i < 10 ? this.days.push("0" + i) : this.days.push(i);
            }
        }
        if (str == "m" && this.month == "04" || str == "m" && this.month == "06" || str == "m" && this.month == "09" ||
            str == "m" && this.month == "11") {
            this.days = [];
            for (let i = 1; i < 31; i++) {
                i < 10 ? this.days.push("0" + i) : this.days.push(i);
            }
        }
        if (str == "m" && this.month == "02") {
            this.days = [];
            if (this.year % 4 == 0 && this.year % 100 != 0 || this.year % 400 == 0) {
                for (let i = 1; i < 30; i++) {
                    i < 10 ? this.days.push("0" + i) : this.days.push(i);
                }
            } else {
                for (let i = 1; i < 29; i++) {
                    i < 10 ? this.days.push("0" + i) : this.days.push(i);
                }
            }
        }
        console.log(value + str)
    }
    finish() {
        this.state = false;
        if (this.year != undefined && this.month != undefined && this.day != undefined) {
            this.ymd = this.year + "-" + this.month + '-' + this.day;
        }
        if (this.name) {
            this.submit.emit(JSON.stringify({ 'name': this.name, 'date': this.year + "-" + this.month + '-' + this.day }))
        } else {
            this.submit.emit(this.year + "-" + this.month + '-' + this.day)
        };

    }
    cancel() {
        this.state = false;
        this.submit.emit("false");
    }

}
