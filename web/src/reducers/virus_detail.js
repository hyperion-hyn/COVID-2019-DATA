import Status from "../config/status";
import { VirusStatusActions } from "../actions/virus_status";

const initState = {
  status: Status.IDLE,
  data: {},
  msg: ""
};

export default function virusDetailReducer(state = initState, action) {
  switch (action.type) {
    case VirusStatusActions.FETCH_VIRUS_INFO_MODEL:
      return { status: Status.LOADING, data: action.data };
    case VirusStatusActions.LOADED_VIRUS_INFO_MODEL:
      return { status: Status.SUCCESS, data: action.model };
    case VirusStatusActions.CANCELLED_VIRUS_INFO_MODEL:
      return { status: Status.CANCELED };
    case VirusStatusActions.FAILED_VIRUS_INFO_MODEL:
      return { ...state, status: Status.FAILED, msg: action.msg };
    case VirusStatusActions.CLEARE_VIRUS_INFO_MODEL:
      return { status: Status.IDLE };
    default:
      return state;
  }
}
