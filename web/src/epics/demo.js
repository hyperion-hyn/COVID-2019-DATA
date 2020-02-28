import { ofType } from "redux-observable";
import { mergeMap, takeUntil, catchError, map } from "rxjs/operators";

import { DemoActions } from "../actions";
import { api } from "../data/api";
import { of } from "rxjs";

export function demoEpics(action$) {
  return action$.pipe(
    ofType(DemoActions.REQUEST_DEMO_DATA),
    mergeMap(action => {
      return api.requestDemoData().pipe(
        map(data => DemoActions.setLoadDemoDataSuccess(data.data)),
        takeUntil(action$.pipe(ofType(DemoActions.CANCEL_DEMO_DATA))),
        catchError(error => of(DemoActions.setLoadDemoDataFail(error.message)))
      );
    })
  );
}
