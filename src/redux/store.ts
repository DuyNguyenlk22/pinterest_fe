import { configureStore } from "@reduxjs/toolkit";
import searchImgSlice from "./slice/searchImgSlice";

export const store = configureStore({
    reducer: {
        searchImgSlice
    }
})