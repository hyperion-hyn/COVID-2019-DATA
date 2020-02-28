import {
  VirusStatusModel,
  VirusStatusDateNewTickModel,
  VirusStatusDateTotalTickModel
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
  //模拟日新增数据
  mock_virus_status_date_new_tick: {
    code: 1,
    msg: "success",
    data: {
      dead: [
        VirusStatusDateNewTickModel.fromObject({
          id: 1,
          isCountry: 1,
          area: "China", //China
          type: "dead", //confirmed, recoverd
          date: "2019-2-1",
          count: 10
        }),
        VirusStatusDateNewTickModel.fromObject({
          id: 2,
          isCountry: 1,
          area: "China", //China
          type: "dead", //confirmed, recoverd
          date: "2019-2-2",
          count: 4
        })
      ],
      confirmed: [
        VirusStatusDateNewTickModel.fromObject({
          id: 1,
          isCountry: 1,
          area: "China", //China
          type: "confirmed", //confirmed, recoverd
          date: "2019-2-1",
          count: 3
        }),
        VirusStatusDateNewTickModel.fromObject({
          id: 2,
          isCountry: 1,
          area: "China", //China
          type: "confirmed", //confirmed, recoverd
          date: "2019-2-2",
          count: 2
        })
      ],
      recoverd: [
        VirusStatusDateNewTickModel.fromObject({
          id: 1,
          isCountry: 1,
          area: "China", //China
          type: "recoverd", //confirmed, recoverd
          date: "2019-2-1",
          count: 30
        }),
        VirusStatusDateNewTickModel.fromObject({
          id: 2,
          isCountry: 1,
          area: "China", //China
          type: "recoverd", //confirmed, recoverd
          date: "2019-2-2",
          count: 21
        })
      ]
    }
  },
  //模拟日总数统计增数据
  mock_virus_status_date_new_tick: {
    code: 1,
    msg: "success",
    data: {
      dead: [
        VirusStatusDateTotalTickModel.fromObject({
          id: 1,
          isCountry: 1,
          area: "China", //China
          type: "dead", //confirmed, recoverd
          date: "2019-2-1",
          count: 10
        }),
        VirusStatusDateTotalTickModel.fromObject({
          id: 2,
          isCountry: 1,
          area: "China", //China
          type: "dead", //confirmed, recoverd
          date: "2019-2-2",
          count: 4
        })
      ],
      confirmed: [
        VirusStatusDateTotalTickModel.fromObject({
          id: 1,
          isCountry: 1,
          area: "China", //China
          type: "confirmed", //confirmed, recoverd
          date: "2019-2-1",
          count: 3
        }),
        VirusStatusDateTotalTickModel.fromObject({
          id: 2,
          isCountry: 1,
          area: "China", //China
          type: "confirmed", //confirmed, recoverd
          date: "2019-2-2",
          count: 2
        })
      ],
      recoverd: [
        VirusStatusDateTotalTickModel.fromObject({
          id: 1,
          isCountry: 1,
          area: "China", //China
          type: "recoverd", //confirmed, recoverd
          date: "2019-2-1",
          count: 30
        }),
        VirusStatusDateTotalTickModel.fromObject({
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
};
