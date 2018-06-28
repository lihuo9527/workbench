import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-the-month-eff',
    templateUrl: './the-month-eff.component.html',
    styleUrls: ['./the-month-eff.component.css']
})
//当月工厂生产效率汇总
export class TheMonthEffComponent implements OnInit {

    constructor(private service: AppService) { }
    public Language;
    public option;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.service.http_get('/api/Monitor/GetChartData?vrpcode=RPT102', false).subscribe((data: any) => {
            let titles = [];
            let bar = [];
            let line = [];
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
                    left: '5%',
                    top: "20%",
                    right: "5%",
                    bottom: "5%",
                    y2: 140
                },
                legend: {
                    data: ['效率', '产量'],
                    top: "3%",
                },
                xAxis: [
                    {
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
                    }
                ],
                yAxis: [
                    {
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
                series: [
                    {   
                        name: '效率',
                        type: 'line',
                        stack: '效率',
                        symbolSize: "7",
                        itemStyle: {
                            color: "#3384d5"
                        },
                        markLine: {
                            symbol: ["none", "none"],
                            data: [
                                { type: 'average', name: '平均值', yAxis: data[0].Average, label: { show: false } }
                            ],

                        },
                        lineStyle: {
                            color: "#ffc700", width: "1"
                        },
                        data: line
                    },
                    {
                        color: ["#f19a79"],
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
