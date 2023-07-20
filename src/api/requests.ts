import axios, { AxiosResponse } from 'axios';
import { OpfType } from 'src/common/types/customer';
import {
    DaDataAddress,
    DaDataCountries,
    DaDataGranularType,
    DaDataParty,
    DaDataResponse,
} from 'src/common/types/dadata';

const API_KEY = '209a5e021611a2e4930ebe2c5fb2b32bf4951e3d';
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Token ${API_KEY}`,
};
const DaDataCountriesApi = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/country';
const DaDataAddressApi = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
const DaDataPartyApi = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';

export const getCountriesRequest: (
    query: string,
) => Promise<AxiosResponse<DaDataResponse<DaDataCountries>>> = (query) =>
    axios.post<DaDataResponse<DaDataCountries>>(
        DaDataCountriesApi,
        { query },
        {
            headers,
        },
    );

export const getAddressRequest: (
    query?: string,
    country?: string,
    fias_id?: string,
    bound?: DaDataGranularType,
) => Promise<AxiosResponse<DaDataResponse<DaDataAddress>>> = (query, country, fias_id, bound) =>
    axios.post<DaDataResponse<DaDataAddress>>(
        DaDataAddressApi,
        {
            query,
            locations: [
                {
                    country,
                    fias_id,
                },
            ],
            from_bound: {
                value: bound,
            },
            to_bound: {
                value: bound === DaDataGranularType.CITY ? DaDataGranularType.SETTLEMENT : bound,
            },
            restrict_value: true,
        },
        {
            headers,
        },
    );

export const getPartyInfoRequest: (
    query: string,
    type: OpfType,
) => Promise<AxiosResponse<DaDataResponse<DaDataParty>>> = (query, type) =>
    axios.post<DaDataResponse<DaDataParty>>(
        DaDataPartyApi,
        {
            query,
            count: 1,
            branch_type: 'MAIN',
            type,
        },
        {
            headers,
        },
    );
