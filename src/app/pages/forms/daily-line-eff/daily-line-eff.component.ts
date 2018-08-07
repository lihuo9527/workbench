import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-daily-line-eff',
    templateUrl: './daily-line-eff.component.html',
    styleUrls: ['./daily-line-eff.component.css']
})
//当天生产效率
export class DailyLineEffComponent implements OnInit {

    constructor(private service: AppService) { }

    public language;
    public option;
    public length = 0;
    public texts = ["产量", "件", "效率"];
    ngOnInit() {
        this.language = localStorage.getItem("language");
        if (this.language == "en") {
            this.texts[0] = "Production";
            this.texts[1] = "piece";
            this.texts[2] = "Efficiency";
        }
        this.service.http_get('/api/Monitor/GetChartData?vrpcode=RPT104', false).subscribe((data: any) => {
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
                    left: "10",
                    top: "50",
                    right: "20",
                    bottom: "20"
                },
                legend: {
                    data: [this.texts[2], this.texts[0]],
                    top: "0",
                    selectedMode: false,
                },
                xAxis: [
                    {
                        axisLabel: {
                            interval: 0
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
                yAxis: [
                    {
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,

                        },
                        type: 'value',
                        name: `${this.texts[2]}(%)`,
                        min: 0,
                        max: 200,
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
                dataZoom: [                                      //区域缩放  
                    {
                        type: 'inside',                         //slider表示有滑动块的，inside表示内置的
                    }
                ],
                series: [
                    {
                        name: this.texts[2],
                        type: 'line',
                        stack: '效率',
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
