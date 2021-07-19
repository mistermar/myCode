
import * as types from "./actionTypes";
import api from "../apiConfig";
import moment from "moment";
import axios from 'axios'
const rq = api.gps;


export function getGpsRecords(timestamp) {
  return function(dispatch) {
    axios.get(`********?expand=bus.lastGps,history&timestamp=${timestamp}`).then(
      response => {
        if (response.status === 200) {
          dispatch({
            type: types.GPS_GET_RECORDS,
            payload: response.data
          });
        } else {
          console.warn("error");
        }
      }
    )
  };
}

export function getGpsRecordById(id ,timestamp) {
  timestamp = timestamp ? timestamp : moment().utc(false).format('X');

  return function(dispatch) {
    rq.get(`*********/${id}?expand=bus.lastGps,history.timeline&timestamp=${timestamp}`).then(
      response => {
        if (response.status === 200) {
          dispatch({
            type: types.GPS_GET_RECORD_BY_ID,
            payload: response.data
          });
        } else {
          console.warn("error");
        }
      }
    );
  };
}

