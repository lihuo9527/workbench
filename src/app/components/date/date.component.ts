import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

    constructor() { }
    @Input() public number;
    @Output() public submit: EventEmitter<string> = new EventEmitter();
    public year;
    public language;
    public days = [];
    public today = new Date();
    public last_year = this.today.getFullYear() - 1;
    public month = this.today.getMonth() + 1;
    public nowdate;
    public start_date;
    public end_date;
    public state;
    public dates = [];
    public message = { state: false, btnText: "OK", msg: "" };
    ngOnInit() {
        for (let i = 0; i < 24; i++) {
            let myDate = new Date(this.last_year + "," + this.month + "," + "01");
            this.days = [];
            if (myDate.getDay() > 0) {
                for (let b = 0; b < myDate.getDay(); b++) {
                    this.days.push("");
                }
            }

            this.backDays(this.last_year, this.month, this.days);
            let json = {
                year: this.last_year,
                month: this.month,
                days: this.days
            }
            this.dates.push(json);
            this.last_year = this.month == 12 ? this.last_year + 1 : this.last_year;
            this.month = this.month == 12 ? 1 : this.month + 1;

        }

        this.language = localStorage.getItem("language");
    }
    ngAfterViewInit() {
        let dates_box = document.querySelectorAll(".dates_box")[0];
        dates_box.scrollTop = dates_box.scrollHeight / 2.2;
    }
    backDays(year, month, days) {
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            for (let i = 1; i < 32; i++) {
                if (this.today.getFullYear() == year && this.today.getMonth() + 1 == month && i == this.today.getDate()) {
                    days.push("今天");
                } else {
                    days.push(i);
                }

            }
        }
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            for (let i = 1; i < 31; i++) {
                if (this.today.getFullYear() == year && this.today.getMonth() + 1 == month && i == this.today.getDate()) {
                    days.push("今天");
                } else {
                    days.push(i);
                }
            }
        }
        if (month == 2) {
            if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                for (let i = 1; i < 30; i++) {
                    if (this.today.getFullYear() == year && this.today.getMonth() + 1 == month && i == this.today.getDate()) {
                        days.push("今天");
                    } else {
                        days.push(i);
                    }
                }
            } else {
                for (let i = 1; i < 29; i++) {
                    if (this.today.getFullYear() == year && this.today.getMonth() + 1 == month && i == this.today.getDate()) {
                        days.push("今天");
                    } else {
                        days.push(i);
                    }
                }
            }
        }
    }
    backDate() {
        if (this.number == 2) {
            if (this.start_date && this.end_date) {
                let backdate = []
                backdate[0] = this.start_date;
                backdate[1] = this.end_date;
                this.submit.emit(JSON.stringify({ state: false, dates: backdate }));
                console.log(backdate);
                return;
            };
        } else if (this.number == 1) {
            if (this.start_date) {
                this.submit.emit(JSON.stringify({ state: false, date: this.start_date }));
                return;
            };
        }

    }
    finish() {
        this.backDate();
    }
    selectDate(index, day) {
        if (this.number == 2) {
            if (day == "今天") day = this.today.getDate();
            let month = this.dates[index].month < 10 ? "0" + this.dates[index].month : this.dates[index].month.toString();
            let nowday = day < 10 ? "0" + day : day.toString();
            // this.nowdate = this.dates[index].year + "-" + month + "-" + nowday;
            this.backDate();
            if (day > 0) {
                console.log(this.dates[index].year + "年" + this.dates[index].month + "月" + day + "日");
            } else {
                return;
            }
            let text = this.dates[index].year + "-" + month + "-" + nowday;
            if (this.start_date && this.start_date != text) {
                let arr1 = new Date(this.start_date);
                let arr2 = new Date(text);
                if (arr1 > arr2) {
                    this.alert("结束时间不能小于当前时间！");
                    return;
                }
                console.log(arr1, arr2)
                this.end_date = text;
                this.backDate();
            } else if (!this.start_date && !this.end_date) {
                this.state = !this.state;
                if (day == "今天") day = this.today.getDate();
                let month = this.dates[index].month < 10 ? "0" + this.dates[index].month : this.dates[index].month.toString();
                let nowday = day < 10 ? "0" + day : day.toString();
                this.start_date = this.dates[index].year + "-" + month + "-" + nowday;
            }
        } else if (this.number == 1) {
            if (day == "今天") day = this.today.getDate();
            let month = this.dates[index].month < 10 ? "0" + this.dates[index].month : this.dates[index].month.toString();
            let nowday = day < 10 ? "0" + day : day.toString();
            // this.nowdate = this.dates[index].year + "-" + month + "-" + nowday;
            if (day > 0) {
                console.log(this.dates[index].year + "年" + month + "月" + nowday + "日");
            } else {
                return;
            }
            this.start_date = this.dates[index].year + "-" + month + "-" + nowday;
            setTimeout(() => this.backDate(), 500);
        }

    }
    close() {
        if (this.number == 2) this.submit.emit(JSON.stringify({ state: false, dates: false }));
        if (this.number == 1) this.submit.emit(JSON.stringify({ state: false, date: false }));
    }
    cancel() {
        this.start_date = false;
        this.end_date = false;
        this.state = false;
    }
    alert(message) {
        this.message.msg = message;
        this.message.state = true;
        this.message.btnText = "OK";
    }
}
