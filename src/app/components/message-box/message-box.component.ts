import { Component, OnInit,Input, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  @Input() public msg:string;
  @Input() public btnText:string;
  @Input() public msgShow:boolean;
  @Output() public event: EventEmitter<string> = new EventEmitter();
  constructor() { }
  
  ngOnInit() {
  }
  send(){
      this.event.emit(JSON.stringify({msgShow:false}))
  }
}
