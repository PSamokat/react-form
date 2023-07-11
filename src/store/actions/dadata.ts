import axios from 'axios';
import { OpfType } from 'Src/common/types/customer';
import {
    DaDataAddress, DaDataCountries, DaDataParty, DaDataResponse,
} from 'src/common/types/dadata';

const API_KEY = '209a5e021611a2e4930ebe2c5fb2b32bf4951e3d';
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Token ${API_KEY}`,
};
const DaDataCountriesApi = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/country';
const DaDataCitiesApi = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
const DaDataPartyApi = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';

export const getCountriesRequest = (querySearch: string) =>
    axios.post<DaDataResponse<DaDataCountries>>(
        DaDataCountriesApi,
        { query: querySearch },
        {
            headers,
        },
    );

export const getCitiesRequest = (querySearch: string) =>
    axios.post<DaDataResponse<DaDataAddress>>(
        DaDataCitiesApi,
        {
            query: querySearch,
            from_bound: { value: 'city' },
            to_bound: { value: 'city' },
        },
        {
            headers,
        },
    );

export const getPartyInfoRequest = (querySearch: string, type: OpfType) =>
    axios.post<DaDataResponse<DaDataParty>>(
        DaDataPartyApi,
        {
            query: querySearch,
            count: 1,
            branch_type: 'MAIN',
            type,
        },
        {
            headers,
        },
    );
