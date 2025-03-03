import { configureStore } from "@reduxjs/toolkit";
import authReduser from "./slices/authSlice";


export const store = configureStore({
    reducer: {
      auth: authReduser
    },
})