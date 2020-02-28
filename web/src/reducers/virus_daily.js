import Status from "../config/status";
import { VirusStatusActions } from "../actions/virus_status";

const initState = {
  status: Status.IDLE,
  data: {},
  msg: ""
};

export default function virusDailyReducer(state = initState, action) {
  switch (action.type) {
    case VirusStatusActions.LOAD_DAILY_DATA:
      return { state: Status.LOADING };
    case VirusStatusActions.LOADED_DAILY_DATA:
      return { state: Status.SUCCESS, data: action.data };
    case VirusStatusActions.CANCELLED_DAILY_DATA:
      return { state: Status.CANCELED };
    case VirusStatusActions.FAILED_DAILY_DATA:
      return { state: Status.FAILED, msg: action.msg };
    default:
      return state;
  }
}
