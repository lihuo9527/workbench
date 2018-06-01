import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    constructor() { }
    public Language;
    public items = [
        {text:"Verification Code",value:"",url:"assets/images/key.png"},
        { text: "New Password" ,value:"",url:"assets/images/password2.png"},
        { text: "Confirm Password",value:"",url:"assets/images/password2.png"}
    ]
    ngOnInit() {
        this.Language = localStorage.getItem("language");
    }
    alert(){
        console.log(this.items)
    }
}
