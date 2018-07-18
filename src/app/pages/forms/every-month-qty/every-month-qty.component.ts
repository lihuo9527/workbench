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
    ngOnInit() {
        this.language = localStorage.getItem("language");
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
                    data: ['耗时', '产量'],
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
                    name: '耗时(h)',
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
                    name: '产量(件)',
                    min: 0,
                    position: 'right'
                }],
                series: [{
                    name: '耗时',
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
                    name: '产量',
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
