import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private service: AppService, private router: Router,private cookieService:CookieService) { }
    public Language;
    public message = {
        state: false,
        btnText: "OK",
        msg: ""
    }
    public items = [
        { url: "assets/images/icon_user.png", text: "User Name", type: "text", input: "", minlength: 11, maxlength: 11 },
        { url: "assets/images/password.png", text: "Password", type: "password", input: "", minlength: 6, maxlength: 20 }
    ];
    public loading = false;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
    }
    alert(message) {
        this.message.msg = message;
        this.message.state = true;
        this.message.btnText = "OK";
    }
    login() {
        if (!this.items[0].input || !this.items[1].input) {
            this.alert("用户名或密码不能为空！")
            return;
        }
        if (!this.service.isPoneAvailable(this.items[0].input)) {
            this.alert("输入的手机号不合法！")
            return;

        }
        if (this.service.getStrLength(this.items[1].input) < 6) {
            this.alert("密码长度不能少于6位！")
            return;
        }
        this.loading = true;
        this.service.http_post('/users/verifyUser', "loginname=" + this.items[0].input + "&password=" + this.items[1].input, false, "form").subscribe((data: any) => {
            this.loading = false;
            if (data.msg == "success") {
                let time :number = 2*60*6000*100000;
                this.cookieService.set('JSESSIONID',data.result.userInfo.JSESSIONID,new Date(new Date().getTime() + time))
                this.router.navigate(['/home']);
                this.alert("登录成功！");
            } else {
                this.alert(data.result.failedMsg);
            }
        },error=>{
            this.loading = false;
            this.alert("登录超时!");
            })
    }


}
