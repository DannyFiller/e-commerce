import { configureStore, legacy_createStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import counterReducer, { counterSlice } from "../features/contact/counterReducer";
import { catalogApi } from "../features/catalog/catalogApi";
import { uiSlice } from "../layout/uiSlice";
import { ErrorApi } from "../features/about/errorApi";
import { basketApi } from "../features/basket/basketApi";

// sử dụng redux
export function configureTheStore(){
    return legacy_createStore(counterReducer)
}

// sử dụng redux-tool-kit
export const store = configureStore({
    reducer:{
        [catalogApi.reducerPath] : catalogApi.reducer,
        [ErrorApi.reducerPath] : ErrorApi.reducer,
        [basketApi.reducerPath] : basketApi.reducer,
        counter: counterSlice.reducer,
        ui: uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(catalogApi.middleware, ErrorApi.middleware, basketApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()