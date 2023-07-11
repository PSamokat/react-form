import {
    all, put, select, takeLatest,
} from 'redux-saga/effects';
import type { RootState } from 'src/store';
import {
    getCitiesRequest,
    getCountriesRequest,
    getPartyInfoRequest,
} from 'src/store/actions/dadata';
import { suggestionActions } from 'src/store/reducers/dadata';
import { formActions } from 'src/store/reducers/form';

function* loadCountriesSuggestions() {
    const querySearch = yield select(
        (state: RootState) => state.suggestions.countriesSuggestions.querySearch,
    );

    const data = yield getCountriesRequest(querySearch)
        .then((response) =>
            response.data.suggestions.map((suggestion) => ({
                label: suggestion.value,
                value: suggestion.value,
            })))
        .catch(() => ({ value: 'Некорректный ввод', label: 'Некорректный ввод' }));

    yield put(suggestionActions.doneCountriesSuggestions(data));
}

function* loadCitiesSuggestions() {
    const querySearch = yield select(
        (state: RootState) => state.suggestions.citiesSuggestions.querySearch,
    );

    const data = yield getCitiesRequest(querySearch)
        .then((response) =>
            response.data.suggestions.map((suggestion) => ({
                label: suggestion.value,
                value: suggestion.value,
            })))
        .catch(() => ({ value: 'Некорректный ввод', label: 'Некорректный ввод' }));

    yield put(suggestionActions.doneCitiesSuggestions(data));
}
function* loadPartyInfo() {
    const { querySearch, type } = yield select(
        (state: RootState) => state.suggestions.legalInfoSuggest,
    );

    const data = yield getPartyInfoRequest(querySearch, type)
        .then((response) => {
            if (response.data.suggestions.length) {
                return response.data.suggestions.shift().data;
            }

            return { inn: 'Компания не найдена' };
        })
        .catch((reason) => console.log(reason));

    yield all([put(formActions.setLegalInfoSuggest(data)), put(suggestionActions.donePartyInfo())]);
}

export default function* rootSaga() {
    yield takeLatest(suggestionActions.getCountriesSuggestions, loadCountriesSuggestions);
    yield takeLatest(suggestionActions.getCitiesSuggestions, loadCitiesSuggestions);
    yield takeLatest(suggestionActions.getPartyInfo, loadPartyInfo);
}
