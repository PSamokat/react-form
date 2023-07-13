import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OpfType } from 'src/common/types/customer';

interface DaDataSuggestionsState {
    querySearch: string;
    type: OpfType;
    isFetching: boolean;

}

const initialState: DaDataSuggestionsState = {
    querySearch: undefined,
    type: undefined,
    isFetching: false,
};

const partySuggestionsReducer = createSlice({
    name: 'partySuggestions',
    initialState,
    reducers: {

        getPartyInfo(state: DaDataSuggestionsState, action: PayloadAction<{querySearch: string; type: OpfType}>) {
            state.type = action.payload.type;
            state.querySearch = action.payload.querySearch;
            state.isFetching = true;
        },
        donePartyInfo(state: DaDataSuggestionsState) {
            state.type = undefined;
            state.querySearch = undefined;
            state.isFetching = false;
        },
    },
});

export const partySuggestionActions = partySuggestionsReducer.actions;
export default partySuggestionsReducer.reducer;
