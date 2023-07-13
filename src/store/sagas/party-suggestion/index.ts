import {
    all, put, select, takeLatest,
} from 'redux-saga/effects';
import type { RootState } from 'src/store';
import { getPartyInfoRequest } from 'src/store/actions/dadata';
import { formActions } from 'src/store/reducers/form';
import { partySuggestionActions } from 'src/store/reducers/party-suggestion';

function* loadPartyInfo() {
    const { querySearch, type } = yield select((state: RootState) => state.partySuggestion);

    const data = yield getPartyInfoRequest(querySearch, type)
        .then((response) => {
            if (response.data.suggestions.length) {
                return response.data.suggestions.shift().data;
            }

            return { inn: 'Компания не найдена' };
        })
        .catch((reason) => console.log(reason));

    yield all([
        put(formActions.setLegalInfoSuggest(data)),
        put(partySuggestionActions.donePartyInfo()),
    ]);
}

export default function* rootSaga() {
    yield takeLatest(partySuggestionActions.getPartyInfo, loadPartyInfo);
}
