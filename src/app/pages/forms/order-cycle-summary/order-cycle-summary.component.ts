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
        legend: {},
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
                color: ['#65cad0'],
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
                type: 'bar',
                color: ['#cfda7a'],
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
                type: 'bar',
                color: ['#8d7fd9'],
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
