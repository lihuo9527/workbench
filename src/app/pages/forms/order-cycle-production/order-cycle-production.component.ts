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
        grid: {
            containLabel: true,
            left: "0",
            top: "20%",
            bottom: "5%"
        },
        legend: {
            data: [
                '30days', "45days", "60days", "Completed"
            ],
            top: "0",
            padding: [20, 0, 20, 0,]

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
        series: [
            {
                color: ['#34a593'],
                name: 'Completed',
                type: 'bar',
                stack: 'B',
                data: [120, 132, 101],
                barCategoryGap: "30%",
            },
            {
                name: '30days',
                type: 'bar',
                stack: 'B',
                data: [320, 332, 301],
                color: ['#b2b2b2'],
                barGap:"70%",
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
            },
            {
                name: 'Completed',
                type: 'bar',
                color: ['#34a593'],
                stack: 'C',
                data: [120, 132, 400],
                barCategoryGap: "30%",
            },
            {
                name: '45days',
                type: 'bar',
                color: ['#5c6bbe'],
                stack: 'C',
                data: [620, 500, 701],
                barGap:"70%",
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

            },
            {
                name: 'Completed',
                color: ['#34a593'],
                type: 'bar',
                stack: 'D',
                data: [120, 300, 101],
            },
            {
                name: '60days',
                type: 'bar',
                color: ['#d24a62'],
                stack: 'D',
                data: [620, 500, 701],
                barGap:"70%",
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
            }
        ]
    };
}

