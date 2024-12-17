
import { createSlice } from "@reduxjs/toolkit";
import {updateUserData} from "../reducers/updateUserData"
import { getTime } from "../components/functions/Get_time";
var date=getTime()
const InitialValue = {
  Name: "samiur shahin",
  Age: 22,
  Gender: "male",
  date: date,
  Current_class: 1,
  current_program:"wish",
  current_program_count:0,
  no_response:0,
  re_request:false,
  imidiate:false,
  await:false,
  code_count:0,
  asking_count:0,
  asking_query:false
};

export const userInfo = createSlice({
  name: "userInfo",
  initialState: InitialValue,
  reducers: {
    "update_User_data":updateUserData,

  },
});

export const {update_User_data ,update_Bot_status} = userInfo.actions;
export default userInfo.reducer;