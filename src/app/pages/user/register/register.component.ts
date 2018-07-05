import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private service: AppService) { }
    public language;
    public state = false;
    public username;
    public password;
    public code;
    public codestate = true;
    public nowdate = new Date();
    public time;
    public timer;
    public loading = false;
    public password2;
    public message = {
        state: false,
        btnText: "OK",
        msg: ""
    }
    ngOnInit() {
        this.language = localStorage.getItem("language");
    }
    ngAfterViewInit() {

    }
    lookStart() {
        document.querySelector('#password')['type'] = "text";
    }
    lookEnd() {
        document.querySelector('#password')['type'] = "password";
    }
    register() {
        let reg = /^[a-zA-Z0-9]{1,20}$/;
        if (!this.username || !this.password) {
            this.service.messageBox(this.message, "用户名或密码不能为空！")
            return;
        }
        if (!reg.test(this.username)) {
            this.service.messageBox(this.message, "输入的用户名不合法！")
            return;

        }
        if (this.service.getStrLength(this.password) < 6) {
            this.service.messageBox(this.message, "密码长度不能少于6位！")
            return;
        }
        if (this.password != this.password2) {
            this.service.messageBox(this.message, "密码2次输入的结果不一致！")
            return;
        }
        let obj = {
            loginName: this.username,
            password: this.password
        }
        this.loading = true;
        this.service.http_post("/users/addUser", JSON.stringify(obj), false).subscribe((data: any) => {
            this.loading = false;
            if (data.msg == "success") {
                this.service.messageBox(this.message, "注册成功！");
            } else {
                this.service.messageBox(this.message, data.result.failedMsg);
            }
        }, error => {
            this.loading = false;
            this.service.messageBox(this.message, "连接失败...");
        }
        )
    }
}
