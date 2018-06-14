import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service'
@Component({
    selector: 'app-order-cycle-summary',
    templateUrl: './order-cycle-summary.component.html',
    styleUrls: ['./order-cycle-summary.component.css']
})
export class OrderCycleSummaryComponent implements OnInit {

    constructor(private service: AppService) { }
    public Language;
    ngOnInit() {
        this.Language = localStorage.getItem("language");
    }

    option = {
        backgroundColor: "#fff",
        textStyle: {
            color: "#000000",
            fontfontFamily: "Microsoft YaHei"
        },
        grid: {
            containLabel: true,
            left: 'left',
            top: "20%",
            bottom: "5%",
        },
        legend: {
            top: "1%",
            padding: [20, 0, 20, 0],
            right:"3%"

        },
        tooltip: {},
        dataset: {
            source: [
                ['product', '60days', '45days', '30days'],
                ['2018-02', 43.3, 85.8, 93.7],
                ['2018-03', 83.1, 73.4, 55.1],
                ['2018-04', 86.4, 65.2, 82.5]
            ]
        },
        xAxis: {
            show: true,
            type: 'category',
            axisLine: {
                show: false,
            },
            axisTick: { 
                show: false,
            }
        },
        yAxis: { show: false },
        series: [
            {
                type: 'bar',
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
                barCategoryGap: "30%",
            },
            {
                type: 'bar',
                color: ['#5c6bbe'],
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
                barCategoryGap: "30%",
            },
            {
                type: 'bar',
                color: ['#d24a62'],
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
                // barCategoryGap: "30%",
            }
        ]
    };

}
