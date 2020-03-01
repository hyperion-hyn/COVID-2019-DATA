export class VirusStatusActions {
  //cuntry virus data
  static LOAD_VIRUS_STATUS_DATA = "load_virus_status_data";
  static FAIL_LOAD_VIRUS_STATUS_DATA = "fail_to_load_virus_data";
  static LOADED_VIRDUS_STATUS_DATA = "loaded_virus_data";
  static CANCELLED_LOAD_VIRUS_STATUS_DATA = "cancelled_load_virus_data";

  static fetchVirusData = () => ({
    type: VirusStatusActions.LOAD_VIRUS_STATUS_DATA
  });

  static cancelVirusData = () => ({
    type: VirusStatusActions.CANCELLED_LOAD_VIRUS_STATUS_DATA
  });

  static failToFetchVirusData = msg => ({
    type: VirusStatusActions.FAIL_LOAD_VIRUS_STATUS_DATA,
    msg
  });

  static loadedVirusStatusData = data => ({
    type: VirusStatusActions.LOADED_VIRDUS_STATUS_DATA,
    data
  });

  //daily data
  static LOAD_DAILY_DATA = "load_daily_data";
  static LOADED_DAILY_DATA = "load_daily_data_success";
  static FAILED_DAILY_DATA = "load_daily_data_failed";
  static CANCELLED_DAILY_DATA = "cancelled_daily_data";

  static fetchDailyVirus = contry => ({
    type: VirusStatusActions.LOAD_DAILY_DATA,
    contry
  });

  static cancelDailyVirus = () => ({
    type: VirusStatusActions.CANCELLED_DAILY_DATA
  });

  static failToFetchDailyVirus = msg => ({
    type: VirusStatusActions.CANCELLED_DAILY_DATA
  });

  static loadedDailyVirus = data => ({
    type: VirusStatusActions.LOADED_DAILY_DATA,
    data
  });
}
