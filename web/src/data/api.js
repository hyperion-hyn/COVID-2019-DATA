import { Observable, from } from "rxjs";

import mock_data from "./mock_data";

export const api = {
  requestDemoData() {
    return new Observable(observer => {
      setTimeout(() => {
        const ramdom = Math.random() >= 0;
        if (ramdom) {
          console.log("mock request success.");
          observer.next(mock_data.demo_data_success);
          observer.complete();
        } else {
          console.log("mock request fail.");
          observer.error(new Error("data request error"));
        }
      }, 1500);
    });
  },

  //each country virus status data list
  requstCountryVirusStatusOld() {
    //request mock
    return new Observable(observer => {
      setTimeout(() => {
        const ramdom = Math.random() >= 0;
        if (ramdom) {
          console.log("mock request success.");
          observer.next(mock_data.mock_virus_status_list);
          observer.complete();
        } else {
          console.log("mock request fail.");
          observer.error(new Error("data request error"));
        }
      }, 500);
    });
  },

  requstCountryVirusStatus() {
    // return new Observable(observer => {
    //   setTimeout(() => {
    //     const ramdom = Math.random() >= 0;
    //     if (ramdom) {
    //       console.log("mock request success");
    //       observer.next(mock_data.mock_virus_status_list);
    //       observer.complete();
    //     } else {
    //       console.log("mock request fail.");
    //       observer.error(new Error("data request error"));
    //     }
    //   }, 500);
    // });

    return from(
      fetch("http://10.10.1.115:3000/data/country/latest").then(res =>
        res.json()
      )
    );
  },

  uploadPoiInfo(data) {
    console.log("request api " + JSON.stringify(data));
    return from(
      fetch("http://10.10.1.115:3000/covid-collector/event/collector", {
        body: JSON.stringify(data),
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json'
        }),
      }).then(res =>res.json())
    );
  },

  //daily status data for charts.
  requestDailyVirusStatus() {
    return new Observable(observer => {
      setTimeout(() => {
        const ramdom = Math.random() >= 0;
        if (ramdom) {
          console.log("mock request success");
          observer.next(mock_data.mock_virus_status_daily_tick);
          observer.complete();
        } else {
          console.log("mock request fail.");
          observer.error(new Error("data request error"));
        }
      }, 500);
    });
  }
};
