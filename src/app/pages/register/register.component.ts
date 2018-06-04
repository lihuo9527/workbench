import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service:AppService) { }
  public Language;
  public state = false;
  ngOnInit() {
    this.Language = localStorage.getItem("language");
  }
  ngAfterViewInit() {

  }
  lookStart(){
    document.querySelector('#password')['type'] = "text";
  }
  lookEnd(){
    document.querySelector('#password')['type'] = "password";
  }
  register(state){
      if(state){
        console.log("!!!")
      }
  }
}
