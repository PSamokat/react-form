import { put, select, takeLatest } from 'redux-saga/effects';
import { RootState } from 'src/store';
import { getCountriesRequest } from 'src/store/actions/dadata';
import { countrySuggestionActions } from 'src/store/reducers/country-suggestion';

function* loadCountriesSuggestions() {
    const querySearch = yield select(
        (state: RootState) => state.countrySuggestion.querySearch,
    );

    const data = yield getCountriesRequest(querySearch)
        .then((response) =>
            response.data.suggestions.map((suggestion) => ({
                label: suggestion.value,
                value: suggestion.value,
                title: suggestion.data.code,
            })))
        .catch();

    yield put(countrySuggestionActions.doneCountriesSuggestions(data));
}

export default function* rootSaga() {
    yield takeLatest(countrySuggestionActions.getCountriesSuggestions, loadCountriesSuggestions);
}
