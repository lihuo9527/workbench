import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-daily-line-eff',
    templateUrl: './daily-line-eff.component.html',
    styleUrls: ['./daily-line-eff.component.css']
})
export class DailyLineEffComponent implements OnInit {

    constructor() { }

    public Language;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
    }
    public option = {
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
            data: ['1', '2', '3', '4', '5', '6', "7", "8", "9", "10", "11", "12", '13', '14', '15', '16', '17', '18', "19", "20", "21", "22", "23", "24", '25', '26', '27', "28", "29", "30", "31", "32", "33", "34"]
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
            max: 100,
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
            max: 25,
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
                    { type: 'average', name: '平均值', yAxis: 70, label: { show: false } }
                ],
            },
            lineStyle: {
                color: "#7cdbad", width: "1"
            },
            data: [50, 60, 55, 75, 70, 90, 50, 60, 55, 75, 70, 90, 50, 60, 55, 75, 70, 90, 50, 60, 55, 75, 70, 90, 55, 75, 70, 90, 50, 60, 55, 75, 70, 90]
        },
        {
            color: ["#54a6de"],
            name: '产量',
            type: 'bar',
            yAxisIndex: 1,
            stack: '产量',
            data: [15, 16, 17, 19, 15, 16, 18, 17, 18, 25, 20, 15, 15, 16, 17, 19, 15, 16, 18, 17, 18, 25, 20, 15, 16, 18, 17, 18, 25, 20, 15, 16, 18, 17],
            barCategoryGap: "30%",
        },
        ]
    }
}
