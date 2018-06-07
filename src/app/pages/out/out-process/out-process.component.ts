import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-out-process',
    templateUrl: './out-process.component.html',
    styleUrls: ['./out-process.component.css']
})
export class OutProcessComponent implements OnInit {

    constructor(private routerIonfo: ActivatedRoute, private service: AppService, private router: Router) { }
    public data;
    public id;
    public Language;
    public title;
    public datas = [];
    ngOnInit() {
        this.data = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.id = this.data.id;
        console.log(this.id)
        this.Language = localStorage.getItem("language");
        if (this.id == 5 && this.Language == "en") this.title = 'Embroidery Printing Process Plan';
        if (this.id == 5 && this.Language == "cn") this.title = '印绣花工序';
        if (this.id == 6 && this.Language == "en") this.title = 'Sewing Process Plan';
        if (this.id == 6 && this.Language == "cn") this.title = '车缝';
        if (this.id == 7 && this.Language == "en") this.title = 'Washing Process Plan';
        if (this.id == 7 && this.Language == "cn") this.title = '洗水';
        this.UpdateList();
    }

    UpdateList() {
        let pageIndex = Math.ceil(this.datas.length / 4) + 1;
        this.service.http_get('/api/OuterFactory/GetPoes?pageIndex=' + pageIndex + '&pageSize=4&star=' + this.data.start + '&end=' + this.data.end + '&productTypeID=' + this.id, false).subscribe((data: any) => {
            let obj = data;
            if (obj.length > 0) {
                for (let i = 0; i < obj.length; i++) {
                    this.datas.push(obj[i]);
                }
            }
        })
    }
    Link(item){
        this.router.navigate(['planEntry', JSON.stringify({data:item,title:this.title})]);
    }
}
