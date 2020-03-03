import { Observable } from "rxjs";

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
    return new Observable(observer => {
      fetch('http://10.10.1.115:3000/data/country/latest')
        .then(function (response) {
          return response.json();
        })
        .then(function (virusJson) {
          observer.next(virusJson);
          observer.complete();
          // console.log("!!!"+JSON.stringify(virusJson));
        });
    });
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
