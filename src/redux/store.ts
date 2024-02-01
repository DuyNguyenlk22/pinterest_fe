import { configureStore } from "@reduxjs/toolkit";
import searchImgSlice from "./slice/searchImgSlice";
import listImgSlice from "./slice/listImgSlice";

export const store = configureStore({
    reducer: {
        searchImgSlice,
        listImgSlice
    }
})