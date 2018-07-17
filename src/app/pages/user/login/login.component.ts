import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private service: AppService, private router: Router, ) { }
    public language;
    public message = {
        state: false,
        btnText: "OK",
        msg: ""
    }
    public items = [
        { url: "assets/images/icon_user.png", text: "User Name", type: "text", input: "", minlength: 1, maxlength: 20 },
        { url: "assets/images/password.png", text: "Password", type: "password", input: "", minlength: 6, maxlength: 20 }
    ];
    public loading = false;
    ngOnInit() {
        this.language = localStorage.getItem("language");
    }
    login() {
        let reg = /^[a-zA-Z0-9]{1,20}$/;
        if (!this.items[0].input || !this.items[1].input) {
            this.service.messageBox(this.message, "用户名或密码不能为空！")
            return;
        }
        if (!reg.test(this.items[0].input)) {
            this.service.messageBox(this.message, "输入的用户名不合法！")
            return;

        }
        if (this.service.getStrLength(this.items[1].input) < 6) {
            this.service.messageBox(this.message, "密码长度不能少于6位！")
            return;
        }
        this.loading = true;
        this.service.http_post('/users/verifyUser', "loginname=" + this.items[0].input + "&password=" + this.items[1].input, false, "form").subscribe((data: any) => {
            this.loading = false;
            if (data.msg == "success") {
                let time: number = 2 * 60 * 6000 * 100000;
                sessionStorage.setItem('JSESSIONID', data.result.userInfo.JSESSIONID);
                sessionStorage.setItem('defaultCompanyId', data.result.userInfo.defaultCompanyId);
                sessionStorage.setItem('relation', data.result.userInfo.relation);
                this.router.navigate(['/home']);
                this.service.messageBox(this.message, "登录成功！");
            } else {
                this.service.messageBox(this.message, data.result.failedMsg);
            }
        }, error => {
            this.loading = false;
            this.service.messageBox(this.message, "登录超时!");
        })
    }


}
