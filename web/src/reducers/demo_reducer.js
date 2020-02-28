import { DemoActions } from "../actions";
import Status from "../config/status";

const initState = {
  data: "",
  status: Status.IDLE,
  msg: ""
};

export default function demoReducer(state = initState, action) {
  switch (action.type) {
    case DemoActions.REQUEST_DEMO_DATA:
      return {
        ...state,
        status: Status.LOADING,
        msg: "loading data...",
        data: ""
      };
    case DemoActions.SUCCESS_DEMO_DATA:
      return {
        ...state,
        status: Status.SUCCESS,
        msg: "success.",
        data: action.data
      };
    case DemoActions.CANCEL_DEMO_DATA:
      return { ...state, status: Status.CANCELED, data: "", msg: "canclled." };
    case DemoActions.FAIL_DEMO_DATA:
      return { ...state, status: Status.FAILED, msg: action.msg };
    default:
      return state;
  }
}
