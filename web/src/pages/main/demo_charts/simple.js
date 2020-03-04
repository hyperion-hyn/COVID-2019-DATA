import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Simple extends PureComponent {

  
  getOption_demo = () => {
    return {
      /* title: {
        text: '堆叠区域图'
      }, */
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['邮件营销','联盟广告','视频广告']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : ['周一','周二','周三','周四','周五','周六','周日']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'邮件营销',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'联盟广告',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'视频广告',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[150, 232, 201, 154, 190, 330, 410]
        }
      ]
    };
  };

  basicOption = () => {
    return {
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
      }]
    };
  };

  barOption = () => {
    return {
      /* title: {
          text: '韩国形势',
      }, */
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          left: 'center',
          top: '2%',
          data: ['新增确诊', '新增康复']
      },
      calculable: true,
      xAxis: [
          {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
      ],
      yAxis: [
          {
              type: 'value'
          }
      ],
      series: [
          {
              name: '新增确诊',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
              markPoint: {
                  data: [
                      {type: 'max', name: '最大值'},
                      {type: 'min', name: '最小值'}
                  ]
              },
              markLine: {
                  data: [
                      {type: 'average', name: '平均值'}
                  ]
              }
          },
          {
              name: '新增康复',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
              markPoint: {
                  data: [
                      {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                      {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                  ]
              },
              markLine: {
                  data: [
                      {type: 'average', name: '平均值'}
                  ]
              }
          }
      ]
    };
  }

  render() {
    return (
      <div className='examples'>
        <div className='parent'>
          <ReactEcharts
            option={this.barOption()}
            style={{height: '350px', width: '100%'}}
            theme={'light'}
            className='react_for_echarts' />
          <ReactEcharts
            option={this.basicOption()}
            style={{height: '350px', width: '100%'}}
            className='react_for_echarts' />
        </div>
      </div>
    );
  }
}