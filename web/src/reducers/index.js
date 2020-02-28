import { combineReducers } from "redux";

import demo from "./demo_reducer";
import virusDailyReducer from "./virus_daily";
import virusStatusReducer from "./virus_status";

export default combineReducers({
  demo,
  virusDailyReducer,
  virusStatusReducer
});
