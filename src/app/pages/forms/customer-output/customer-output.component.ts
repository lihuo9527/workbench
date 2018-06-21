import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
@Component({
    selector: 'app-customer-output',
    templateUrl: './customer-output.component.html',
    styleUrls: ['./customer-output.component.css']
})
// 当月品牌客户实际生产产量统计图
export class CustomerOutputComponent implements OnInit {
    public Language;
    public option;
    constructor(private service: AppService) { }

    ngOnInit() {
        this.Language = localStorage.getItem("language");
        this.service.http_get('/api/Monitor/GetChartData?vrpcode=RPT101', false).subscribe((data: any) => { 
            let obj = [];
            let titles = [];
            let colors = ['#ffd634', '#ffcccb', '#d36ba6', '#89cb4f', '#8c7dd8', '#11ba9d', '#65bcc5', '#4b93df', '#ea6350', '#f6a317','#f78db3','#3dc6a8','#a0dca0','#5aabe2','#269785','#f67517','#ea3544','#5c7bbc','#54bc41','#47bd7a'];
            data[0].ChartNodes.forEach((element, i) => {
                obj.push({
                    name: element.xname,
                    value: element.yvalue1,
                    itemStyle: { color: colors[i] }
                });

                titles.push(element.xname);
            });

            this.option = {
   
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
                    y2:140
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
                        interval: 0,//横轴信息全部显示  
                        rotate: -30,//-30度角倾斜显示  
                    },
                    show: true,
                    type: 'category',
                    axisLine: {
                        show: true,
                    },
                    axisTick: {
                        show: false,
                    },
                    data: titles,

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
                        data: obj,
                        barCategoryGap: "40%",
                    }
                ]

            };
        })

    }

}
