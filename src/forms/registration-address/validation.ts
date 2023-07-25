import { dadataAddressScheme, dadataCountryScheme } from 'src/common/validation/yup';
import * as Yup from 'yup';

export const registrationAddressFieldsSchema = Yup.object({
    country: dadataCountryScheme(),
    region: dadataAddressScheme(),
    city: dadataAddressScheme(),
    street: dadataAddressScheme(),
    house: dadataAddressScheme(),
    apartment: Yup.string().when('hasNoApartment', {
        is: true,
        then: (schema) => schema.required('Заполните поле'),
    }),
    registrationDate: Yup.date().required('Обязательное поле'),
    hasNoApartment: Yup.boolean(),
});
