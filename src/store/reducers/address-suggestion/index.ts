import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DaDataSelectOptions } from 'src/common/types/dadata';

export interface AddressQuerySearch {
    query?: string;
    country?: string;
    region?: string;
    city?: string;
    settlement?: string;
    street?: string;
    house?: string;
    from_bound?: string;
    to_bound?: string;
}
interface AddressSuggestionState {
    querySearch: AddressQuerySearch;
    isFetching: boolean;
    data: DaDataSelectOptions;
}

const initialState: AddressSuggestionState = {
    querySearch: {
        query: undefined,
        country: undefined,
        region: undefined,
        city: undefined,
        settlement: undefined,
        street: undefined,
        house: undefined,
        from_bound: undefined,
        to_bound: undefined,
    },
    isFetching: false,
    data: [],
};

const addressSuggestionReducer = createSlice({
    name: 'addressSuggestion',
    initialState,
    reducers: {
        getAddressSuggestions(state: AddressSuggestionState, action: PayloadAction<AddressQuerySearch>) {
            state.querySearch = action.payload;
            state.isFetching = true;
        },
        doneAddressSuggestions(state: AddressSuggestionState, action: PayloadAction<DaDataSelectOptions>) {
            state.data = action.payload;
            state.isFetching = false;
        },
    },
});

export const addressSuggestActions = addressSuggestionReducer.actions;
export default addressSuggestionReducer.reducer;
