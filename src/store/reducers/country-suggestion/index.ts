import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DaDataSelectOptions } from 'src/common/types/dadata';

interface CountrySuggestionState {
    querySearch: string;
    isFetching: boolean;
    countries: DaDataSelectOptions;
}
const initialState: CountrySuggestionState = {
    querySearch: undefined,
    isFetching: false,
    countries: [],
};

const countrySuggestionReducer = createSlice({
    name: 'countrySuggestion',
    initialState,
    reducers: {
        getCountriesSuggestions(state: CountrySuggestionState, action: PayloadAction<string>) {
            state.querySearch = action.payload;
            state.isFetching = true;
        },
        doneCountriesSuggestions(state: CountrySuggestionState, action: PayloadAction<DaDataSelectOptions>) {
            state.countries = action.payload;
            state.isFetching = false;
        },
    },
});

export const countrySuggestionActions = countrySuggestionReducer.actions;

export default countrySuggestionReducer.reducer;
