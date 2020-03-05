import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import rootReducer from "../reducers";
import rootEpic from "../epics";

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function _configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware)),
  );
  epicMiddleware.run(rootEpic);
  return store;
}


const store = _configureStore();

export default store;
