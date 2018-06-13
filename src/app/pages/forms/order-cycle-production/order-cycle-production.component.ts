import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-order-cycle-production',
    templateUrl: './order-cycle-production.component.html',
    styleUrls: ['./order-cycle-production.component.css']
})
export class OrderCycleProductionComponent implements OnInit {

    constructor() { }
    public Language;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
    }

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        legend: {
            data: [
                '品类1', '品类2'
            ]
        },
        xAxis: [{
            axisLine: {
                show: false,
            },
            axisTick: { 
                show: false,
            },
            type: 'category',
            data: ['2018-02', '2018-03', '2018-04']
        }],
        yAxis: [{
            show: false,
            type: 'value'
        }],
        series: [{
            name: '品类1',
            type: 'bar',
            stack: 'B',
            data: [320, 332, 301],

        },
        {
            name: '品类2',
            type: 'bar',
            stack: 'B',
            data: [120, 132, 101],
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#34474f'
                },
                formatter: function (params) {
                    if (params.value == 0) {
                        return '';
                    } else {
                        return params.dataIndex.value;
                    }
                }
            },
            barCategoryGap: "40%",
        },

        {
            name: '品类1',
            type: 'bar',
            color: ['#65cad0'],
            stack: 'C',
            data: [620, 732, 701]
        },
        {
            name: '品类2',
            type: 'bar',
            color: ['#cfda7a'],
            stack: 'C',
            data: [120, 132, 101],
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#34474f'
                },
                formatter: function (params) {
                    if (params.value == 0) {
                        return '';
                    } else {
                        return params.dataIndex.value;
                    }
                }
            },
            barCategoryGap: "40%",
        },
        {
            name: '品类1',
            type: 'bar',
            color: ['#34474f'],
            stack: 'D',
            data: [620, 732, 701]
        },
        {
            name: '品类2',
            color: ['#333'],
            type: 'bar',
            stack: 'D',
            data: [120, 132, 101],
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#34474f'
                },
                formatter: function (params) {
                    if (params.value == 0) {
                        return '';
                    } else {
                        return params.dataIndex.value;
                    }
                }
            },
            barCategoryGap: "40%",
        }
        ]
    };
}

