import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-customer-output',
    templateUrl: './customer-output.component.html',
    styleUrls: ['./customer-output.component.css']
})
export class CustomerOutputComponent implements OnInit {
    public Language
    constructor() { }

    ngOnInit() {
        this.Language = localStorage.getItem("language");
    }
    public option = {
        title: {
            text: "unit(ten thousand)",
            textStyle: {
                color: "#34474f",
                fontSize: "14",
                fontWeight: "500",
                fontFamily: "Roboto Regular"
            },
            left: "3%",
            top: "3%"
        },
        grid: {
            containLabel: true,
            left: '5%',
            top: "18%",
            bottom: "5%",
        },
        backgroundColor: "#fff",
        textStyle: {
            color: "#000000",
            fontFamily: "Roboto Regular"
        },
        legend: {
            show: false,
        },
        tooltip: {},
        xAxis: {
            axisLabel: {
                interval: 0
            },
            show: true,
            type: 'category',
            axisLine: {
                show: true,
            },
            axisTick: {
                show: false,
            },
            data: ["Adidas", "Nike", "PUMA", "HUGO", "ReeBOK"],

        },
        yAxis: {
            show: true,
            axisTick: {
                show: false,
            },
        },
        series: [
            {
                type: 'bar',
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
                data: [
                    { name: "Adidas", value: 40, itemStyle: { color: '#42a6db' } },
                    { name: "Nike", value: 50, itemStyle: { color: '#e87a7c' } },
                    { name: "PUMA", value: 60, itemStyle: { color: '#65cad0' } },
                    { name: "HUGO", value: 70, itemStyle: { color: '#cfda7a' } },
                    { name: "ReeBOK", value: 80, itemStyle: { color: '#8d7fd9' } }
                ],
                barCategoryGap: "40%",
            }
        ]

    };
}
