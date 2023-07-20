import { all, fork } from 'redux-saga/effects';

import formSaga from './form';

export default function* rootSaga(): Generator {
    const sagas = [fork(formSaga)];

    yield all(sagas);
}
