import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    constructor(private service: AppService) { }
    public language;
    public codestate = true;
    public time;
    public timer;
    public username;
    public items = [
        { text: "Verification Code", value: "", url: "assets/images/key.png", type: "text" },
        { text: "New Password", value: "", url: "assets/images/password2.png", type: "password" },
        { text: "Confirm Password", value: "", url: "assets/images/password2.png", type: "password" }
    ];
    public message = {
        state: false,
        btnText: "OK",
        msg: ""
    };
    public loading = false;
    ngOnInit() {
        this.language = localStorage.getItem("language");
    }
    getCode() {
        if (!this.username) {
            this.service.messageBox(this.message, "手机号不能为空！")
            return;
        }
        if (!this.service.isPoneAvailable(this.username)) {
            this.service.messageBox(this.message, "输入的手机号不合法！")
            return;
        }
        if (this.codestate == true) {
            this.codestate = false;
            this.service.http_get("/users/verifycode/" + this.username, false).subscribe((data: any) => {
                if (data.msg == "success") {
                    this.time = 60
                    this.timer = setInterval(() => {
                        if (this.time <= 1) {
                            this.codestate = true;
                            this.time = null;
                            clearInterval(this.timer);
                            return;
                        }
                        this.time = this.time - 1;
                    }, 1000)
                } else {
                    this.codestate = true;
                }
            })
        }
    }
    confirm() {
        if (!this.username) {
            this.service.messageBox(this.message, "手机号不能为空！")
            return;
        }
        if (!this.service.isPoneAvailable(this.username)) {
            this.service.messageBox(this.message, "输入的手机号不合法！")
            return;
        }
        if (this.service.getStrLength(this.items[0].value) != 6) {
            this.service.messageBox(this.message, "验证码长度输入有误！")
            return;
        }
        if (this.service.getStrLength(this.items[1].value) < 6) {
            this.service.messageBox(this.message, "密码长度不能少于6位！")
            return;
        }
        if (this.items[1].value != this.items[2].value) {
            this.service.messageBox(this.message, "密码2次输入的结果不一致！")
            return;
        }
        let obj = {
            phone: this.username,
            newPwd: this.items[1].value,
            code: this.items[0].value
        }
        this.loading = true;
        this.service.http_post('/users/modifyPasswordWithCode', "phone=" + this.username + "&newPwd=" + this.items[1].value + "&code=" + this.items[0].value, false, "form").subscribe((data: any) => {
            this.loading = false;
            if (data.msg == "success") {
                this.service.messageBox(this.message, "修改成功！");
            } else {
                this.service.messageBox(this.message, data.result.failedMsg);
            }
        }, error => {
            this.loading = false;
            this.service.messageBox(this.message, "连接失败！");
        })
    }
}
