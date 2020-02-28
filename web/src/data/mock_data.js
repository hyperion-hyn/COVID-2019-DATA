import {
  VirusStatusModel,
  VirusStatusDailyNewTickModel,
  VirusStatusDailyTotalTickModel
} from "./model";

export default {
  demo_data_success: {
    code: 1,
    msg: "success",
    data: "This is data back from server"
  },
  demo_data_fail: { code: -1, msg: "request data fail from server." },
  mock_virus_status_list: {
    code: 1,
    msg: "success",
    data: [
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
      })
    ]
  },

  //mock daily status
  mock_virus_status_daily_tick: {
    code: 1,
    msg: "success",
    data: {
      //daily total status
      dailyTotal: {
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
      },
      //daily new status
      dailyNew: {
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
      }
    }
  }
};
