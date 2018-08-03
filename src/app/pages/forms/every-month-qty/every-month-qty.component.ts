import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-every-month-qty',
    templateUrl: './every-month-qty.component.html',
    styleUrls: ['./every-month-qty.component.css']
})
//每月生产数量和耗时统计
export class EveryMonthQtyComponent implements OnInit {

    constructor(private service: AppService) { }
    public language;
    public option;
    public length = 0;
    public texts = ["产量", "件", "耗时"];
    ngOnInit() {
        this.language = localStorage.getItem("language");
        if (this.language == "en") {
            this.texts[0] = "Production";
            this.texts[1] = "piece";
            this.texts[2] = "Time Consuming";
        }
        this.service.http_get('/api/Monitor/GetChartData?vrpcode=RPT105', false).subscribe((data: any) => {
            let titles = [];
            let bar = [];
            let line = [];
            let average = data[0].Average;
            if (data[0].ChartNodes.length) this.length = data[0].ChartNodes.length;
            data[0].ChartNodes.forEach(element => {
                bar.push(element.yvalue2);
                line.push(element.yvalue1);
                titles.push(element.xname);
            });
            this.option = {
                backgroundColor: "#fff",
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                },
                grid: {
                    containLabel: true,
                    left: "6",
                    top: "50",
                    right: "6",
                    bottom: "20",
                    y2: 140
                },
                legend: {
                    data: [this.texts[2], this.texts[0]],
                    top: "0",
                },
                xAxis: [{
                    axisLabel: {
                        interval: 0,//横轴信息全部显示  
                        rotate: -30,//-30度角倾斜显示  
                    },
                    type: 'category',
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: true
                    },
                    data: titles
                }],
                yAxis: [{
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,

                    },
                    type: 'value',
                    name: `${this.texts[2]}(h)`,
                    min: 0,
                    position: 'left',
                    axisLabel: {
                        formatter: '{value}'
                    }
                }, {
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,

                    },
                    type: 'value',
                    name: `${this.texts[0]}(${this.texts[1]})`,
                    min: 0,
                    position: 'right'
                }],
                series: [{
                    name: this.texts[2],
                    type: 'line',
                    stack: '耗时',
                    itemStyle: {
                        color: "#3384d5"
                    },
                    symbolSize: "7",
                    markLine: {
                        symbol: ["none", "none"],
                        data: [
                            { type: 'average', name: '平均值', yAxis: average, label: { show: false } }
                        ],
                    },
                    lineStyle: {
                        color: "#7cdbad", width: "1"
                    },
                    data: line
                },
                {
                    color: ["#54a6de"],
                    name: this.texts[0],
                    type: 'bar',
                    yAxisIndex: 1,
                    stack: '产量',
                    data: bar,
                    barCategoryGap: "30%",
                    barMaxWidth: '30%',
                },
                ]
            }
        })
    }


}
