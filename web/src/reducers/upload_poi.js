import Status from "../config/status";
import { VirusStatusActions } from "../actions/virus_status";

const initState = {
  status: Status.IDLE,
  data: {},
  msg: "",
};

export default function uploadPoiReducer(state = initState, action) {
  switch (action.type) {
    case VirusStatusActions.UPLOAD_POI_DATA:
    case VirusStatusActions.UPDATE_POI_DATA:
    case VirusStatusActions.REPORT_POI_DATA:
      return { status: Status.LOADING };
    case VirusStatusActions.UPLOADED_POI_DATA:
      return { status: Status.SUCCESS, msg: action.msg, data: action.data };
    case VirusStatusActions.CANCELLED_UPLOAD_POI_DATA:
      return { status: Status.CANCELED };
    case VirusStatusActions.FAILED_UPLOAD_POI_DATA:
      return { status: Status.FAILED, msg: action.msg };
    default:
      return state;
  }
}
