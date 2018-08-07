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
        { url: "assets/images/icon_user.png", text: "User Name",text2: "请输入用户名", type: "text", input: "", minlength: 1, maxlength: 20 },
        { url: "assets/images/password.png", text: "Password", text2: "请输入密码", type: "password", input: "", minlength: 6, maxlength: 20 }
    ];
    public loading = false;
    public texts = ["用户名或密码不能为空！", "输入的用户名不合法！", "密码长度不能少于6位！", "登录超时!"];
    ngOnInit() {
        this.language = localStorage.getItem("language");
        if(this.language=="en"){
            this.texts[0] = "Username or password cannot be empty!";
            this.texts[1] = "The username entered is not valid!";
            this.texts[2] = "Password length must not be less than 6 bits!";
            this.texts[3] = "Login time out!";
        }
    }
    login() {
        let reg = /^[a-zA-Z0-9]{1,20}$/;
        if (!this.items[0].input || !this.items[1].input) {
            this.service.messageBox(this.message, this.texts[0])
            return;
        }
        if (!reg.test(this.items[0].input)) {
            this.service.messageBox(this.message, this.texts[1])
            return;

        }
        if (this.service.getStrLength(this.items[1].input) < 6) {
            this.service.messageBox(this.message, this.texts[2])
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
            this.service.messageBox(this.message, this.texts[3]);
        })
    }


}
