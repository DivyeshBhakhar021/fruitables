
import { applyMiddleware, createStore } from "redux"
import { rootReducer } from "./reducer"
import { thunk } from "redux-thunk"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const configestore = () =>{
    
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['facilities']
  }
   
  const persistedReducer = persistReducer(persistConfig, rootReducer)
   
    const store = createStore(persistedReducer, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { store, persistor }
} 