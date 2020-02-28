export class DemoActions {
  static REQUEST_DEMO_DATA = "load_demo_data";
  static FAIL_DEMO_DATA = "load_demo_data_fail";
  static SUCCESS_DEMO_DATA = "load_demo_data_success";
  static CANCEL_DEMO_DATA = "load_demo_data_canceld";


  static requestDemoData() {
    return {
      type: DemoActions.REQUEST_DEMO_DATA
    };
  }
  
  static setLoadDemoDataFail(msg) {
    return {
      type: DemoActions.FAIL_DEMO_DATA,
      msg
    };
  }
  
  static setLoadDemoDataSuccess(data) {
    return {
      type: DemoActions.SUCCESS_DEMO_DATA,
      data
    };
  }
  
  static setDemoDataCancel() {
    return {
      type: DemoActions.CANCEL_DEMO_DATA
    };
  }
  
}