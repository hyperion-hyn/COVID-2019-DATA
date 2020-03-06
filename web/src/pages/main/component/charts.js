import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import {injectIntl } from "react-intl";


 class Charts extends PureComponent {

    render() {
        const {intl, dailyData } = this.props;

        var data, dailyTotal, dailyNew;

        if (dailyData.data) {
            data = dailyData.data;

            //console.log('[Charts] --> data:' + data);

            if (data.dailyTotal) {
                dailyTotal = data.dailyTotal;
                //console.log('[Charts] -->1, dailyTotal:' + dailyTotal);
            } else {
                //console.log('[Charts] --> dailyTotal: is null');
            }

            if (data.dailyNew) {
                dailyNew = data.dailyNew;
                //console.log('[Charts] -->1, dailyNew:' + dailyNew);
            } else {
                //console.log('[Charts] --> dailyNew: is null');
            }
        } else {
            //console.log('[Charts] --> data: is null');
        }

        var themeColor = 'dart';
        return (
            <div className='examples'>
                <div className='parent'>
                    <ReactEcharts
                        option={this.newOption(intl, dailyNew)}
                        style={{ height: '180px', width: '100%' }}
                        theme={themeColor}
                        className='react_for_echarts' />
                    <ReactEcharts
                        option={this.totalOption(intl, dailyTotal)}
                        style={{ height: '200px', width: '100%' }}
                        theme={themeColor}
                        className='react_for_echarts' />
                </div>
            </div>
        );
    }

    newOption = (intl, data) => {

        var array = this.editData(data);
        let deadArray = array[0];
        let confirmedArray = array[1];
        let recoverdArray = array[2];
        let dateArray = array[3];
        var titleArray = [
            intl.formatMessage({
                id: 'new_diagnoses', 
              }),
            intl.formatMessage({
                id: 'new_deaths', 
            }),
            intl.formatMessage({
                id: 'new_rehabilitation', 
            }),
        ];
        return {
            //backgroundColor: 'rgb(18, 128, 128)',

            grid: {
              top: 30,
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                left: 'center',
                bottom: '12%',
                data: titleArray
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: dateArray
                    //data: ['2月1日', '2月2日', '2月3日', '2月4日', '2月5日', '2月6日', '2月7日', '2月8日', '2月9日', '2月10日', '2月11日', '2月12日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: titleArray[0],
                    type: 'bar',
                    data: confirmedArray,
                    // data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                },
                {
                    name: titleArray[1],
                    type: 'bar',
                    data: deadArray,
                    // data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    markPoint: {
                        data: [
                            { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                            { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                },
                {
                    name: titleArray[2],
                    type: 'bar',
                    data: recoverdArray,
                    // data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    markPoint: {
                        data: [
                            { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                            { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }
            ]
        };
    }

    totalOption = (intl, data) => {
        //console.log('[Charts] -->2, dailyTotal: ' + data);

        var array = this.editData(data);
        let deadArray = array[0];
        let confirmedArray = array[1];
        let recoverdArray = array[2];
        let dateArray = array[3];

        var titleArray = [
            intl.formatMessage({
                id: 'total_diagnoses', 
              }),
            intl.formatMessage({
                id: 'total_deaths', 
            }),
            intl.formatMessage({
                id: 'total_rehabilitation', 
            }),
        ];

        return {
            //backgroundColor: 'rgb(128, 128, 128)',
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                left: 'center',
                bottom: '30',
                data: titleArray
            },
            grid: {
                left: '3%',
                right: '4%',
                top: '3%',
                containLabel: true
            },

            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dateArray
                //data: ['2月1日', '2月2日', '2月3日', '2月4日', '2月5日', '2月6日', '2月7日', '2月8日', '2月9日', '2月10日', '2月11日', '2月12日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    //step: 'start',
                    name: titleArray[0],
                    type: 'line',
                    //stack: '总量',
                    smooth: true,
                    data: confirmedArray,
                    //data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: titleArray[1],
                    type: 'line',
                    //stack: '总量',
                    smooth: true,
                    data: deadArray,
                    //data: [220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: titleArray[2],
                    type: 'line',
                    //stack: '总量',
                    smooth: true,
                    data: recoverdArray,
                    //data: [150, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 330, 410]
                }
            ]
        };
    };

    editData = (data) => {

        const { locale } = this.props;

        console.log('[Charts] --> editData: ' + locale.lang);

        var dead, confirmed, recoverd;
        let deadArray = [];
        let confirmedArray = [];
        let recoverdArray = [];
        let dateArray = [];

        if (data) {
            if (data.dead) {
                dead = data.dead;

                deadArray = dead.map(item =>
                    item.count
                ).reverse();
            }

            if (data.confirmed) {
                confirmed = data.confirmed;

                confirmedArray = confirmed.map(item =>
                    item.count
                ).reverse();

                dateArray = confirmed.map(item => {
                    var date = new Date(item.date),
                        month = date.getMonth()+1,
                        day = date.getDate(),
                        dateText =  month + "-" + day;
                        if (locale.lang === 'zh') {
                            dateText =  month + "月" + day + "日";
                        }
                    return dateText;
                }).reverse();
            }

            if (data.recoverd) {
                recoverd = data.recoverd;

                recoverdArray = recoverd.map(item =>
                    item.count
                ).reverse();
            }
        }
        return [deadArray, confirmedArray, recoverdArray, dateArray];
    }
}

export default injectIntl( Charts );
