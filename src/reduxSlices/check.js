

import { createSlice } from "@reduxjs/toolkit";
import { UpdateCode } from "../reducers/updateCode";
import { setLanguge ,Trigger_to_PPT,Trigger_to_Terminal,setOutput,set_Right_side_state} from "../reducers/setLanguge_function";





const InitialValue = {
  value: 0,
  socket: null, // Initialize as null
  language: "python",
  output: [],
  TriggerTerminal: true,
  code: "",
  replay:false,
  Right_side_state:"presentation"

};

export const check = createSlice({
  name: "check",
  initialState: InitialValue,
  reducers: {
    updateCode: UpdateCode,
    SetLanguge:setLanguge,
    TiggerToPPT:Trigger_to_PPT,
    TriggerToTerminal:Trigger_to_Terminal,
    SetOutput:setOutput,
    set_right_side_state:set_Right_side_state
  },
});

export const { updateCode, setSocket ,SetLanguge,TiggerToPPT,TriggerToTerminal,SetOutput,set_right_side_state} = check.actions;
export default check.reducer;