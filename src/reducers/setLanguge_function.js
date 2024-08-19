const setLanguge = (state, action) => {
    state.language = action.payload
}

const Trigger_to_Terminal = (state) => {
    if (state.TriggerTerminal !== true) state.TriggerTerminal = true

}


const Trigger_to_PPT = (state) => {
    if (state.TriggerTerminal !== false) state.TriggerTerminal = false
}



const setOutput = (state, action) => {
    state.output = state.output+`\n \n your ${state.language} file is exucuting , please wait a while........ \n `+action.payload.output
}




export { setLanguge, Trigger_to_Terminal, Trigger_to_PPT, setOutput }