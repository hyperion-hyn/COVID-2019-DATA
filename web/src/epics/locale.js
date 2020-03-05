import { ofType } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { LangaugeActions } from "../actions/language";
import { updateIntl } from "react-intl-redux";
import { findLocale } from "../locale";

export function changeLocaleEpics(action$) {
  return action$.pipe(
    ofType(LangaugeActions.CHANGE_LANGUAGE),
    mergeMap(action => {
      const locale = findLocale(action.lang);
      return of(
        updateIntl({
          locale: locale.lang,
          messages: locale.messages
        })
      );
    })
  );
}
