import { combineReducers } from "src/redux/index";
import sessions from "./sessions/reducers";

import gps from "./gps/reducers";
import { requestsReducer } from 'redux-requests';

const rootReducer = (state, action) => {
  if (action.type === 'auth.UNAUTHENTICATED') {
    state = undefined
  }
  return appReducer(state, action)
}

const appReducer = combineReducers({
  sessions,
  gps,
  requestsReducer
});


export default rootReducer;
