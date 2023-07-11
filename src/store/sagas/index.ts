import { all, fork } from 'redux-saga/effects';

import dadataSaga from './dadata';
import formSaga from './form';

export default function* rootSaga(): Generator {
    const sagas = [fork(formSaga), fork(dadataSaga)];

    yield all(sagas);
}
