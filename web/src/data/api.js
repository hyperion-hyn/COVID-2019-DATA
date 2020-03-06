import { Observable, from } from "rxjs";

import mock_data from "./mock_data";

const domain = "http://d67ajkompfc3x.cloudfront.net/";

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
  /* requstCountryVirusStatusOld() {
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
  }, */

  requstCountryVirusStatus() {
    // todo: test
    /* return new Observable(observer => {
      setTimeout(() => {
        const ramdom = Math.random() >= 0;
        if (ramdom) {
          console.log("mock request success");
          observer.next(mock_data.mock_virus_status_list);
          observer.complete();
        } else {
          console.log("mock request fail.");
          observer.error(new Error("data request error"));
        }
      }, 500);
    }); */

    return from(
      fetch(
        `${domain}data/country/latest` /* , {credentials: 'no-cors'} */
      ).then(res => res.json())
    );
  },

  uploadPoiInfo(data) {
    //console.log("request api " + JSON.stringify(data));
    return from(
      fetch(`${domain}covid-collector/event/collector`, {
        body: JSON.stringify(data),
        method: "POST",
        headers: new Headers({
          "content-type": "application/json"
        })
      }).then(res => res.json())
    );
  },

  //daily status data for charts.
  requestDailyVirusStatus(area) {
    // todo: test
    /* return new Observable(observer => {
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
    }); */

    return from(
      fetch(`${domain}data/country/daily/${area}`).then(res => res.json())
    );
  },

  requestVirusInfo(pid) {
    return from(
      fetch(`${domain}covid-collector/event/detail/${pid}`).then(res =>
        res.json()
      )
    );
  }
};
