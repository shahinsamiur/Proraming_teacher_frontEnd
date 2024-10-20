const setLanguge = (state, action) => {
    state.language = action.payload
}

const Trigger_to_Terminal = (state) => {
    if (state.TriggerTerminal !== true) state.TriggerTerminal = true

}


const Trigger_to_PPT = (state) => {
    if (state.TriggerTerminal !== false) state.TriggerTerminal = false
}


const set_Right_side_state = (state, action) => {
    state.Right_side_state = action.payload
}







const setOutput = (state, action) => {
    if (action.payload.type === "clear") { state.output = [] }
    else {
        let temp = state.output
        temp.push(action.payload)
        state.output = temp
    }
}





export { setLanguge, Trigger_to_Terminal, Trigger_to_PPT, setOutput, set_Right_side_state }