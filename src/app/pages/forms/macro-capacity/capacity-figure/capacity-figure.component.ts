import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-capacity-figure',
    templateUrl: './capacity-figure.component.html',
    styleUrls: ['./capacity-figure.component.css']
})
export class CapacityFigureComponent implements OnInit {
    @Input() dataA;
    @Input() dataB;
    @Input() maxValue;
    public option;
    public countpercent: number;
    public totalCapacity: number;
    public totalLoad: number;
    public total: number;
    constructor() { }

    ngOnInit() {
        if (this.dataA.length < 3) {
            for (let i = this.dataA.length; i < 3; i++) {
                const obj: any = {};
                obj.color = '#fff';
                obj.value = 0;
                this.dataA.push(obj);
            }
        }
        if (this.dataB.length < 3) {
            for (let i = this.dataB.length; i < 3; i++) {
                const obj: any = {};
                obj.color = '#fff';
                obj.value = 0;
                this.dataB.push(obj);
            }
        }
        this.option = this.createChart(this.dataA, this.dataB);
        this.totalCapacity = this.dataA[0].value + this.dataA[1].value + this.dataA[2].value;
        this.totalLoad = this.dataB[0].value + this.dataB[1].value + this.dataB[2].value;
        this.total = this.totalCapacity - this.totalLoad;
        this.countpercent = this.totalLoad / this.totalCapacity * 100;
    }
    createChart(x, y: any[]) {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
            },
            grid: {
                containLabel: true,
                left: "-25%",
                // right: "10%",
                top: "20%",
                bottom: "5%"
            },
            xAxis: [{
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#ddd"
                    }
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true
                },
                type: 'category',
            }],
            yAxis: [{
                show: false,
                type: 'value'
            }],
            series: [
                {
                    name: "产能",
                    color: [x[2].color],
                    type: 'bar',
                    stack: 'B',
                    data: [x[2].value]
                },
                {
                    color: [x[1].color],
                    type: 'bar',
                    stack: 'B',
                    data: [x[1].value],
                },
                {
                    type: 'bar',
                    stack: 'B',
                    data: [x[0].value],
                    color: [x[0].color],
                },
                {
                    type: 'bar',
                    color: [y[2].color],
                    stack: 'C',
                    data: [y[2].value],
                },
                {
                    type: 'bar',
                    color: [y[1].color],
                    stack: 'C',
                    data: [y[1].value],
                },
                {
                    type: 'bar',
                    color: [y[0].color],
                    stack: 'C',
                    data: [y[0].value],
                },
                {
                    type: 'bar',
                    stack: 'D',
                    data: [this.maxValue],
                    color: ["#fff"],
                },
            ]
        };
    }
}
