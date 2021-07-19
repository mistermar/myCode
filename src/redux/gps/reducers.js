import * as types from "./actionTypes";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GPS_GET_RECORDS: {
      //let newArr = [...state] ;
      //newArr = action.payload;
      return action.payload;
    }
    case types.GPS_GET_RECORD_BY_ID: {
      let newArr = [...state] ;
      let index = newArr.findIndex(x => x.id === action.payload.id);
      if(index !== -1) newArr.splice(index,1);
      newArr.push(action.payload);
      return newArr;
    }

    default:
      return state;
  }
};
