import { Dayjs } from 'dayjs';
import { AddressData } from 'Src/common/types/customer';

export interface RegistrationAddressFieldsModel {
    country?: {
        name?: string;
        code?: string;
    };
    region?: AddressData;
    city?: AddressData;
    street?: AddressData;
    house?: AddressData;
    apartment?: AddressData;
    hasNoApartment?: boolean;
    registrationDate?: Dayjs;
}
