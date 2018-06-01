import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor() { }
    public Language;
    public items = [
        { url: "assets/images/phone.png", text: "Phone Number" ,type:"text"},
        { url: "assets/images/password.png", text: "Password" ,type:"password"}
    ]
    ngOnInit() {
        this.Language = localStorage.getItem("language");
    }

}
