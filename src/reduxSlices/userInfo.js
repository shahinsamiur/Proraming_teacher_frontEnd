
import { createSlice } from "@reduxjs/toolkit";
import { updateTimeOfPc } from "../reducers/user_info_reducers";
const InitialValue = {
  Name: "samiur shahin",
  Age: 22,
  Gender: "male",
  Current_time: "",
  Current_class: 1 / 10

};

export const userInfo = createSlice({
  name: "userInfo",
  initialState: InitialValue,
  reducers: {
    "update_Time_of_Pc": updateTimeOfPc
  },
});

export const { update_Time_of_Pc } = userInfo.actions;
export default userInfo.reducer;