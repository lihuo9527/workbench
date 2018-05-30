import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppService } from '../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-detail-analysis',
    templateUrl: './detail-analysis.component.html',
    styleUrls: ['./detail-analysis.component.css']
})
export class DetailAnalysisComponent implements OnInit {
    @ViewChild("Pointer") public Pointer: ElementRef;
    @ViewChild("Pointer2") public Pointer2: ElementRef;
    public Language;
    public navigations = [{ text: "细分", text2: "subdivision", state: false },
    { text: "事件", text2: "Events", state: false },
    { text: "计划", text2: "Plan", state: false },
    { text: "车缝进度", text2: "Sewing Pro", state: false },
    { text: "非排产工序", text2: "Non-planing", state: false },
    { text: "物料", text2: "Material", state: false }];
    public id;
    public listname;
    public data;
    public list;
    public ctx;
    public state = false;
    constructor(private service: AppService, private routerIonfo: ActivatedRoute, ) { }

    ngOnInit() {
        this.data = JSON.parse(this.routerIonfo.snapshot.params["data"]);
        this.navigations[0].state = true;
        this.listname = this.navigations[0].text;
        this.Language = localStorage.getItem("language");
        this.service.http_get("/api/ReportPo/GetPoDetaile?poid=" + this.data.id, false).subscribe((data:any) => {
            if (data.length > 0) this.list = data;
            console.log(data);

        })

    }
    ngAfterViewInit() {

    }
    Transition(state) {
        if (state) {
            this.Pointer.nativeElement.style.transform = "rotate(-180deg)"
            this.Pointer2.nativeElement.style.transform = "rotate(-180deg)"
        } else {
            this.Pointer.nativeElement.style.transform = "rotate(0deg)"
            this.Pointer2.nativeElement.style.transform = "rotate(-90deg)"
        }

    }
    Select(index) {
        console.log(index)
        for (let i = 0; i < this.navigations.length; i++) {
            if (i == index) {
                this.navigations[i].state = true;
            } else {
                this.navigations[i].state = false;
            }
        }
        this.id = index;
        this.listname = this.Language == "en" ? this.navigations[index].text2 : this.navigations[index].text;
    }
}
