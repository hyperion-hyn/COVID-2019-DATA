import { combineEpics } from "redux-observable";

import { demoEpics } from "./demo";
import {
  onLoadContryVirusStatusEpics,
  onLoadDailyVirusByContryEpics,
  onUploadPoiInfoEpics
} from "./virus_status";
import { changeLocaleEpics } from "./locale";

export default combineEpics(
  demoEpics,
  changeLocaleEpics,
  onLoadContryVirusStatusEpics,
  onLoadDailyVirusByContryEpics,
  onUploadPoiInfoEpics
);
