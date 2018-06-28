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

    public Language;
    public option;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.service.http_get('/api/Monitor/GetChartData?vrpcode=RPT104', false).subscribe((data: any) => {
            let titles = [];
            let bar = [];
            let line = [];
            let average = data[0].Average;
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
                    bottom: "20"
                },
                legend: {
                    data: ['效率', '产量'],
                    top: "0",
                },
                xAxis: [{
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
                yAxis: [{
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,

                    },
                    type: 'value',
                    name: '效率',
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
                    name: '产量',
                    min: 0,
                    position: 'right'
                }],
                dataZoom: [                                      //区域缩放  
                    {
                        type: 'inside',                         //slider表示有滑动块的，inside表示内置的
                    }
                ],
                series: [{
                    name: '效率',
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
                    name: '产量',
                    type: 'bar',
                    yAxisIndex: 1,
                    stack: '产量',
                    data: bar,
                    barCategoryGap: "30%",
                    barMaxWidth:'30%',
                },
                ]
            }
        })
    }

}
