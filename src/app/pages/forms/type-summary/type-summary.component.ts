import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-type-summary',
    templateUrl: './type-summary.component.html',
    styleUrls: ['./type-summary.component.css']
})
export class TypeSummaryComponent implements OnInit {
    public Language;
    constructor() { }

    ngOnInit() {
        this.Language = localStorage.getItem("language");
    }
    option = {
        backgroundColor: '#fff',
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",

        },
        grid: {
            containLabel: true,
            left: '5%',
            top: "5%",
            bottom: "5%",
        },
        legend: {

            orient: 'horizontal',
            bottom:"2%",
            padding: [5, 10, 5,  10],
            itemWidth: 14,
            itemHeight: 14,
            align: 'left',
            data: ['2D线', '3D线', '资源类', '采集类', '宝宝大全', '2D视频', '3D视频'],
            textStyle: {
                color: '#000'
            }
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                hoverAnimation: false,
                legendHoverLink: false,
                radius: ['40%', '40%'],
                
                color: ['#915872', '#3077b7', '#9a8169', '#3f8797', '#5b8144'],
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },

                },
                tooltip: {
                    show: false,


                },

                data: [
                    { value: 435, name: '' },
                    { value: 679, name: '' },
                    { value: 848, name: '' },
                    { value: 348, name: '' },
                    { value: 679, name: '' }
                ]
            },
            {
                name: '访问来源',
                type: 'pie',
                radius: ['30%', '55%'],
                color: ['#d74e67', '#0092ff', '#eba954', '#21b6b9', '#60a900'],
                label: {
                    normal: {
                        formatter: '{b}\n{d}%'
                    },

                },
                data: [
                    { value: 435, name: '2D线' },
                    { value: 679, name: '3D线' },
                    { value: 848, name: '资源类' },
                    { value: 348, name: '采集类' },
                    { value: 679, name: '宝宝大全' }
                ]
            }
        ]
    };
}
