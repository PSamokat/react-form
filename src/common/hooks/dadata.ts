import {
    useCallback, useEffect, useMemo, useState,
} from 'react';
import { getAddressRequest, getCountriesRequest, getPartyInfoRequest } from 'src/api/requests';
import { OpfType } from 'src/common/types/customer';
import {
    DaDataAddress,
    DaDataCountries,
    DaDataGranularType,
    DaDataParty,
    DaDataSelectOptions,
    DaDataSuggestion,
} from 'src/common/types/dadata';
import { useDebouncedCallback } from 'use-debounce';

export const useDaDataCountries: (
    query: string,
) => [DaDataSelectOptions<DaDataCountries>, boolean] = (query?) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Array<DaDataSuggestion<DaDataCountries>>>([]);

    const search: (value: string) => void = useCallback((value) => {
        if (!value || value.length < 2) {
            return;
        }
        getCountriesRequest(value)
            .then((response) => setData(response.data.suggestions))
            .catch((reason) => console.log(reason.response));
    }, []);
    const debouncedSearch = useDebouncedCallback(search, 800);

    useEffect(() => {
        setIsLoading(true);
        debouncedSearch(query);
        setIsLoading(false);
    }, [query]);

    const suggestions = useMemo(
        () =>
            data.map((suggestion) => ({
                label: suggestion.value,
                value: suggestion.value,
                title: suggestion.data.name,
                data: suggestion.data,
            })),
        [data],
    );

    return [suggestions, isLoading];
};

export const useDaDataAddress: (
    query?: string,
    type?: DaDataGranularType,
    countryBound?: string,
    fiasBound?: string,
) => [DaDataSelectOptions<DaDataAddress>, boolean] = (query, type, countryBound, fiasBound) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Array<DaDataSuggestion<DaDataAddress>>>([]);

    const search: (
        value?: string,
        country?: string,
        fias?: string,
        bound?: DaDataGranularType,
    ) => void = useCallback(
        (value, country, fias, bound) => {
            if (!value || value.length < 2 && bound !== DaDataGranularType.HOUSE) {
                return;
            }
            getAddressRequest(value, country, fias, bound)
                .then((response) => setData(response.data.suggestions))
                .catch((reason) => console.log(reason));
        },
        [query, countryBound, fiasBound, type],
    );

    const debounceSearch = useDebouncedCallback(search, 800);

    useEffect(() => {
        setIsLoading(true);
        debounceSearch(query, countryBound, fiasBound, type);
        setIsLoading(false);
    }, [query]);

    const suggestions = useMemo(
        () =>
            data.map((suggestion) => ({
                label: suggestion.value,
                value: suggestion.value,
                title: suggestion.unrestricted_value,
                data: suggestion.data,
            })),
        [data],
    );

    return [suggestions, isLoading];
};

export const useDaDataParty: (
    query: string,
    type: OpfType,
) => [DaDataSuggestion<DaDataParty>, boolean] = (query, type) => {
    const [isLoading, setIsLoading] = useState(false);
    const [partyInfo, setPartyInfo] = useState<DaDataSuggestion<DaDataParty>>();

    const search: (value?: string, opf?: OpfType) => void = useCallback(
        (value, opf) => {
            if (
                !value ||
                (value.length === 10 && opf === OpfType.LEGAL) ||
                (value.length === 12 && opf === OpfType.INDIVIDUAL)
            ) {
                getPartyInfoRequest(value, opf)
                    .then((response) => {
                        if (response.data.suggestions.length > 0) {
                            setPartyInfo(response.data.suggestions.shift());
                        }
                    })
                    .catch((reason) => console.log(reason));
            }
        },
        [query, type],
    );

    const debounsedSearch = useDebouncedCallback(search, 300);

    useEffect(() => {
        setIsLoading(true);
        debounsedSearch(query, type);
        setIsLoading(false);
    }, [query]);

    return [partyInfo, isLoading];
};
