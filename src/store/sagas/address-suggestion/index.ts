import { put, select, takeLatest } from 'redux-saga/effects';
import { DaDataSelectOption } from 'src/common/types/dadata';
import { RootState } from 'src/store';
import { getAddressRequest } from 'src/store/actions/dadata';
import { addressSuggestActions } from 'src/store/reducers/address-suggestion';

function* loadAddressSuggestions() {
    const querySearch = yield select(
        (state: RootState) => state.addressSuggestion.querySearch,
    );

    const data = yield getAddressRequest(querySearch)
        .then((response) =>
            response.data.suggestions.map<DaDataSelectOption>((suggestion) => ({
                label: suggestion.value,
                value: `${suggestion.data.fias_id} ${suggestion.value}`,
                title: suggestion.data.fias_id,
            })))
        .catch();

    yield put(addressSuggestActions.doneAddressSuggestions(data));
}

export default function* rootSaga() {
    yield takeLatest(addressSuggestActions.getAddressSuggestions, loadAddressSuggestions);
}
