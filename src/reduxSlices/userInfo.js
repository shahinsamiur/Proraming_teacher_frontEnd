
import { createSlice } from "@reduxjs/toolkit";
import {updateUserData} from "../reducers/updateUserData"
import { getTime } from "../components/functions/Get_time";
var date=getTime()
const InitialValue = {
  Name: "samiur shahin",
  Age: 22,
  Gender: "male",
  date: date,
  Current_class: 1 / 10,
  current_program:"wish"

};

export const userInfo = createSlice({
  name: "userInfo",
  initialState: InitialValue,
  reducers: {
    "update_User_data":updateUserData,

  },
});

export const {update_User_data } = userInfo.actions;
export default userInfo.reducer;