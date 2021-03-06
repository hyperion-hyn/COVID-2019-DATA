import Status from "../config/status";
import { VirusStatusActions } from "../actions/virus_status";

const initState = {
  status: Status.IDLE,
  data: [],
  msg: ""
};

export default function virusStatusReducer(state = initState, action) {
  switch (action.type) {
    case VirusStatusActions.LOAD_VIRUS_STATUS_DATA:
      return { status: Status.LOADING };
    case VirusStatusActions.LOADED_VIRDUS_STATUS_DATA:
      return { status: Status.SUCCESS, data: action.data };
    case VirusStatusActions.CANCELLED_LOAD_VIRUS_STATUS_DATA:
      return { status: Status.CANCELED };
    case VirusStatusActions.FAIL_LOAD_VIRUS_STATUS_DATA:
      return { status: Status.FAILED, msg: action.msg };
    default:
      return state;
  }
}
