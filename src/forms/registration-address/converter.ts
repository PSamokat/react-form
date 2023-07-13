import dayjs from 'dayjs';
import { CustomerInfo } from 'src/common/types/customer';
import { RegistrationAddressFieldsModel } from 'src/forms/registration-address/form-model';

export function convertToInitialValues(data: CustomerInfo): RegistrationAddressFieldsModel {
    const { personInfo } = data;

    const { registration } = personInfo;
    const {
        country, region, city, street, house, apartment, hasNoApartment, registrationDate,
    } = registration;

    return {
        country,
        region,
        city,
        street,
        house,
        apartment,
        hasNoApartment,
        registrationDate: dayjs(registrationDate),
    };
}
