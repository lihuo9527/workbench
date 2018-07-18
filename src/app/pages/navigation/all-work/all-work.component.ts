import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-all-work',
    templateUrl: './all-work.component.html',
    styleUrls: ['./all-work.component.css']
})
export class AllWorkComponent implements OnInit {

    constructor(private router: Router, private service: AppService, ) { }
    public link = ["/home"];
    public list = [
        {
            title: "Entry", title2: "录入审核", data: [
                { url: "/assets/images/a_21.png", text: "Critical Event", text2: "关键事件进度", link: "/search", id: "0", index: "0" },
                { url: "/assets/images/a_22.png", text: "Daily Progress", text2: "生产日进度", link: "/search", id: "1", index: "0" },
                { url: "/assets/images/a_23.png", text: "Non-planing Process", text2: "非排产工序日进度", link: "/search", id: "2", index: "0" }]
        },
        {
            title: "Abnormal Event Reminder", title2: "异常事件提醒", data: [
                { url: "/assets/images/a_31.png", text: "Delivery Delay", text2: "交期延误", link: "/deliverDelay", id: "all", index: "0" },
                { url: "/assets/images/a_32.png", text: "Process Delay", text2: "工序延误", link: "/processDelay", id: "all", index: "0" },
                { url: "/assets/images/a_33.png", text: "Start Time Delay", text2: "开工期延误", link: "/startDelay", id: "all", index: "0" },
                { url: "/assets/images/a_34.png", text: "Critical Event Delay", text2: "关键事件延误", link: "/criticalEventDelay", id: "all", index: "0" },
                { url: "/assets/images/a_35.png", text: "Material Arrival Delay", text2: "物料延误", link: "/materialDelay", id: "all", index: "0" }]
        },
        {
            title: "Material and Key Event Reminder", title2: "物料与关键事件提醒", data: [
                { url: "/assets/images/a_41.png", text: "Material Arrival (within N days)", text2: "N天内到货物料", link: "/ndays/selectType", id: "all", index: "0" },
                { url: "/assets/images/a_42.png", text: "Events Finished (within N days)", text2: "N天内完成事件", link: "/ndays/eventsFinished", id: "all", index: "0" },
                { url: "/assets/images/a_43.png", text: "Progress Tracking (within N days)", text2: "N天内进度跟踪", link: "/ndays/progressTracking", id: "all", index: "0" }]
        },
        {
            title: "Analysis Report", title2: "分析报表", data: [
                { url: "/assets/images/a_9.png", text: "Macro Capacity", text2: "宏观产能", link: "/forms/macroCapacity", id: "" },
                { url: "/assets/images/a_1.png", text: "Line Product Type Summary", text2: "工厂当天生产线产品类别统计", link: "/forms/typeSummary", id: "" },
                { url: "/assets/images/a_2.png", text: "Factory Eff% By Current Monthly", text2: "当月工厂效率汇总统计", link: "/forms/theMonthEff", id: "" },
                { url: "/assets/images/a_3.png", text: "Factory Eff% By Monthly", text2: "工厂每月生产效率汇总", link: "/forms/everyMonthEff", id: "" },
                { url: "/assets/images/a_4.png", text: "Customer Actual Output By Monthly", text2: "当月品牌客户实际生产数量统计", link: "/forms/customerOutput", id: "" },
                { url: "/assets/images/a_5.png", text: "Daily Line Eff% Summary", text2: "当天生产线效率统计表", link: "/forms/dailyLineEff", id: "" },
                // { url: "/assets/images/a_6.png", text: "Order Production LeadTime Summary", text2: "订单周期生产情况统计", link: "/forms/orderCycleProduction", id: "" },
                { url: "/assets/images/a_7.png", text: "Production QTY & Total SAH/SAM By Monthly", text2: "每月生产数量和耗时统计", link: "/forms/everyMonthQty", id: "" }
                // { url: "/assets/images/a_8.png", text: "Order LeadTime Summary", text2: "订单周期统计", link: "/forms/orderCycleSummary", id: "" }
            ]
        }
    ]
    public language;
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.service.http_get('/api/TaskWarn/GetAlertDays', false).subscribe((data: any) => {
            let obj: any = this.list[2].data;
            obj.forEach((element, i) => {
                if (i == 0) {
                    element.text = `Material Arrival (within ${data.value} days)`;
                    element.text2 = `${data.value}天内到货物料`;
                }
                if (i == 1) {
                    element.text = `Events Finished (within ${data.value} days)`;
                    element.text2 = `${data.value}天内完成事件`;
                }
                if (i == 2) {
                    element.text = `Progress Tracking (within ${data.value} days)`;
                    element.text2 = `${data.value}天内进度跟踪`;
                }
            });
        })
    }
    routerlink(item, index) {
        console.log(index);
        let title = this.language == 'en' ? item.text : item.text2;
        if (index == 0 || index == 2) this.router.navigate([item.link, JSON.stringify({ id: item.id, t: title, i: index })]);
        if (index == 1) this.router.navigate([item.link, item.id]);
        if (index == 3) this.router.navigate([item.link]);
    }

}
