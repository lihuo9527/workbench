import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-capacity-figure',
    templateUrl: './capacity-figure.component.html',
    styleUrls: ['./capacity-figure.component.css']
})
export class CapacityFigureComponent implements OnInit {
    @Input() dataA;
    @Input() dataB;
    @Input() maxValue;
    @Input() index;
    public option;
    public countpercent: number;
    public totalCapacity: number;
    public totalLoad: number;
    public total: number;
    public lang;
    constructor() { }

    ngOnInit() {
        this.lang = localStorage.getItem("language");
        if (this.dataA.length < 3) {
            for (let i = this.dataA.length; i < 3; i++) {
                const obj: any = {};
                obj.color = '#fff';
                obj.value = 0;
                obj.name = "";
                this.dataA.push(obj);
            }
        }
        if (this.dataB.length < 3) {
            for (let i = this.dataB.length; i < 3; i++) {
                const obj: any = {};
                obj.color = '#fff';
                obj.value = 0;
                obj.name = "";
                this.dataB.push(obj);
            }
        }
        this.option = this.createChart(this.dataA, this.dataB);
        this.totalCapacity = this.dataA[0].value + this.dataA[1].value + this.dataA[2].value;
        this.totalLoad = this.dataB[0].value + this.dataB[1].value + this.dataB[2].value;
        this.total = this.totalCapacity - this.totalLoad;
        this.countpercent = this.totalLoad / this.totalCapacity * 100;
    }
    createChart(x, y: any[]) {
        return {
            tooltip: {
                confine:true,
                triggerOn: 'click',
                textStyle: { color: "#fff" },
                position: ['10%', '0%'],
                padding: [
                    7,  // 上
                    10, // 右
                    7,  // 下
                    10, // 左
                ],
                alwaysShowContent: false,
                trigger: 'item',
                formatter: (params) => {
                    if (params.seriesName == "total") return null;
                    if (this.lang == 'cn') {
                        switch (params.seriesName) {
                            case "TotalCapacity":
                                params.seriesName = "总产能";
                                break;
                            case "NormalCapacity":
                                params.seriesName = "正常产能";
                                break;
                            case "OtCapacity":
                                params.seriesName = "加班产能";
                                break;
                            case "OutCapacity":
                                params.seriesName = "外发产能";
                                break;
                            case "PoPlanLoading":
                                params.seriesName = "实单已排负载";
                                break;
                            case "PoLoading":
                                params.seriesName = "实单未排负载";
                                break;
                            case "VirPlanLoading":
                                params.seriesName = "非实单已排负载";
                                break;
                            case "VirPoLoading":
                                params.seriesName = "非实单未排负载";
                                break;
                        }

                    }
                    console.log(this.index);
                    let index = this.index + 1

                    let color = params.color;//图例颜色
                    let htmlStr = '<div style="color:#ffffff;line-height:1.4rem;">';
                    htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>';
                    // console.log(params.seriesName);
                    if (index % 4 == 0) {
                        htmlStr += params.value + '';
                    }else{
                        htmlStr += params.seriesName + '：' + params.value + '';
                    }
                    htmlStr += '</div>';
                    return htmlStr;
                },

                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    z: 3,
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
            },
            grid: {
                containLabel: true,
                left: "-25%",
                // right: "10%",
                top: "20%",
                bottom: "5%"
            },
            xAxis: [{
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#ddd"
                    }
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true
                },
                type: 'category',
            }],
            yAxis: [{
                show: false,
                type: 'value'
            }],
            series: [
                {
                    name: x[2].name,
                    color: [x[2].color],
                    type: 'bar',
                    stack: 'B',
                    data: [x[2].value]
                },
                {
                    name: x[1].name,
                    color: [x[1].color],
                    type: 'bar',
                    stack: 'B',
                    data: [x[1].value],
                },
                {
                    name: x[0].name,
                    type: 'bar',
                    stack: 'B',
                    data: [x[0].value],
                    color: [x[0].color],
                },
                {
                    name: y[2].name,
                    type: 'bar',
                    color: [y[2].color],
                    stack: 'C',
                    data: [y[2].value],
                },
                {
                    name: y[1].name,
                    type: 'bar',
                    color: [y[1].color],
                    stack: 'C',
                    data: [y[1].value],
                },
                {
                    name: y[0].name,
                    type: 'bar',
                    color: [y[0].color],
                    stack: 'C',
                    data: [y[0].value],
                },
                {
                    name: "total",
                    type: 'bar',
                    stack: 'D',
                    data: [this.maxValue],
                    color: ["#fff"],
                },
            ]
        };
    }
}
