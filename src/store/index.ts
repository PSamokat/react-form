import createSagaMiddleware from 'redux-saga';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countrySuggestion from 'src/store/reducers/country-suggestion';
import partySuggestion from 'src/store/reducers/party-suggestion';

import addressSuggestion from './reducers/address-suggestion';
import form from './reducers/form';
import RootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    form,
    addressSuggestion,
    countrySuggestion,
    partySuggestion,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type RootStore = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
