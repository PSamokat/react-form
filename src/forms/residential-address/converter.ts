import { CustomerInfo } from 'Src/common/types/customer';
import { ResidentialAddressFieldsModel } from 'Src/forms/residential-address/form-model';

export function convertToInitialValues(data: CustomerInfo): ResidentialAddressFieldsModel {
    const { personInfo } = data;

    const { residential } = personInfo;
    const {
        country, region, city, street, house, apartment, hasNoApartment,
    } = residential;

    return {
        country,
        region,
        city,
        street,
        house,
        apartment,
        hasNoApartment,
    };
}
