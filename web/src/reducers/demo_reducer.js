import { DemoActions } from "../actions";

const initState = {
  data: "",
  status: "idea",
  msg: ""
};

export default function demoReducer(state = initState, action) {
  switch (action.type) {
    case DemoActions.REQUEST_DEMO_DATA:
      return { ...state, status: "loading", msg: "", data: "" };
    case DemoActions.SUCCESS_DEMO_DATA:
      return { ...state, status: "success", msg: "", data: action.data };
    case DemoActions.CANCEL_DEMO_DATA:
      return { ...state, status: "cancel", data: "" };
    case DemoActions.FAIL_DEMO_DATA:
      return { ...state, status: "fail", msg: action.msg, data: "" };
    default:
      return state;
  }
}
