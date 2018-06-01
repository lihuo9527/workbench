import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }
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
}
