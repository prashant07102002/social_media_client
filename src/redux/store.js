import appConfigReducer from "./slices/appConfigSlice"
import { configureStore } from "@reduxjs/toolkit"
import postReducer from "./slices/postSlice"
import feedDataReducer from "./slices/feedSlice"
export default configureStore({
    reducer: {
        appConfigReducer,
        postReducer,
        feedDataReducer
    }
})