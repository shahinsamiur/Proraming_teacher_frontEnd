import {configureStore} from "@reduxjs/toolkit"
import Checks from "./reduxSlices/check"
import userInfo from "./reduxSlices/userInfo"






export const store=configureStore({
    reducer:{
        "Check":Checks,
        "UserInfo":userInfo
        
    }
})



