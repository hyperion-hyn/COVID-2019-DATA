import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import {injectIntl } from "react-intl";


 class Charts extends PureComponent {

    render() {
        var themeColor = 'dart';
        return (
            <div className='examples'>
                <div className='parent'>
                    <ReactEcharts
                        option={this.newOption()}
                        style={{ height: '180px', width: '100%' }}
                        theme={themeColor}
                        className='react_for_echarts' />
                    <ReactEcharts
                        option={this.totalOption()}
                        style={{ height: '200px', width: '100%' }}
                        theme={themeColor}
                        className='react_for_echarts' />
                </div>
            </div>
        );
    }

    newOption = () => {

        const { dailyData, intl } = this.props;

        var data;
        if (dailyData 
            &&dailyData.data
            &&dailyData.data.dailyNew
            ) {
            data = dailyData.data.dailyNew;
        }
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

    totalOption = () => {
        const { dailyData, intl } = this.props;

        var data;
        if (dailyData 
            &&dailyData.data
            &&dailyData.data.dailyTotal
            ) {
            data = dailyData.data.dailyTotal;
        }
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
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: titleArray[0],
                    type: 'line',
                    smooth: true,
                    data: confirmedArray,
                },
                {
                    name: titleArray[1],
                    type: 'line',
                    smooth: true,
                    data: deadArray,
                },
                {
                    name: titleArray[2],
                    type: 'line',
                    smooth: true,
                    data: recoverdArray,
                }
            ]
        };
    };

    editData = (data) => {

        const { locale } = this.props;

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
