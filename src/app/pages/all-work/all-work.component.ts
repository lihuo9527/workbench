import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-all-work',
    templateUrl: './all-work.component.html',
    styleUrls: ['./all-work.component.css']
})
export class AllWorkComponent implements OnInit {

    constructor() { }
    public Link = ["/home"]
    public list_1 = [
        { url: "/assets/images/a_11.png", text: "Macro Capacity", text2: "宏观产能", link: "" },
        { url: "/assets/images/a_12.png", text: "JO Details", text2: "生产单明细分析", link: "/search", id: "4" },
        { url: "/assets/images/a_13.png", text: "JO Tracking", text2: "生产单跟催", link: "/search", id: "0" },
        { url: "/assets/images/a_14.png", text: "Daily Output", text2: "日计划产量", link: "/search", id: "1" },
        { url: "/assets/images/a_15.png", text: "Running Schedule", text2: "滚动生产排期", link: "/search", id: "2" },
        { url: "/assets/images/a_16.png", text: "Line  Efficiency", text2: "生产线效率", link: "/search", id: "3" }
    ]
    public list_2 = [{
        title: "Entry", title2: "录入审核", data: [
            { url: "/assets/images/a_21.png", text: "Critical Event", text2: "产前事件", link: "/criticalEvent", id: "all", index: "0" },
            { url: "/assets/images/a_22.png", text: "Daily Progress", text2: "每日进度", link: "/productionDailyProgress", id: "all", index: "0" },
            { url: "/assets/images/a_23.png", text: "Non-planing Process", text2: "非排产工序", link: "/NonPlaningProcessComponent", id: "all", index: "0" }]
    },
    {
        title: "Abnormal Event Reminder", title2: "异常事件提醒", data: [
            { url: "/assets/images/a_31.png", text: "Delivery Dalay", text2: "交期延误", link: "/deliverDelay", id: "all", index: "0" },
            { url: "/assets/images/a_32.png", text: "Process Dalay", text2: "进度落后", link: "/processDelay", id: "all", index: "0" },
            { url: "/assets/images/a_33.png", text: "Start Time Dalay", text2: "开工期延误", link: "/startDelay", id: "all", index: "0" },
            { url: "/assets/images/a_34.png", text: "Critical Event Dalay", text2: "关键事件延误", link: "/criticalEventDelay", id: "all", index: "0" },
            { url: "/assets/images/a_35.png", text: "Material Arrival Dalay", text2: "物料到货延误", link: "/materialDalay", id: "all", index: "0" }]
    },
    {
        title: "Material and Key Event Reminder", title2: "物料与关键事件提醒", data: [
            { url: "/assets/images/a_41.png", text: "Material Arrival (within 7 days)", text2: "7天内到货物料", link: "/sevenDay", id: "0", index: "0" },
            { url: "/assets/images/a_42.png", text: "Events Finished (within 7 days)", text2: "7天内完成事件", link: "/sevenDay", id: "1", index: "0" },
            { url: "/assets/images/a_43.png", text: "Progress Tracking (within 7 days)", text2: "7天内进度跟踪", link: "/sevenDay", id: "2", index: "0" }]
    }
    ]
    public Language;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
    }

}
