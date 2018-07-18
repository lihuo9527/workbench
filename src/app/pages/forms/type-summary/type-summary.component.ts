import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
    selector: 'app-type-summary',
    templateUrl: './type-summary.component.html',
    styleUrls: ['./type-summary.component.css']
})
export class TypeSummaryComponent implements OnInit {
    public language;
    constructor(private service: AppService, ) { }
    public option;
    public length = 0 ;
    ngOnInit() {
        this.language = localStorage.getItem("language");
        this.service.http_get('/api/Monitor/GetChartData?vrpcode=RPT100', false).subscribe((data: any) => {
            let obj = [];
            let titles = [];
            let obj2 = [];
            this.length = data[0].ChartNodes.length;
            data[0].ChartNodes.forEach(element => {
                obj.push({
                    name: element.xname,
                    value: element.yvalue1
                });
                obj2.push({
                    name: '',
                    value: element.yvalue1
                });

                titles.push(element.xname);
            });

            this.option = {
                backgroundColor: '#fff',
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)",

                },
                grid: {
                    zlevel: 1,
                    z: 2,
                    containLabel: true,
                    left: '0%',
                    top: "0",
                },
                legend: {
                    orient: 'horizontal',
                    bottom: "2%",
                    padding: [5, 10, 5, 10],
                    itemWidth: 14,
                    itemHeight: 14,
                    align: 'left',
                    data: titles,
                    textStyle: {
                        color: '#000'
                    },
                    formatter: function (name) {
                        return name.length > 50 ? name.substr(0, 50) + "..." : name;
                    }
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        hoverAnimation: false,
                        legendHoverLink: false,
                        radius: ['40%', '40%'],
                        center: ['50%', '25%'],
                        color: ['#ffd634', '#ffcccb', '#d36ba6', '#89cb4f', '#8c7dd8', '#11ba9d', '#65bcc5', '#4b93df', '#ea6350', '#f6a317', '#f78db3', '#3dc6a8', '#a0dca0', '#5aabe2', '#269785', '#f67517', '#ea3544', '#5c7bbc', '#54bc41', '#47bd7a'],
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

                        data: obj2
                    },
                    {
                        name: '',
                        type: 'pie',
                        radius: ['30%', '55%'],
                        center: ['50%', '25%'],
                        color: ['#ffd634', '#ffcccb', '#d36ba6', '#89cb4f', '#8c7dd8', '#11ba9d', '#65bcc5', '#4b93df', '#ea6350', '#f6a317', '#f78db3', '#3dc6a8', '#a0dca0', '#5aabe2', '#269785', '#f67517', '#ea3544', '#5c7bbc', '#54bc41', '#47bd7a'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false   //隐藏标示文字
                                },
                                labelLine: {
                                    show: false   //隐藏标示线
                                }
                            }
                        },
                        label: {
                            normal: {
                                formatter: '{b}\n{d}%'
                            },

                        },
                        data: obj
                    }
                ]
            };
        })
    }

}
