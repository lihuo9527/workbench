import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private service: AppService) { }
    public list: any = [
        {
            TodayHandledCount: "0",
            TipsCountList: [
                { url: "/assets/images/ico_01.png", text: "JO Tracking", Name: "生产单跟踪", link: "/search", Id: "0", Amount: "0" },
                { url: "/assets/images/ico_02.png", text: "Daily Output", Name: "日计划产量", link: "/search", Id: "1", Amount: "0" },
                { url: "/assets/images/ico_03.png", text: "Running Schedule", Name: "滚动排期", link: "/search", Id: "2", Amount: "0" },
                { url: "/assets/images/ico_04.png", text: "All", Name: "全部", link: "/all", Id: "3", Amount: "0" }]
        },
        {
            title: "Outgoing Process Plan", title2: "外发工序计划", TodayHandledCount: "0", TipsCountList: [
                { url: "/assets/images/a_44.png", text: "Embroidery", Name: "印花", link: "/search", Id: "5", Amount: "0" },
                { url: "/assets/images/a_45.png", text: "Sewing", Name: "车缝", link: "/search", Id: "6",  Amount: "0" },
                { url: "/assets/images/a_46.png", text: "Washing", Name: "洗水", link: "/search", Id: "7", Amount: "0" }]
        },
        {
            title: "Delivery Delay", title2: "交期延误单", TodayHandledCount: "0", TipsCountList: [
                { url: "/assets/images/ico_21.png", text: "Urgency", Name: "紧急单", link: "/deliverDelay", Id: "0",  Amount: "0" },
                { url: "/assets/images/ico_22.png", text: "Important", Name: "重要单", link: "/deliverDelay", Id: "1", Amount: "0" },
                { url: "/assets/images/ico_23.png", text: "General", Name: "普通单", link: "/deliverDelay", Id: "2",  Amount: "0" }]
        },
        {
            title: "Critical Event Delay", title2: "关键事件延误", TodayHandledCount: "0", TipsCountList: [
                { url: "/assets/images/ico_31.png", text: "AD", Name: "", link: "/criticalEventDelay", Id: "0", Amount: "0" },
                { url: "/assets/images/ico_32.png", text: "Counter Sample", Name: "", link: "/criticalEventDelay", Id: "1", Amount: "0" },
                { url: "/assets/images/ico_33.png", text: "Trim Card", Name: "", link: "/criticalEventDelay", Id: "2", Amount: "0" },
                { url: "/assets/images/ico_34.png", text: "Marker", Name: "", link: "/criticalEventDelay", Id: "3", Amount: "0" }]
        },
        {
            title: "Process Delay", title2: "进度延误", TodayHandledCount: "0", TipsCountList: [
                { url: "/assets/images/ico_41.png", text: "Sewing", Name: "", link: "/processDelay", Id: "0", Amount: "0" },
                { url: "/assets/images/ico_42.png", text: "Packing", Name: "", link: "/processDelay", Id: "1", Amount: "0" },
                { url: "/assets/images/ico_43.png", text: "Cutting", Name: "", link: "/processDelay", Id: "2", Amount: "0" },
                { url: "/assets/images/ico_44.png", text: "Printing", Name: "", link: "/processDelay", Id: "3", Amount: "0" },
                { url: "/assets/images/ico_45.png", text: "EmbroIdery", Name: "", link: "/processDelay", Id: "4", Amount: "0" },
                { url: "/assets/images/ico_46.png", text: "Heat Transfer", Name: "", link: "/processDelay", Id: "5", Amount: "0" }]
        },
        {
            title: "Material Delay", title2: "物料延误", TodayHandledCount: "0", TipsCountList: [
                { url: "/assets/images/ico_51.png", text: "Fabric", Name: "面料", link: "/materialDalay", Id: "0", Amount: "0" },
                { url: "/assets/images/ico_52.png", text: "Accessories", Name: "辅料", link: "/materialDalay", Id: "1", Amount: "0" }]
        },
        {
            title: "Today", title2: "今日工作", TodayHandledCount: "0", TipsCountList: [
                { url: "/assets/images/ico_61.png", text: "Critical Event", Name: "关键事件", link: "/today", Id: "1", Amount: "0" },
                { url: "/assets/images/ico_62.png", text: "Production", Name: "生产", link: "/today", Id: "2", Amount: "0" },
                { url: "/assets/images/ico_63.png", text: "Material purchase", Name: "物料采购", link: "/today", Id: "3", Amount: "0" }]
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
        this.service.set_params("true");
        this.Language = obj.language();
        localStorage.setItem("language", this.Language);
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
