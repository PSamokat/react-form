import { SchemaObject } from 'src/common/types/common';
import { dadataAddressSchema, dadataCountrySchema } from 'src/common/utils/yup-schemas';
import { ResidentialAddressFieldsModel } from 'src/forms/residential-address/form-model';
import { boolean, object, string } from 'yup';

export const residentialAddressFieldsSchema = object().shape<SchemaObject<ResidentialAddressFieldsModel>>({
    country: object().when('addressMatches', {
        is: false,
        then: () => dadataCountrySchema(),
    }),
    region: object().when('addressMatches', {
        is: false,
        then: () => dadataAddressSchema(),
    }),
    city: object().when('addressMatches', {
        is: false,
        then: () => dadataAddressSchema(),
    }),
    street: object().when('addressMatches', {
        is: false,
        then: () => dadataAddressSchema(),
    }),
    house: object().when('addressMatches', {
        is: false,
        then: () => dadataAddressSchema(),
    }),
    apartment: string().when(['addressMatches', 'hasNoApartment'], {
        is: (addressMatches, hasNoApartment) => !addressMatches && !hasNoApartment,
        then: (schema) => schema.required('Заполните поле'),
    }),
    hasNoApartment: boolean(),
});
