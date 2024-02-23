import { configureStore } from "@reduxjs/toolkit";
import searchImgSlice from "./slice/searchImgSlice";
import listImgSlice from "./slice/listImgSlice";
import userSlice from "./slice/userSlice";
import infoUserSlice from "./slice/infoUserSlice";

export const store = configureStore({
    reducer: {
        searchImgSlice,
        listImgSlice,
        userSlice,
        infoUserSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})