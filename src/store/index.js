import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './Reduces'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
//  存储机制，使用sessionStorage, 可换成localStorage
import storageSession from 'redux-persist/lib/storage/session'
const persistConfig = {
  key: 'root', // 必需配置
  storage: storageSession, // 缓存机制
  // blacklist: ['auth'] reducer 里不持久化的数据,除此外均为持久化数据,非必需配置
  whitelist: ['auth'] // reducer 里持久化的数据,除此外均为不持久化数据,非必需配置
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
)
export const persistor = persistStore(store)

export default store
