import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
//import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loggerMiddleware } from './middleware/logger';
import createSagaMiddleware from 'redux-saga';
//import thunk from 'redux-thunk';
//import logger from 'redux-logger';
import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';
import persistStore from 'redux-persist/es/persistStore';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
    process.env.NODE_ENV !== 'production' && loggerMiddleware, 
    sagaMiddleware
].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== 'production' && 
    window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
    persistedReducer, 
    undefined,
    composeEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);