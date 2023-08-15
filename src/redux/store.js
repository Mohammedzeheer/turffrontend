import { configureStore } from "@reduxjs/toolkit";
import userReducer from  './userSlice'
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import adminReducer from "./adminSlice";
import partnerReducer from "./partnerSlice";


const persistConfig={
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, userReducer)
const persistedAdminReducer = persistReducer(persistConfig, adminReducer)
const persistedPartnerReducer = persistReducer(persistConfig, partnerReducer)

export const Store = configureStore({
    reducer: {
        user: persistedReducer,
        admin:persistedAdminReducer,
        partner:persistedPartnerReducer
    }
})

export const persistor = persistStore(Store)