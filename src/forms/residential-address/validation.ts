import { dadataAddressScheme, dadataCountryScheme } from 'src/common/validation/yup';
import * as Yup from 'yup';

export const residentialAddressFieldsSchema = Yup.object({
    country: Yup.object().when('addressMatches', {
        is: false,
        then: () => dadataCountryScheme(),
    }),
    region: Yup.object().when('addressMatches', {
        is: false,
        then: () => dadataAddressScheme(),
    }),
    city: Yup.object().when('addressMatches', {
        is: false,
        then: () => dadataAddressScheme(),
    }),
    street: Yup.object().when('addressMatches', {
        is: false,
        then: () => dadataAddressScheme(),
    }),
    house: Yup.object().when('addressMatches', {
        is: false,
        then: () => dadataAddressScheme(),
    }),
    apartment: Yup.string().when(['addressMatches', 'hasNoApartment'], {
        is: (addressMatches, hasNoApartment) => !addressMatches && !hasNoApartment,
        then: (schema) => schema.required('Заполните поле'),
    }),
    hasNoApartment: Yup.boolean(),
});
