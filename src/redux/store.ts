import { configureStore } from "@reduxjs/toolkit";
import searchImgSlice from "./slice/searchImgSlice";
import listImgSlice from "./slice/listImgSlice";
import commentSlice from "./slice/commentSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
    reducer: {
        searchImgSlice,
        listImgSlice,
        commentSlice,
        userSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})