import {
  VirusStatusModel,
  VirusStatusTotalModel,
  VirusStatusDailyNewTickModel,
  VirusStatusDailyTotalTickModel,
  VirusStatusDailyModel,
  VirusStatusDailyItemModel,
} from "./model";

export default {
  demo_data_success: {
    code: 0,
    msg: "success",
    data: "This is data back from server"
  },

  demo_data_fail: { code: -1, msg: "request data fail from server." },
  
  mock_virus_status_list: {
    code: 0,
    msg: "success",
    data: VirusStatusTotalModel.fromObject({
      virusUpdateTime:"2020-03-01",
      virusList:[
      VirusStatusModel.fromObject({
        id: 1,
        isCountry: 1,
        area: "中国",
        newConfirmed: 12,
        newRecovered: 11,
        newDead: 1,
        totalConfirmed: 1323,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 2,
        isCountry: 1,
        area: "日本",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 3,
        isCountry: 1,
        area: "韩国",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 4,
        isCountry: 1,
        area: "美国",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 5,
        isCountry: 1,
        area: "拉国",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 6,
        isCountry: 1,
        area: "泰国",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 7,
        isCountry: 1,
        area: "咯国",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 8,
        isCountry: 1,
        area: "啦国",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 9,
        isCountry: 1,
        area: "嗯国",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 10,
        isCountry: 1,
        area: "好",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 11,
        isCountry: 1,
        area: "好",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 12,
        isCountry: 1,
        area: "好",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 13,
        isCountry: 1,
        area: "好",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 14,
        isCountry: 1,
        area: "好",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 15,
        isCountry: 1,
        area: "好",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 16,
        isCountry: 1,
        area: "好",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 17,
        isCountry: 1,
        area: "好",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 18,
        isCountry: 1,
        area: "好",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 19,
        isCountry: 1,
        area: "好",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      }),
      VirusStatusModel.fromObject({
        id: 20,
        isCountry: 1,
        area: "好-end",
        newConfirmed: 121,
        newRecovered: 111,
        newDead: 21,
        totalConfirmed: 123,
        totalRecovered: 121,
        totalDead: 123
      })
    ]})
  },

  //mock daily status
  mock_virus_status_daily_tick: {
    code: 0,
    msg: "success",
    data: VirusStatusDailyModel.fromObject({
      //daily total status
      dailyTotal: VirusStatusDailyItemModel.fromObject({
        dead: [
          VirusStatusDailyTotalTickModel.fromObject({
            id: 1,
            isCountry: 1,
            area: "China", //China
            type: "dead", //confirmed, recoverd
            date: "2019-2-1",
            count: 10
          }),
          VirusStatusDailyTotalTickModel.fromObject({
            id: 2,
            isCountry: 1,
            area: "China", //China
            type: "dead", //confirmed, recoverd
            date: "2019-2-2",
            count: 4
          })
        ],
        confirmed: [
          VirusStatusDailyTotalTickModel.fromObject({
            id: 1,
            isCountry: 1,
            area: "China", //China
            type: "confirmed", //confirmed, recoverd
            date: "2019-2-1",
            count: 3
          }),
          VirusStatusDailyTotalTickModel.fromObject({
            id: 2,
            isCountry: 1,
            area: "China", //China
            type: "confirmed", //confirmed, recoverd
            date: "2019-2-2",
            count: 2
          })
        ],
        recoverd: [
          VirusStatusDailyTotalTickModel.fromObject({
            id: 1,
            isCountry: 1,
            area: "China", //China
            type: "recoverd", //confirmed, recoverd
            date: "2019-2-1",
            count: 30
          }),
          VirusStatusDailyTotalTickModel.fromObject({
            id: 2,
            isCountry: 1,
            area: "China", //China
            type: "recoverd", //confirmed, recoverd
            date: "2019-2-2",
            count: 21
          })
        ]
      }),
      //daily new status
      dailyNew: VirusStatusDailyItemModel.fromObject({
        dead: [
          VirusStatusDailyNewTickModel.fromObject({
            id: 1,
            isCountry: 1,
            area: "China", //China
            type: "dead", //confirmed, recoverd
            date: "2019-2-1",
            count: 10
          }),
          VirusStatusDailyNewTickModel.fromObject({
            id: 2,
            isCountry: 1,
            area: "China", //China
            type: "dead", //confirmed, recoverd
            date: "2019-2-2",
            count: 4
          })
        ],
        confirmed: [
          VirusStatusDailyNewTickModel.fromObject({
            id: 1,
            isCountry: 1,
            area: "China", //China
            type: "confirmed", //confirmed, recoverd
            date: "2019-2-1",
            count: 3
          }),
          VirusStatusDailyNewTickModel.fromObject({
            id: 2,
            isCountry: 1,
            area: "China", //China
            type: "confirmed", //confirmed, recoverd
            date: "2019-2-2",
            count: 2
          })
        ],
        recoverd: [
          VirusStatusDailyNewTickModel.fromObject({
            id: 1,
            isCountry: 1,
            area: "China", //China
            type: "recoverd", //confirmed, recoverd
            date: "2019-2-1",
            count: 30
          }),
          VirusStatusDailyNewTickModel.fromObject({
            id: 2,
            isCountry: 1,
            area: "China", //China
            type: "recoverd", //confirmed, recoverd
            date: "2019-2-2",
            count: 21
          })
        ]
      })
    })
  }

};
