import { combineEpics } from "redux-observable";

import { demoEpics } from "./demo";
import {
  onLoadContryVirusStatusEpics,
  onLoadDailyVirusByContryEpics
} from "./virus_status";

export default combineEpics(
  demoEpics,
  onLoadContryVirusStatusEpics,
  onLoadDailyVirusByContryEpics
);
