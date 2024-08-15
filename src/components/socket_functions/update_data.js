import { update_User_data } from "../../reduxSlices/userInfo"

const updateData = (data, dispatch) => {
    dispatch(update_User_data(data))
}

export { updateData }
