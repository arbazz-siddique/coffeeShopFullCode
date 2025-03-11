import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"

import menuReducer from "./slices/menuSlice"
import orderReducer from "./slices/orderSlice"
import reservationReducer from "./slices/reservationSlice"
import reviewReducer from "./slices/reviewSlice"


export const store = configureStore({
    reducer:{
        user:userReducer,
        menu:menuReducer,
        order:orderReducer,
        reservation:reservationReducer,
        review:reviewReducer
       
    }
})