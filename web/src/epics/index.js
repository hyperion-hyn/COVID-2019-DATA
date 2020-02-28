import {combineEpics} from "redux-observable";

import {demoEpics} from './demo'

export default combineEpics(
  demoEpics
)