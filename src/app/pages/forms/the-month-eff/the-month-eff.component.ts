import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-the-month-eff',
    templateUrl: './the-month-eff.component.html',
    styleUrls: ['./the-month-eff.component.css']
})
export class TheMonthEffComponent implements OnInit {

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
            left: '5%',
            top: "20%",
            right: "5%",
            bottom: "5%",
        },
        legend: {
            data: ['效率', '产量'],
            top: "3%",
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
                alignWithLabel: true
            },
            data: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6']
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
            max: 1000,
            position: 'right'
        }],
        series: [{
            name: '效率',
            type: 'line',
            stack: '效率',
            symbolSize:"7",
            itemStyle: {
                color: "#3384d5"
            },
            markLine: {
                symbol:["none", "none"],
                data: [
                    { type: 'average', name: '平均值',yAxis:70,label:{show:false}}
                ],

            },
            lineStyle: {
                color: "#ffc700",width:"1"
            },
            data: [50, 60, 55, 75, 70, 90]
        }, 
        {
            color: ["#f19a79"],
            name: '产量',
            type: 'bar',
            yAxisIndex: 1,
            stack: '产量',
            data: [500, 600, 700, 439, 600, 576],
            barCategoryGap: "30%",
        },
    ]
    }
}
