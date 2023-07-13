import { all, fork } from 'redux-saga/effects';

import addressSaga from './address-suggestion';
import countrySaga from './country-suggestion';
import formSaga from './form';
import partySaga from './party-suggestion';

export default function* rootSaga(): Generator {
    const sagas = [fork(formSaga), fork(addressSaga), fork(countrySaga), fork(partySaga)];

    yield all(sagas);
}
