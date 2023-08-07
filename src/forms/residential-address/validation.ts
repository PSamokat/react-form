import { SchemaObject } from 'src/common/types/common';
import { dadataAddressScheme, dadataCountryScheme } from 'src/common/utils/yup';
import { ResidentialAddressFieldsModel } from 'src/forms/residential-address/form-model';
import { boolean, object, string } from 'yup';

export const residentialAddressFieldsSchema = object().shape<SchemaObject<ResidentialAddressFieldsModel>>({
    country: object().when('addressMatches', {
        is: false,
        then: () => dadataCountryScheme(),
    }),
    region: object().when('addressMatches', {
        is: false,
        then: () => dadataAddressScheme(),
    }),
    city: object().when('addressMatches', {
        is: false,
        then: () => dadataAddressScheme(),
    }),
    street: object().when('addressMatches', {
        is: false,
        then: () => dadataAddressScheme(),
    }),
    house: object().when('addressMatches', {
        is: false,
        then: () => dadataAddressScheme(),
    }),
    apartment: string().when(['addressMatches', 'hasNoApartment'], {
        is: (addressMatches, hasNoApartment) => !addressMatches && !hasNoApartment,
        then: (schema) => schema.required('Заполните поле'),
    }),
    hasNoApartment: boolean(),
});
