import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-seven-day',
  templateUrl: './seven-day.component.html',
  styleUrls: ['./seven-day.component.css']
})
export class SevenDayComponent implements OnInit {

  constructor(private service: AppService, private routerIonfo: ActivatedRoute, ) { }
  public datas = [];
  public id;
  public Language;
  public url;
  ngOnInit() {
    this.Language = localStorage.getItem("language");
    this.id = this.routerIonfo.snapshot.params["id"];
    // console.log( "id:" + this.id);
    if (this.id == 0) this.url = '/api/TaskWarn/GetDetailMatReceive?';
    if (this.id == 1) this.url = '/api/TaskWarn/GetDetailEventNotMaintain?';
    if (this.id == 2) this.url = '/api/TaskWarn/GetDetailProgressTrack?';
    this.GetList(1);
  }
  GetList(index?) {
    let pageIndex = Math.ceil(this.datas.length / 4 + 1);
    this.service.http_get(this.url + 'pageIndex=' + pageIndex + '&pageSize=4', false).subscribe((data:any) => {
      if (index != undefined) {
        if (data.length > 0) this.datas = data;
      } else {
        this.service.up_date(this.datas, data);
      }
    })
  }
}
