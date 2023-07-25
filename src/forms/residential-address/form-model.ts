import { DaDataAddress, DaDataCountries, FieldWithDaData } from 'Src/common/types/dadata';

export interface ResidentialAddressFieldsModel {
    addressMatches?: boolean;
    country?: FieldWithDaData<DaDataCountries>;
    region?: FieldWithDaData<DaDataAddress>;
    city?: FieldWithDaData<DaDataAddress>;
    street?: FieldWithDaData<DaDataAddress>;
    house?: FieldWithDaData<DaDataAddress>;
    apartment?: string;
    hasNoApartment?: boolean;
}
