

import { createSlice } from "@reduxjs/toolkit";
import { UpdateCode } from "../reducers/updateCode";
import { setLanguge ,Trigger_to_PPT,Trigger_to_Terminal,setOutput} from "../reducers/setLanguge_function";





const InitialValue = {
  value: 0,
  socket: null, // Initialize as null
  language: "python",
  output: [],
  TriggerTerminal: true,
  code: "",
  replay:false

};

export const check = createSlice({
  name: "check",
  initialState: InitialValue,
  reducers: {
    updateCode: UpdateCode,
    SetLanguge:setLanguge,
    TiggerToPPT:Trigger_to_PPT,
    TriggerToTerminal:Trigger_to_Terminal,
    SetOutput:setOutput
  },
});

export const { updateCode, setSocket ,SetLanguge,TiggerToPPT,TriggerToTerminal,SetOutput} = check.actions;
export default check.reducer;