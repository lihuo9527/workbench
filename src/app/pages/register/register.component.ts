import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private service: AppService) { }
    public Language;
    public state = false;
    public username;
    public password;
    public code;
    public codestate = true;
    public nowdate = new Date();
    public time;
    public timer;
    public loading = false;
    public message = {
        state: false,
        btnText: "OK",
        msg: ""
    }
    ngOnInit() {
        this.Language = localStorage.getItem("language");
    }
    ngAfterViewInit() {

    }
    lookStart() {
        document.querySelector('#password')['type'] = "text";
    }
    lookEnd() {
        document.querySelector('#password')['type'] = "password";
    }
    alert(message) {
        this.message.msg = message;
        this.message.state = true;
        this.message.btnText = "OK";
    }
    register() {
        let reg=/^[a-zA-Z0-9]{1,20}$/;
        if (!this.username || !this.password) {
            this.alert("用户名或密码不能为空！")
            return;
        }
        if (!reg.test(this.username)) {
            this.alert("输入的用户名不合法！")
            return;

        }
        if (this.service.getStrLength(this.password) < 6) {
            this.alert("密码长度不能少于6位！")
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
                this.alert("注册成功！");
            } else {
                this.alert(data.result.failedMsg);
            }
        },error=>{
            this.loading = false;
            this.alert("连接失败...");
         }
        )
    }
    // getCode() {
    //     if (!this.username) {
    //         this.alert("手机号不能为空！")
    //         return;
    //     }
    //     if (!this.service.isPoneAvailable(this.username)) {
    //         this.alert("输入的手机号不合法！")
    //         return;
    //     }
    //     if (this.codestate == true) {
    //         this.codestate = false;
    //         this.service.http_get("/users/verifycode/" + this.username, false).subscribe((data: any) => {
    //             if (data.msg == "success") {
    //                 this.time = 60
    //                 this.timer = setInterval(() => {
    //                     if (this.time <= 1) {
    //                         this.codestate = true;
    //                         this.time = null;
    //                         clearInterval(this.timer);
    //                         return;
    //                     }
    //                     this.time = this.time - 1;
    //                 }, 1000)
    //             } else {
    //                 this.codestate = true;
    //             }
    //         })
    //     }
    // }
}
