import { 
    compose, legacy_createStore as createStore, applyMiddleware, Middleware, 
} from 'redux';
import { persistReducer, persistStore, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loggerMiddleware } from './middleware-ts/logger';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
    process.env.NODE_ENV !== 'production' && loggerMiddleware, 
    sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware));

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