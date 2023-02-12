import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import orderReducer from "./orderRedux";
import loaderReducer from "./loaderRedux"
import { combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'



const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({ 
    user: userReducer,
    cart: cartReducer,
    order:orderReducer,
    loader:loaderReducer
  })

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store= configureStore({
    reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],    
                },
                immutableCheck:false
            }),
    
})
export const persistor = persistStore(store)