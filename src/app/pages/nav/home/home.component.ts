import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(
        private service: AppService,
        private cookieService: CookieService,
        private router: Router,
        //  private translate: TranslateService
    ) { }
    public list: any = [
        {
            TodayHandledCount: "0",
            TipsCountList: [
                { Url: "/assets/images/a_21.png", Text: "Critical Event Progress", Name: "关键事件进度", Link: "/search", Id: "0", Amount: "0" },
                { Url: "/assets/images/a_22.png", Text: "Daily Progress", Name: "生产日进度", Link: "/search", Id: "1", Amount: "0" },
                { Url: "/assets/images/a_23.png", Text: "No-Planning Progress", Name: "非排产工序日进度", Link: "/search", Id: "2", Amount: "0" },
                { Url: "/assets/images/ico_04.png", Text: "All", Name: "全部", Link: "/all", Id: "3", Amount: "0" }]
        },
        {
            title: "Outsourced process plan", title2: "外发工序计划", TodayHandledCount: "0", TipsCountList: []
        },
        {
            title: "Delay Orders", title2: "交期延误单", TodayHandledCount: "0", TipsCountList: [
                // { Url: "/assets/images/ico_21.png", Text: "General", Name: "普通单", Link: "/deliverDelay", Id: "0", Amount: "0" },
                // { Url: "/assets/images/ico_22.png", Text: "Important", Name: "重要单", Link: "/deliverDelay", Id: "1", Amount: "0" },
                // { Url: "/assets/images/ico_23.png", Text: "Urgency", Name: "紧急单", Link: "/deliverDelay", Id: "2", Amount: "0" }
            ]
        },
        {
            title: "Delay Critical Events", title2: "关键事件延误", TodayHandledCount: "0", TipsCountList: []
        },
        {
            title: "Delay Operations/Process", title2: "工序延误", TodayHandledCount: "0", TipsCountList: []
        },
        {
            title: "Delay Material", title2: "物料延误", TodayHandledCount: "0", TipsCountList: [
                // { Url: "/assets/images/ico_51.png", Text: "Fabric", Name: "主料", Link: "/materialDelay", Id: "0", Amount: "0" },
                // { Url: "/assets/images/ico_52.png", Text: "Accessories", Name: "辅料", Link: "/materialDelay", Id: "1", Amount: "0" }
            ]
        }
    ]
    public language;
    public init: boolean;

    ngOnInit() {
        let obj = new window_obj();
        this.language = obj.language();
        localStorage.setItem("language", this.language);
        if (this.service.accessControl(obj, "home")) {
            this.init = false;
            return;
        } else {
            this.init = true;
        }
        // this.translate.addLangs(["zh", "en"]);
        // this.translate.setDefaultLang("zh");
        // this.translate.use("zh");
        // this.translate.get('HomePage.event', { value: 'event' }).subscribe((res: string) => {
        //     this.list[0] = res;
        //     console.log(res);
        // });
        this.updateList();
    }
    //获取角标、图标、标题
    updateList() {
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
            }
            this.service.http_get(url, false).subscribe((data: any) => {
                let obj = data;
                this.list[i].TodayHandledCount = obj.TodayHandledCount;
                if (obj.TipsCountList.length > 0) {
                    this.list[i].TipsCountList = obj.TipsCountList;
                }
            }
                , error => {
                    console.log("404/error")
                })

        }
    }
    //路由跳转
    link(item, items, index) {
        console.log("index", index, item.Id);
        if (index == 0 && item.Id == "3") {
            this.router.navigate([item.Link])
            return;
        }
        let title = this.language == 'en' ? item.Text : item.Name;
        if (index == 0 || index == 1) this.router.navigate([item.Link, JSON.stringify({ id: item.Id, t: title, i: index })]);
        if (index != 0 && index != 1) this.router.navigate([item.Link, item.Id]);

    }

}
