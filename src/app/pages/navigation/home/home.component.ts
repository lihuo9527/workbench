import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private service: AppService,private cookieService:CookieService) { }
    public list: any = [
        {
            TodayHandledCount: "0",
            TipsCountList: [
                { Url: "/assets/images/ico_01.png", Text: "JO Tracking", Name: "生产单跟踪", Link: "/search", Id: "0", Amount: "0" },
                { Url: "/assets/images/ico_02.png", Text: "Daily Output", Name: "日计划产量", Link: "/search", Id: "1", Amount: "0" },
                { Url: "/assets/images/ico_03.png", Text: "Running Schedule", Name: "滚动排期", Link: "/search", Id: "2", Amount: "0" },
                { Url: "/assets/images/ico_04.png", Text: "All", Name: "全部", Link: "/all", Id: "3", Amount: "0" }]
        },
        {
            title: "Outgoing Process Plan", title2: "外发工序计划", TodayHandledCount: "0", TipsCountList: [
                { Url: "/assets/images/a_44.png", Text: "Embroidery", Name: "印花", Link: "/search", Id: "5", Amount: "0" },
                { Url: "/assets/images/a_45.png", Text: "Sewing", Name: "车缝", Link: "/search", Id: "6",  Amount: "0" },
                { Url: "/assets/images/a_46.png", Text: "Washing", Name: "洗水", Link: "/search", Id: "7", Amount: "0" }]
        },
        {
            title: "Delivery Delay", title2: "交期延误单", TodayHandledCount: "0", TipsCountList: [
                { Url: "/assets/images/ico_21.png", Text: "Urgency", Name: "紧急单", Link: "/deliverDelay", Id: "0",  Amount: "0" },
                { Url: "/assets/images/ico_22.png", Text: "Important", Name: "重要单", Link: "/deliverDelay", Id: "1", Amount: "0" },
                { Url: "/assets/images/ico_23.png", Text: "General", Name: "普通单", Link: "/deliverDelay", Id: "2",  Amount: "0" }]
        },
        {
            title: "Critical Event Delay", title2: "关键事件延误", TodayHandledCount: "0", TipsCountList: [
                { Url: "/assets/images/ico_31.png", Text: "AD", Name: "", Link: "/criticalEventDelay", Id: "0", Amount: "0" },
                { Url: "/assets/images/ico_32.png", Text: "Counter Sample", Name: "", Link: "/criticalEventDelay", Id: "1", Amount: "0" },
                { Url: "/assets/images/ico_33.png", Text: "Trim Card", Name: "", Link: "/criticalEventDelay", Id: "2", Amount: "0" },
                { Url: "/assets/images/ico_34.png", Text: "Marker", Name: "", Link: "/criticalEventDelay", Id: "3", Amount: "0" }]
        },
        {
            title: "Process Delay", title2: "进度延误", TodayHandledCount: "0", TipsCountList: [
                { Url: "/assets/images/ico_41.png", Text: "Sewing", Name: "", Link: "/processDelay", Id: "0", Amount: "0" },
                { Url: "/assets/images/ico_42.png", Text: "Packing", Name: "", Link: "/processDelay", Id: "1", Amount: "0" },
                { Url: "/assets/images/ico_43.png", Text: "Cutting", Name: "", Link: "/processDelay", Id: "2", Amount: "0" },
                { Url: "/assets/images/ico_44.png", Text: "Printing", Name: "", Link: "/processDelay", Id: "3", Amount: "0" },
                { Url: "/assets/images/ico_45.png", Text: "EmbroIdery", Name: "", Link: "/processDelay", Id: "4", Amount: "0" },
                { Url: "/assets/images/ico_46.png", Text: "Heat Transfer", Name: "", Link: "/processDelay", Id: "5", Amount: "0" }]
        },
        {
            title: "Material Delay", title2: "物料延误", TodayHandledCount: "0", TipsCountList: [
                { Url: "/assets/images/ico_51.png", Text: "Fabric", Name: "面料", Link: "/materialDalay", Id: "0", Amount: "0" },
                { Url: "/assets/images/ico_52.png", Text: "Accessories", Name: "辅料", Link: "/materialDalay", Id: "1", Amount: "0" }]
        },
        {
            title: "Today", title2: "今日工作", TodayHandledCount: "0", TipsCountList: [
                { Url: "/assets/images/ico_61.png", Text: "Critical Event", Name: "关键事件", Link: "/today", Id: "1", Amount: "0" },
                { Url: "/assets/images/ico_62.png", Text: "Production", Name: "生产", Link: "/today", Id: "2", Amount: "0" },
                { Url: "/assets/images/ico_63.png", Text: "Material purchase", Name: "物料采购", Link: "/today", Id: "3", Amount: "0" }]
        }
    ]
    public language_state;
    public Language;


    ngOnInit() {
        // this.service.http_get("http://127.0.0.1:3000/app.js?name=li&password=123456&router=login2",true).subscribe(data=>{
        //     console.log(data);
        // })
        // this.service.http_post("http://127.0.0.1:3000/app.js","name=li&password=123456&router=login",true).subscribe(data=>{
        //     console.log(data);
        // })
        let obj = new window_obj();
        console.log(obj.ip());
        console.log(obj.language());
        this.Language = obj.language();
        let time :number = 2*60*6000*100000;
        if(obj.cookies()){
            console.log("cookies")
            this.cookieService.set('JSESSIONID', obj.cookies(),new Date(new Date().getTime() + time));
        }
        localStorage.setItem("language", this.Language);
        this.service.set_params("true");
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
            this.service.http_get(url, false).subscribe((data:any) => {
                // console.log(JSON.stringify(data))
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