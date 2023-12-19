import { Chart } from 'chart.js';

/**
 * 더블 차트 
 */
export class ComChartFrc {
    public canvas: any;
    public ctx: any;
    public chart: any;

    public constructor(public canvasId: string, public title: string, public titleX: string, public titleY: string) {}

    public createFrcChart(model: any) {
        // console.log(model);
        let that = this;
        setTimeout(function () {
            //x축 리스트
            let labels: any = [];

            let backgroundColorA: any = [];

            let backgroundColorP: any = [];

            //데이터 가맹점
            let dataFrc: any = [];
            //데이터 상인회
            let dataAsso: any = [];
            //let data: any = [];

            for (let i = 0; i < model.length; i++) {
                labels.push(model[i].label);
                backgroundColorA.push('rgba(255, 99, 132, 0.5)');
                backgroundColorP.push('rgba(54, 162, 235, 0.5)');
                dataFrc.push(model[i].cntFrc);
                dataAsso.push(model[i].cntAsso);
                // console.log("model  : " + model[i]);
            }
            that.canvas = document.getElementById(that.canvasId);
            that.ctx = that.canvas.getContext('2d');


            // 이미 그려진 차트가 있고 다시 호출이 들어오면 기존 차트 지우고 다시 만든다
            if (that.chart !== undefined) that.chart.destroy();
            
            that.chart = new Chart(that.ctx, {
                //바-차트
                type: 'bar',
                
                data: {
                    labels: [
                        '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주'
                        //this.cbsSfLocalGovCd
                    ],
                    datasets: [{
                            label: '가맹점',
                            //배경색
                            backgroundColor: backgroundColorP,
                            //backgroundColor: backgroundColor,
                            //데이터
                            data: dataFrc,
                            //data: data
                        },
                        // {
                        //     label: '상인회',
                        //     //배경색
                        //     //backgroundColor: backgroundColor,
                        //     backgroundColor: backgroundColorA,
                        //     //데이터
                        //     //data: data
                        //     data: dataAsso,
                        //     minBarLength:10
                        // },
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, //선언 해줘야 아래 안먹음
                    //lable 설정
                    legend: {
                        position: 'top', //top, left, bottom, right, chartArea
                        align: 'end' //start, center, end
                    },
                    title: {
                        //https://www.chartjs.org/docs/2.9.4/configuration/title.html 참조
                        display: true,
                        text: that.title,
                        position: 'top',
                        fontSize : 20,
                        bold:true ,
                        fontColor:'blue'
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: that.titleX,
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: that.titleY,
                            },
                            ticks: {
                                beginAtZero: true,
                                callback: function (value, index, values) {
                                    // console.log(values[0].toString().length);
                                    // if(values[0].toString().length > 9 && value != 0) return (Math.floor(value / 100000000)).toLocaleString("ko-KR") + "억";
                                    // else if(values[0].toString().length = 9 && value != 0) return (value / 100000000).toFixed(1) + "억";
                                    if (values[0].toString().length > 6 && value != 0) return (Math.floor(value / 1000000)).toLocaleString("ko-KR") + "만";
                                    //else if(values[0].toString().length = 6 && value != 0) return (value / 10000).toFixed(1) + "만";
                                    else return value.toLocaleString("ko-KR");
                                }
                            }
                        }]
                    },
                }
            });
        }, 100);
    }
}