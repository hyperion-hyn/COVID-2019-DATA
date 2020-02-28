import { Observable } from "rxjs";

import mock_data from "./mock_data";

export const api = {
  requestDemoData() {
    return new Observable(observer => {
      console.log("loading data...");
      setTimeout(() => {
        const ramdom = Math.random() >= 0.495;
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

  requstVirusStatusByCountry() {
    //request mock
    return new Observable(observer => {
      console.log("loading data...");
      setTimeout(() => {
        const ramdom = Math.random() >= 0.495;
        if (ramdom) {
          console.log("mock request success.");
          observer.next(mock_data.demo_data_success);
          observer.complete();
        } else {
          console.log("mock request fail.");
          observer.error(new Error("data request error"));
        }
      }, 500);
    });
  }
};
