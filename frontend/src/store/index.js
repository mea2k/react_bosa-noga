import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from '../reducers';
import saga from '../sagas';
import { storageMiddleware } from '../storage';




const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({ thunk: false }), storageMiddleware, sagaMiddleware],
})



// запуск корневой saga
sagaMiddleware.run(saga);