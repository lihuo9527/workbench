import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selecting-suppliers',
  templateUrl: './selecting-suppliers.component.html',
  styleUrls: ['./selecting-suppliers.component.css']
})
export class SelectingSuppliersComponent implements OnInit {

  constructor() { }
  public Language;
  public title;
  ngOnInit() {
    this.Language = localStorage.getItem("language");
    this.title = "Selecting Suppliers"
  }

}
