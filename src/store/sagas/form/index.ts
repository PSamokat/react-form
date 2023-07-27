import { select, takeLatest } from 'redux-saga/effects';
import { RootState } from 'src/store';
import { formActions } from 'src/store/reducers/form';

function* send() {
    const form = yield select((state: RootState) => state.form);

    console.log(form);
    console.log('Конец)))');
}

export default function* rootSaga(): Generator {
    yield takeLatest(formActions.sendForm, send);
}
