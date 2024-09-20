import { update_User_data } from "../../reduxSlices/userInfo"

const updateData = (data, dispatch) => {
    console.log("update data called , : ",data)
    dispatch(update_User_data(data))
}

export { updateData }
