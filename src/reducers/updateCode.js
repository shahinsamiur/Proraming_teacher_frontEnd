const UpdateCode=(state,action)=>{
    console.log("ys : ",action.payload)
    state.code=action.payload
}



export {UpdateCode}