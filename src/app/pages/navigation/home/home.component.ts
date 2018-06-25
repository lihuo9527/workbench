import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private service: AppService, private cookieService: CookieService, private router: Router) { }
    public list: any = [
        {
            TodayHandledCount: "0",
            TipsCountList: [
                { Url: "/assets/images/a_21.png", Text: "Critical Event", Name: "产前事件", Link: "/search", Id: "0", Amount: "0" },
                { Url: "/assets/images/a_22.png", Text: "Daily Progress", Name: "每日进度", Link: "/search", Id: "1", Amount: "0" },
                { Url: "/assets/images/a_23.png", Text: "Non-planing Process", Name: "非排产工序", Link: "/search", Id: "2", Amount: "0" },
                { Url: "/assets/images/ico_04.png", Text: "All", Name: "全部", Link: "/all", Id: "3", Amount: "0" }]
        },
        {
            title: "Outsourced process plan", title2: "外发工序计划", TodayHandledCount: "0", TipsCountList: [
                { Url: "/assets/images/a_44.png", Text: "Embroidery", Name: "印花", Link: "/search", Id: "5", Amount: "0" },
                { Url: "/assets/images/a_45.png", Text: "Sewing", Name: "车缝", Link: "/search", Id: "6", Amount: "0" },
                { Url: "/assets/images/a_46.png", Text: "Washing", Name: "洗水", Link: "/search", Id: "7", Amount: "0" }]
        },
        {
            title: "Delivery Delay", title2: "交期延误单", TodayHandledCount: "0", TipsCountList: [
                { Url: "/assets/images/ico_21.png", Text: "Urgency", Name: "紧急单", Link: "/deliverDelay", Id: "0", Amount: "0" },
                { Url: "/assets/images/ico_22.png", Text: "Important", Name: "重要单", Link: "/deliverDelay", Id: "1", Amount: "0" },
                { Url: "/assets/images/ico_23.png", Text: "General", Name: "普通单", Link: "/deliverDelay", Id: "2", Amount: "0" }]
        },
        {
            title: "Critical Event Delay", title2: "关键事件延误", TodayHandledCount: "0", TipsCountList: [
                { Url: "/assets/images/ico_31.png", Text: "", Name: "", Link: "/criticalEventDelay", Id: "0", Amount: "0" },
                { Url: "/assets/images/ico_32.png", Text: "", Name: "", Link: "/criticalEventDelay", Id: "1", Amount: "0" },
                { Url: "/assets/images/ico_33.png", Text: "", Name: "", Link: "/criticalEventDelay", Id: "2", Amount: "0" },
                { Url: "/assets/images/ico_34.png", Text: "", Name: "", Link: "/criticalEventDelay", Id: "3", Amount: "0" }]
        },
        {
            title: "Process Delay", title2: "进度延误", TodayHandledCount: "0", TipsCountList: [
                { Url: "/assets/images/ico_41.png", Text: "", Name: "", Link: "/processDelay", Id: "0", Amount: "0" },
                { Url: "/assets/images/ico_42.png", Text: "", Name: "", Link: "/processDelay", Id: "1", Amount: "0" },
                { Url: "/assets/images/ico_43.png", Text: "", Name: "", Link: "/processDelay", Id: "2", Amount: "0" },
                { Url: "/assets/images/ico_44.png", Text: "", Name: "", Link: "/processDelay", Id: "3", Amount: "0" },
                { Url: "/assets/images/ico_45.png", Text: "", Name: "", Link: "/processDelay", Id: "4", Amount: "0" },
                { Url: "/assets/images/ico_46.png", Text: "", Name: "", Link: "/processDelay", Id: "5", Amount: "0" }]
        },
        {
            title: "Material Delay", title2: "物料延误", TodayHandledCount: "0", TipsCountList: [
                { Url: "/assets/images/ico_51.png", Text: "Fabric", Name: "面料", Link: "/materialDelay", Id: "0", Amount: "0" },
                { Url: "/assets/images/ico_52.png", Text: "Accessories", Name: "辅料", Link: "/materialDelay", Id: "1", Amount: "0" }]
        }
    ]
    public language_state;
    public Language;


    ngOnInit() {
        let obj = new window_obj();
        this.Language = obj.language();
        let time: number = 2 * 60 * 6000 * 100000;
        localStorage.setItem("language", this.Language);
        if (obj.cookies()) this.cookieService.set('JSESSIONID', obj.cookies(), new Date(new Date().getTime() + time));
        if (!obj.defaultCompany()) this.router.navigate(['not-bind']);
        let url: string;
        for (let i = 1; i < this.list.length; i++) {
            switch (i) {
                case 1: url = "/api/Main/GetOutgoingProcessCount";
                    break;
                case 2: url = "/api/Main/GetDeliveryDelayCount";
                    break;
                case 3: url = "/api/Main/GetEventsDelayCount";
                    break;
                case 4: url = "/api/Main/GetProcessDelayCount";
                    break;
                case 5: url = "/api/Main/GetMaterialDelayCount";
                    break;
                case 6: url = "/api/Main/GetTodayCount";
                    break;
            }
            this.service.http_get(url, false).subscribe((data: any) => {
                let obj = data;
                this.list[i].TodayHandledCount = obj.TodayHandledCount;
                if (obj.TipsCountList.length > 0) {
                    for (let b = 0; b < this.list[i].TipsCountList.length; b++) {
                        if (i == 3 || i == 4) {
                            this.list[i].TipsCountList = obj.TipsCountList;
                        }
                    }
                }
            }
                , error => {
                    console.log("404/error")
                })

        }
    }

}
