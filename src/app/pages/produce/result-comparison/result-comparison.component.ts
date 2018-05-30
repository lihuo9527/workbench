import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-comparison',
  templateUrl: './result-comparison.component.html',
  styleUrls: ['./result-comparison.component.css']
})
export class ResultComparisonComponent implements OnInit {

  constructor() { }
  public Language;
  ngOnInit() {
    this.Language = localStorage.getItem("language");
  }

}
