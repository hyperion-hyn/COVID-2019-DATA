import { ofType } from "redux-observable";
import { mergeMap, takeUntil, catchError, map } from "rxjs/operators";

import { VirusStatusActions } from "../actions";
import { api } from "../data/api";
import { of } from "rxjs";
import ServerCode from "../config/server_code";

export function onLoadContryVirusStatusEpics(action$) {
  return action$.pipe(
    ofType(VirusStatusActions.LOAD_VIRUS_STATUS_DATA),
    mergeMap(action => {
      return api.requstCountryVirusStatus().pipe(
        map(response => {
          if (response.code === ServerCode.SUCCESS) {
            return VirusStatusActions.loadedVirusStatusData(response.data);
          } else {
            throw Error(response.msg);
          }
        }),
        takeUntil(
          action$.pipe(
            ofType(VirusStatusActions.CANCELLED_LOAD_VIRUS_STATUS_DATA)
          )
        ),
        catchError(error =>
          of(VirusStatusActions.failToFetchVirusData(error.message))
        )
      );
    })
  );
}

export function onLoadDailyVirusByContryEpics(action$) {
  return action$.pipe(
    ofType(VirusStatusActions.LOAD_DAILY_DATA),
    mergeMap(action => {
      return api.requestDailyVirusStatus().pipe(
        map(response => {
          if (response.code === ServerCode.SUCCESS) {
            return VirusStatusActions.loadedDailyVirus(response.data);
          } else {
            throw Error(response.msg);
          }
        }),
        takeUntil(
          action$.pipe(ofType(VirusStatusActions.CANCELLED_DAILY_DATA))
        ),
        catchError(error =>
          of(VirusStatusActions.failToFetchDailyVirus(error.message))
        )
      );
    })
  );
}

export function onUploadPoiInfoEpics(action$) {
  console.log("epic api ");
  return action$.pipe(
    ofType(VirusStatusActions.UPLOAD_POI_DATA),
    mergeMap(action => {
      return api.uploadPoiInfo(action.data).pipe(
        map(response => {
          console.log("request api result== " + response.code + response.msg);
          if (response.code === ServerCode.SUCCESS) {
            return VirusStatusActions.uploadedPoiData(response.msg);
          } else {
            throw Error(response.msg);
          }
        }),
        takeUntil(
          action$.pipe(ofType(VirusStatusActions.CANCELLED_UPLOAD_POI_DATA))
        ),
        catchError(error =>
          of(VirusStatusActions.failToUploadedPoiData(error.message))
        )
      );
    })
  );
}
