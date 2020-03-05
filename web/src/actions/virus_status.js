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

  //upload poi data
  static UPLOAD_POI_DATA = "upload_poi_data";
  static UPLOADED_POI_DATA = "uploaded_poi_data";
  static FAILED_UPLOAD_POI_DATA = "failed_upload_poi_data";
  static CANCELLED_UPLOAD_POI_DATA = "cancelled_upload_poi_data";

  static uploadPoiData = poiInfo => ({
    type: VirusStatusActions.UPLOAD_POI_DATA,
    data: poiInfo
  });

  static uploadedPoiData = result => ({
    type: VirusStatusActions.UPLOADED_POI_DATA,
    msg: result
  });

  static failToUploadedPoiData = msg => ({
    type: VirusStatusActions.FAILED_UPLOAD_POI_DATA
  });

  static cancelledUploadedPoiData = () => ({
    type: VirusStatusActions.CANCELLED_UPLOAD_POI_DATA,
  });
}
