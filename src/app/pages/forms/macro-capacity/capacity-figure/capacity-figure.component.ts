import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-capacity-figure',
  templateUrl: './capacity-figure.component.html',
  styleUrls: ['./capacity-figure.component.css']
})
export class CapacityFigureComponent implements OnInit {
  @Input() dataA: number[];
  @Input() dataB: number[];
  public option;
  public countpercent: number;
  public totalCapacity: number;
  public totalLoad: number;
  public total: number;
  constructor() { }

  ngOnInit() {
    this.option = this.createChart(this.dataA, this.dataB);
    this.totalCapacity = this.dataA[0] + this.dataA[1] + this.dataA[2];
    this.totalLoad = this.dataB[0] + this.dataB[1] + this.dataB[2];
    this.total = this.totalCapacity - this.totalLoad;
    this.countpercent = this.totalLoad / this.totalCapacity;
  }
  createChart(x, y: number[]) {
    return {
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
      xAxis: [{
          axisLine: {
              show: true,
              lineStyle: {
                  color: "#ddd"
              }
          },
          axisTick: {
              show: false,
          },
          type: 'category',
      }],
      yAxis: [{
          show: false,
          type: 'value'
      }],
      series: [
        {
          color: ['rgb(33 240 0)'],
          type: 'bar',
          stack: 'B',
          data: [x[0]]
        },
        {
          color: ['rgb(131 250 202)'],
          type: 'bar',
          stack: 'B',
          data: [x[1]],
        },
        {
          type: 'bar',
          stack: 'B',
          data: [x[2]],
          color: ['rgb(240 124 230)'],
        },
        {
          type: 'bar',
          color: ['rgb(250 160 90)'],
          stack: 'C',
          data: [y[0]],
        },
        {
          type: 'bar',
          color: ['rgb(250 220 90)'],
          stack: 'C',
          data: [y[1]],
        },
        {
          type: 'bar',
          color: ['rgb(190 190 190)'],
          stack: 'C',
          data: [y[2]],
        },
      ]
    };
  }
}
