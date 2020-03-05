import { combineReducers } from "redux";

import demo from "./demo_reducer";
import locale from "./locales";
import { intlReducer } from "react-intl-redux";
import virusDailyReducer from "./virus_daily";
import virusStatusReducer from "./virus_status";
import { defaultLocale } from "../locale";

export default combineReducers({
  demo,
  locale,
  intl,
  virusDailyReducer,
  virusStatusReducer
});

//wrap react-intl-redux reducers
function intl(
  state = {
    locale: defaultLocale.lang,
    messages: defaultLocale.messages
  },
  action
) {
  return intlReducer(state, action);
}
