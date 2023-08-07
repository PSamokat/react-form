import { Dayjs } from 'dayjs';
import { FieldWithDaData } from 'Src/common/types/common';
import { DaDataAddress, DaDataCountries } from 'src/common/types/dadata';

export interface RegistrationAddressFieldsModel {
    country?: FieldWithDaData<DaDataCountries>;
    region?: FieldWithDaData<DaDataAddress>;
    city?: FieldWithDaData<DaDataAddress>;
    street?: FieldWithDaData<DaDataAddress>;
    house?: FieldWithDaData<DaDataAddress>;
    apartment?: string;
    hasNoApartment?: boolean;
    registrationDate?: Dayjs;
}
