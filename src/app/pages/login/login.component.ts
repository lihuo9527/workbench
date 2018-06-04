import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor( private service: AppService,) { }
    public Language;
    public items = [
        { url: "assets/images/phone.png", text: "Phone Number" ,type:"text",input:"",minlength:11,maxlength:11},
        { url: "assets/images/password.png", text: "Password" ,type:"password",input:"",minlength:6,maxlength:30}
    ]
    ngOnInit() {
        this.Language = localStorage.getItem("language");
    }
    login(){
       this.service.http_post('/users/login',"loginname=" + this.items[0].input + "&password=" + this.items[1].input,  false,"form").subscribe((data:any)=>{
           console.log(data);
       })
    }

    isPoneAvailable(pone){  
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;  
        if (!myreg.test(pone)) {  
          return false;  
        } else {  
          return true;  
        }  
      }
}
